// File: src/main/java/id/go/beacukai/pengaduanonline/controller/LaporanController.java

package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.model.Laporan;
import id.go.beacukai.pengaduanonline.service.LaporanService;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/laporan")
public class LaporanController {

    @Autowired private LaporanService laporanService;

    // ... (metode getAll, getByUser, create, dan proses tidak berubah) ...

    @GetMapping("/all")
    public ResponseEntity<List<Laporan>> getAllLaporan() {
        return ResponseEntity.ok(laporanService.getAllLaporan());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Laporan>> getLaporanByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(laporanService.getLaporanByUserId(userId));
    }

    @PostMapping(value = "/create", consumes = "multipart/form-data")
    public Laporan createLaporan(
            @RequestParam("kategoriLaporan") String kategori,
            @RequestParam("deskripsiLaporan") String deskripsi,
            @RequestParam("userId") Long userId,
            @RequestParam(value = "dokumen", required = false) MultipartFile dokumen) throws IOException {
        return laporanService.createLaporan(kategori, deskripsi, userId, dokumen);
    }

    @PutMapping(value = "/proses/{id}", consumes = "multipart/form-data")
    public Laporan prosesLaporan(
            @PathVariable Long id,
            @RequestParam("feedbackDeskripsi") String feedback,
            @RequestParam("status") String status,
            @RequestParam(value = "feedbackDokumen", required = false) MultipartFile feedbackDokumen) throws IOException {
        return laporanService.prosesLaporan(id, feedback, status, feedbackDokumen);
    }
    
    // --- ENDPOINT YANG DIPERBARUI ---
    @GetMapping("/dokumen/{id}")
    public ResponseEntity<byte[]> downloadDokumen(@PathVariable Long id) {
        Laporan laporan = laporanService.getLaporanById(id);
        return ResponseEntity.ok()
                // UBAH DARI "attachment" MENJADI "inline"
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + laporan.getDokumenNama() + "\"")
                .contentType(org.springframework.http.MediaType.parseMediaType(laporan.getDokumenTipe()))
                .body(laporan.getDokumenData());
    }

    // --- ENDPOINT YANG DIPERBARUI ---
    @GetMapping("/feedback-dokumen/{id}")
    public ResponseEntity<byte[]> downloadFeedbackDokumen(@PathVariable Long id) {
        Laporan laporan = laporanService.getLaporanById(id);
        return ResponseEntity.ok()
                // UBAH DARI "attachment" MENJADI "inline"
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + laporan.getFeedbackDokumenNama() + "\"")
                .contentType(org.springframework.http.MediaType.parseMediaType(laporan.getFeedbackDokumenTipe()))
                .body(laporan.getFeedbackDokumenData());
    }
}