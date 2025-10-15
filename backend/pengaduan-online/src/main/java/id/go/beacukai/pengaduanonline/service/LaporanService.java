// File: src/main/java/id/go/beacukai/pengaduanonline/service/LaporanService.java

package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.dto.LaporanRequestDTO;
import id.go.beacukai.pengaduanonline.dto.ProsesLaporanRequestDTO;
import id.go.beacukai.pengaduanonline.model.Laporan;
import id.go.beacukai.pengaduanonline.model.User;
import id.go.beacukai.pengaduanonline.repository.LaporanRepository;
import id.go.beacukai.pengaduanonline.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class LaporanService {

    @Autowired
    private LaporanRepository laporanRepository;

    // Kita butuh UserRepository untuk mencari data user
    @Autowired
    private UserRepository userRepository;

    public List<Laporan> getAllLaporan() {
        return laporanRepository.findAll();
    }

    public List<Laporan> getLaporanByUserId(Long userId) {
        return laporanRepository.findByUserId(userId);
    }

    // --- METODE YANG DIPERBARUI ---
    public Laporan createLaporan(LaporanRequestDTO requestDTO) {
        // 1. Cari user berdasarkan userId dari DTO
        User user = userRepository.findById(requestDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User tidak ditemukan dengan id: " + requestDTO.getUserId()));

        // 2. Buat objek Laporan baru
        Laporan laporan = new Laporan();
        laporan.setNamaPelapor(requestDTO.getNamaPelapor());
        laporan.setKategoriLaporan(requestDTO.getKategoriLaporan());
        laporan.setDeskripsiLaporan(requestDTO.getDeskripsiLaporan());
        laporan.setUser(user); // 3. Set seluruh objek User yang sudah kita temukan
        laporan.setStatus("BARU"); // 4. Set status default

        // 5. Simpan ke database
        return laporanRepository.save(laporan);
    }
    public Laporan prosesLaporan(Long id, ProsesLaporanRequestDTO request) {
        Laporan laporan = laporanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Laporan tidak ditemukan dengan id: " + id));

        laporan.setFeedbackDeskripsi(request.getFeedbackDeskripsi());
        laporan.setStatus(request.getStatus());

        return laporanRepository.save(laporan);
    }
    
    public Laporan updateLaporanStatus(Long id, String status) {
        Laporan laporan = laporanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Laporan tidak ditemukan dengan id: " + id));
        laporan.setStatus(status);
        return laporanRepository.save(laporan);
    }
}