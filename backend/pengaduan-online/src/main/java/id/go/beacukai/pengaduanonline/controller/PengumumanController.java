// File: src/main/java/id/go/beacukai/pengaduanonline/controller/PengumumanController.java

package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.model.Pengumuman;
import id.go.beacukai.pengaduanonline.service.PengumumanService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pengumuman")
@CrossOrigin(origins = "http://localhost:3000")
public class PengumumanController {

    @Autowired
    private PengumumanService pengumumanService; // Gunakan Service, bukan Repository

    @GetMapping
    public List<Pengumuman> getAllPengumuman() {
        return pengumumanService.getAllPengumuman();
    }

    // --- ENDPOINT BARU UNTUK ADMIN ---
    @PostMapping
    public Pengumuman createPengumuman(@RequestBody Pengumuman pengumuman) {
        return pengumumanService.createPengumuman(pengumuman);
    }

    // --- ENDPOINT BARU UNTUK ADMIN ---
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePengumuman(@PathVariable Long id) {
        pengumumanService.deletePengumuman(id);
        return ResponseEntity.ok().build(); // Kirim respons 200 OK jika berhasil
    }
}