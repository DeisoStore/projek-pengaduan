// File: src/main/java/id/go/beacukai/pengaduanonline/service/LaporanService.java

package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.dto.LaporanRequestDTO;
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
        return laporanRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Laporan tidak ditemukan"));
    }

    // --- UPDATE: Method ini sekarang menerima DTO agar semua data baru masuk ---
    public Laporan createLaporan(LaporanRequestDTO dto, Long userId) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User tidak ditemukan"));
        
        Laporan laporan = new Laporan();
        
        // 1. Data Pelapor & User
        laporan.setUser(user);
        laporan.setNamaPelapor(user.getNama()); // Default nama akun
        laporan.setEmail(dto.getEmail());       // Baru
        laporan.setNoTelp(dto.getNoTelp());     // Baru
        laporan.setAlamat(dto.getAlamat());     // Baru

        // 2. Detail Laporan
        laporan.setKategoriLaporan(dto.getKategoriLaporan());
        laporan.setDeskripsiLaporan(dto.getDeskripsiLaporan());
        laporan.setDitujukanKepada(dto.getDitujukanKepada()); // Baru
        laporan.setTerlapor(dto.getTerlapor());               // Baru
        laporan.setStatus("BARU");

        // 3. Lokasi & Maps (Baru)
        laporan.setLokasiKejadian(dto.getLokasiKejadian());
        laporan.setKoordinatLat(dto.getKoordinatLat());
        laporan.setKoordinatLng(dto.getKoordinatLng());

        // 4. Handle Upload File (Diambil dari DTO)
        MultipartFile dokumen = dto.getDokumen();
        if (dokumen != null && !dokumen.isEmpty()) {
            laporan.setDokumenData(dokumen.getBytes());
            laporan.setDokumenNama(dokumen.getOriginalFilename());
            laporan.setDokumenTipe(dokumen.getContentType());
        }

        return laporanRepository.save(laporan);
    }

    // --- Method Proses Admin (Tidak Berubah) ---
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