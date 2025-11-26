// File: src/main/java/id/go/beacukai/pengaduanonline/model/Laporan.java

package id.go.beacukai.pengaduanonline.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "laporan")
public class Laporan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // --- 1. DATA PELAPOR (Updated) ---
    private String namaPelapor;
    private String email;          // Baru
    private String noTelp;         // Baru
    private String alamat;         // Baru (Domisili)

    // --- 2. DETAIL LAPORAN ---
    private String kategoriLaporan;

    @Column(columnDefinition = "TEXT")
    private String deskripsiLaporan;

    private String ditujukanKepada; // Baru
    private String terlapor;        // Baru

    @CreationTimestamp
    private LocalDateTime tanggalLapor;

    private String status; // BARU, DIPROSES, SELESAI

    // --- 3. LOKASI KEJADIAN (Baru - Fitur Maps) ---
    @Column(columnDefinition = "TEXT")
    private String lokasiKejadian; // Alamat text dari Maps

    private Double koordinatLat;   // Latitude
    private Double koordinatLng;   // Longitude

    // --- 4. DOKUMEN LAPORAN AWAL (Existing - BLOB) ---
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] dokumenData;
    private String dokumenNama;
    private String dokumenTipe;

    // --- 5. FEEDBACK & DOKUMEN ADMIN (Existing) ---
    @Column(columnDefinition = "TEXT")
    private String feedbackDeskripsi;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] feedbackDokumenData;
    private String feedbackDokumenNama;
    private String feedbackDokumenTipe;

    // --- 6. RELASI USER ---
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}