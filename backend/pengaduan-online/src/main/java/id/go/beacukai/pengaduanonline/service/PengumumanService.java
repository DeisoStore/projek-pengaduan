// File: src/main/java/id/go/beacukai/pengaduanonline/service/PengumumanService.java

package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.model.Pengumuman;
import id.go.beacukai.pengaduanonline.repository.PengumumanRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PengumumanService {

    @Autowired
    private PengumumanRepository pengumumanRepository;

    public List<Pengumuman> getAllPengumuman() {
        return pengumumanRepository.findAll();
    }

    public Pengumuman createPengumuman(Pengumuman pengumuman) {
        return pengumumanRepository.save(pengumuman);
    }

    public void deletePengumuman(Long id) {
        pengumumanRepository.deleteById(id);
    }
}