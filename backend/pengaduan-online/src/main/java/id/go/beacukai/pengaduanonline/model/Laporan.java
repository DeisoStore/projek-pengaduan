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

    private String namaPelapor;
    private String kategoriLaporan;

    @Column(columnDefinition = "TEXT")
    private String deskripsiLaporan;

    @CreationTimestamp
    private LocalDateTime tanggalLapor;

    private String status;

    // --- Kolom BARU untuk Dokumen Laporan Awal ---
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] dokumenData;
    private String dokumenNama;
    private String dokumenTipe;

    // --- Kolom BARU untuk Feedback & Dokumen Admin ---
    @Column(columnDefinition = "TEXT")
    private String feedbackDeskripsi;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] feedbackDokumenData;
    private String feedbackDokumenNama;
    private String feedbackDokumenTipe;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}