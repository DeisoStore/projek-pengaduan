// File: src/main/java/id/go/beacukai/pengaduanonline/controller/BeritaController.java

package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.model.Berita;
import id.go.beacukai.pengaduanonline.repository.BeritaRepository;
import id.go.beacukai.pengaduanonline.service.BeritaService;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/berita")
@CrossOrigin(origins = "http://localhost:3000")
public class BeritaController {

    @Autowired
    private BeritaRepository beritaRepository;
    
    @Autowired
    private BeritaService beritaService;

    @GetMapping
    public List<Berita> getAllBerita() {
        return beritaRepository.findAll();
    }
    
     @GetMapping("/{id}")
    public Berita getBeritaById(@PathVariable Long id) {
        return beritaService.getBeritaById(id);
    }

    // --- ENDPOINT BARU UNTUK UPLOAD BERITA ---
    @PostMapping
    public Berita createBerita(
            @RequestParam("judul") String judul,
            @RequestParam("isi") String isi,
            @RequestParam("penulis") String penulis,
            @RequestParam("gambar") MultipartFile gambar) throws IOException {
        return beritaService.createBerita(judul, isi, penulis, gambar);
    }
    
    // --- ENDPOINT BARU UNTUK MENGHAPUS BERITA ---
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBerita(@PathVariable Long id) {
        beritaService.deleteBerita(id);
        return ResponseEntity.ok().build();
    }
}