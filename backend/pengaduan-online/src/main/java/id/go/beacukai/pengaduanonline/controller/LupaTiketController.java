package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.model.Laporan;
import id.go.beacukai.pengaduanonline.model.User;
import id.go.beacukai.pengaduanonline.repository.LaporanRepository;
import id.go.beacukai.pengaduanonline.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/laporan")
@CrossOrigin(origins = "*")
public class LupaTiketController {

    @Autowired
    private LaporanRepository laporanRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/lupa-tiket")
    public ResponseEntity<?> lupaTiket(@RequestBody LupaTiketRequest request) {

        User user = userRepository.findByNama(request.getNama());

        if (user == null) {
            return ResponseEntity.ok(
                    new MessageResponse("Nama tidak ditemukan. Pastikan sesuai dengan akun Anda.")
            );
        }

        List<Laporan> laporanList = laporanRepository.findByNamaPelapor(request.getNama());

        if (laporanList.isEmpty()) {
            return ResponseEntity.ok(
                    new MessageResponse("Tidak ada laporan atas nama tersebut.")
            );
        }

        // susun daftar tiket
        StringBuilder emailContent = new StringBuilder();
        emailContent.append("Berikut daftar nomor tiket pengaduan Anda:\n\n");

        for (Laporan lp : laporanList) {
            emailContent.append("• ID Laporan: ").append(lp.getId()).append("\n");
            emailContent.append("  Kategori: ").append(lp.getKategoriLaporan()).append("\n");
            emailContent.append("  Status: ").append(lp.getStatus()).append("\n\n");
        }

        // kirim email
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(user.getEmail());
        msg.setSubject("Daftar Nomor Tiket Pengaduan Anda");
        msg.setText(emailContent.toString());

        mailSender.send(msg);

        return ResponseEntity.ok(
                new MessageResponse("Nomor tiket telah dikirim ke email Anda.")
        );
    }
}

class LupaTiketRequest {
    private String nama;
    public String getNama() { return nama; }
    public void setNama(String nama) { this.nama = nama; }
}

class MessageResponse {
    private String message;
    public MessageResponse(String message) { this.message = message; }
    public String getMessage() { return message; }
}
