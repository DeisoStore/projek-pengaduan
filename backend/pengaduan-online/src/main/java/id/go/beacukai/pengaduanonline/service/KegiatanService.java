// File: src/main/java/id/go/beacukai/pengaduanonline/service/KegiatanService.java

package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.model.Kegiatan;
import id.go.beacukai.pengaduanonline.repository.KegiatanRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class KegiatanService {

    @Autowired
    private KegiatanRepository kegiatanRepository;

    public Kegiatan createKegiatan(String judul, String deskripsi, LocalDateTime tanggalKegiatan, MultipartFile gambar) throws IOException {
        Kegiatan kegiatan = new Kegiatan();
        kegiatan.setJudul(judul);
        kegiatan.setDeskripsi(deskripsi);
        kegiatan.setTanggalKegiatan(tanggalKegiatan);
        // Mengubah file gambar menjadi byte array untuk disimpan di database
        kegiatan.setGambar(gambar.getBytes());

        return kegiatanRepository.save(kegiatan);
    }

    public void deleteKegiatan(Long id) {
        kegiatanRepository.deleteById(id);
    }
}