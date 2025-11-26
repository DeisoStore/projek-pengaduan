// File: src/main/java/id/go/beacukai/pengaduanonline/controller/KegiatanController.java

package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.model.Kegiatan;
import id.go.beacukai.pengaduanonline.repository.KegiatanRepository;
import id.go.beacukai.pengaduanonline.service.KegiatanService;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/kegiatan")
@CrossOrigin(origins = "http://localhost:3000")
public class KegiatanController {

    @Autowired
    private KegiatanRepository kegiatanRepository;

    @Autowired
    private KegiatanService kegiatanService;

    @GetMapping
    public List<Kegiatan> getAllKegiatan() {
        return kegiatanRepository.findAll();
    }

    // --- ENDPOINT BARU UNTUK UPLOAD ---
    // Kita menggunakan @RequestParam karena frontend akan mengirim data sebagai FormData
    @PostMapping
    public Kegiatan createKegiatan(
            @RequestParam("judul") String judul,
            @RequestParam("deskripsi") String deskripsi,
            @RequestParam("tanggalKegiatan") LocalDateTime tanggalKegiatan,
            @RequestParam("gambar") MultipartFile gambar) throws IOException {
        return kegiatanService.createKegiatan(judul, deskripsi, tanggalKegiatan, gambar);
    }

    // --- ENDPOINT BARU UNTUK MENGHAPUS ---
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteKegiatan(@PathVariable Long id) {
        kegiatanService.deleteKegiatan(id);
        return ResponseEntity.ok().build();
    }
}