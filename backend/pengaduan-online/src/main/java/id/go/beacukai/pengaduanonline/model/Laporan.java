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

    // --- PERUBAHAN UNTUK FILE UPLOAD PELAPOR ---
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] dokumen;
    private String dokumenNama;
    private String dokumenTipe;

    // --- PERUBAHAN UNTUK FILE FEEDBACK ADMIN ---
    @Column(columnDefinition = "TEXT")
    private String feedbackDeskripsi;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] feedbackDokumen;
    private String feedbackDokumenNama;
    private String feedbackDokumenTipe;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}