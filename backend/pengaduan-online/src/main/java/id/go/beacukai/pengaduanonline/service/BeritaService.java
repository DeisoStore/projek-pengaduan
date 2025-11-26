// File: src/main/java/id/go/beacukai/pengaduanonline/service/BeritaService.java

package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.model.Berita;
import id.go.beacukai.pengaduanonline.repository.BeritaRepository;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class BeritaService {

    @Autowired
    private BeritaRepository beritaRepository;
    
    public Berita getBeritaById(Long id) {
        return beritaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Berita tidak ditemukan dengan id: " + id));
    }
    
    public Berita createBerita(String judul, String isi, String penulis, MultipartFile gambar) throws IOException {
        Berita berita = new Berita();
        berita.setJudul(judul);
        berita.setIsi(isi);
        berita.setPenulis(penulis);
        // Mengubah file gambar menjadi byte array untuk disimpan di database
        berita.setGambar(gambar.getBytes());

        return beritaRepository.save(berita);
    }

    public void deleteBerita(Long id) {
        beritaRepository.deleteById(id);
    }
}