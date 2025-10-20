// File: src/main/java/id/go/beacukai/pengaduanonline/service/LaporanService.java

package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.model.Laporan;
import id.go.beacukai.pengaduanonline.model.User;
import id.go.beacukai.pengaduanonline.repository.LaporanRepository;
import id.go.beacukai.pengaduanonline.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class LaporanService {

    @Autowired private LaporanRepository laporanRepository;
    @Autowired private UserRepository userRepository;

    public List<Laporan> getAllLaporan() { return laporanRepository.findAll(); }
    public List<Laporan> getLaporanByUserId(Long userId) { return laporanRepository.findByUserId(userId); }
    public Laporan getLaporanById(Long id) {
        return laporanRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Laporan tidak ditemukan"));
    }

    public Laporan createLaporan(String kategori, String deskripsi, Long userId, MultipartFile dokumen) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User tidak ditemukan"));
        Laporan laporan = new Laporan();
        laporan.setNamaPelapor(user.getNama());
        laporan.setKategoriLaporan(kategori);
        laporan.setDeskripsiLaporan(deskripsi);
        laporan.setUser(user);
        laporan.setStatus("BARU"); // Pastikan status di-set

        if (dokumen != null && !dokumen.isEmpty()) {
            laporan.setDokumenData(dokumen.getBytes());
            laporan.setDokumenNama(dokumen.getOriginalFilename());
            laporan.setDokumenTipe(dokumen.getContentType());
        }
        return laporanRepository.save(laporan);
    }

    public Laporan prosesLaporan(Long id, String feedback, String status, MultipartFile feedbackDokumen) throws IOException {
        Laporan laporan = getLaporanById(id);
        laporan.setFeedbackDeskripsi(feedback);
        laporan.setStatus(status);

        if (feedbackDokumen != null && !feedbackDokumen.isEmpty()) {
            laporan.setFeedbackDokumenData(feedbackDokumen.getBytes());
            laporan.setFeedbackDokumenNama(feedbackDokumen.getOriginalFilename());
            laporan.setFeedbackDokumenTipe(feedbackDokumen.getContentType());
        }
        return laporanRepository.save(laporan);
    }
}