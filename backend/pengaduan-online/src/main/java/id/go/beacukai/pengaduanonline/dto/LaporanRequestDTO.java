package id.go.beacukai.pengaduanonline.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class LaporanRequestDTO {
    // Field Lama
    private String kategoriLaporan;
    private String deskripsiLaporan;
    private MultipartFile dokumen;

    // --- TAMBAHAN BARU (Copy dari sini ke bawah) ---
    private String namaPelapor; // Opsional jika ingin override nama user
    private String email;
    private String noTelp;
    private String alamat;
    
    private String ditujukanKepada;
    private String terlapor;
    
    private String lokasiKejadian; // Alamat text map
    private Double koordinatLat;   // Latitude
    private Double koordinatLng;   // Longitude
}