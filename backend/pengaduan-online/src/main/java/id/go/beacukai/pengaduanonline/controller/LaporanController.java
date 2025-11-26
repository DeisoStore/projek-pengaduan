// File: src/main/java/id/go/beacukai/pengaduanonline/controller/LaporanController.java

package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.dto.LaporanRequestDTO;
import id.go.beacukai.pengaduanonline.model.Laporan;
import id.go.beacukai.pengaduanonline.service.LaporanService;
import id.go.beacukai.pengaduanonline.config.UserDetailsImpl; 

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult; // Import untuk Detektif Error
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/laporan")
public class LaporanController {

    @Autowired private LaporanService laporanService;

    // 1. GET ALL
    @GetMapping("/all")
    public ResponseEntity<List<Laporan>> getAllLaporan() {
        return ResponseEntity.ok(laporanService.getAllLaporan());
    }

    // 2. GET BY USER (Versi Token - Aman)
    @GetMapping("/me")
    public ResponseEntity<List<Laporan>> getMyLaporan(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(laporanService.getLaporanByUserId(userDetails.getId()));
    }

    // 3. GET BY USER ID (Agar RiwayatLaporan.jsx tidak 404)
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Laporan>> getLaporanByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(laporanService.getLaporanByUserId(userId));
    }
    
    // 4. GET DETAIL
    @GetMapping("/{id}")
    public ResponseEntity<Laporan> getLaporanById(@PathVariable Long id) {
        return ResponseEntity.ok(laporanService.getLaporanById(id));
    }

    // 5. CREATE LAPORAN (DENGAN DETEKTIF ERROR)
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> createLaporan(
            @ModelAttribute LaporanRequestDTO requestDTO, 
            BindingResult bindingResult,
            Authentication authentication // <--- INI YANG NULL TADI
    ) {
        // --- 1. CEK APAKAH USER LOGIN? ---
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(401).body("Error: Anda belum login atau Sesi habis. Silakan Logout dan Login ulang.");
        }

        // --- 2. CEK VALIDASI DATA ---
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder("Gagal Validasi: ");
            bindingResult.getAllErrors().forEach(error -> {
                errorMessage.append(error.getDefaultMessage()).append("; ");
            });
            return ResponseEntity.badRequest().body(errorMessage.toString());
        }

        try {
            // Ambil User ID
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();

            // Panggil Service
            Laporan laporan = laporanService.createLaporan(requestDTO, userId);
            return ResponseEntity.ok(laporan);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Gagal upload file: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.badRequest().body("Error System: " + e.getMessage());
        }
    }

    // 6. PROSES LAPORAN
    @PutMapping(value = "/proses/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> prosesLaporan(
            @PathVariable Long id,
            @RequestParam("feedbackDeskripsi") String feedback,
            @RequestParam("status") String status,
            @RequestParam(value = "feedbackDokumen", required = false) MultipartFile feedbackDokumen
    ) {
        try {
            Laporan laporan = laporanService.prosesLaporan(id, feedback, status, feedbackDokumen);
            return ResponseEntity.ok(laporan);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Gagal proses: " + e.getMessage());
        }
    }

    // 7. DOWNLOAD DOKUMEN (PREVIEW)
    @GetMapping("/dokumen/{id}")
    public ResponseEntity<byte[]> downloadDokumen(@PathVariable Long id) {
        Laporan laporan = laporanService.getLaporanById(id);
        
        if (laporan.getDokumenData() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + laporan.getDokumenNama() + "\"")
                .contentType(MediaType.parseMediaType(laporan.getDokumenTipe()))
                .body(laporan.getDokumenData());
    }

    // 8. DOWNLOAD DOKUMEN FEEDBACK (PREVIEW)
    @GetMapping("/feedback-dokumen/{id}")
    public ResponseEntity<byte[]> downloadFeedbackDokumen(@PathVariable Long id) {
        Laporan laporan = laporanService.getLaporanById(id);

        if (laporan.getFeedbackDokumenData() == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + laporan.getFeedbackDokumenNama() + "\"")
                .contentType(MediaType.parseMediaType(laporan.getFeedbackDokumenTipe()))
                .body(laporan.getFeedbackDokumenData());
    }
}