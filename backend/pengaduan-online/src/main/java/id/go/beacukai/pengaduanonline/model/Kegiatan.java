// File: src/main/java/id/go/beacukai/pengaduanonline/model/Kegiatan.java

package id.go.beacukai.pengaduanonline.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Data
@Entity
@Table(name = "kegiatan")
public class Kegiatan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String judul;

    @Column(columnDefinition = "TEXT")
    private String deskripsi;

    private LocalDateTime tanggalKegiatan;

    // Anotasi @Lob menandakan bahwa ini adalah Large Object.
    // Tipe byte[] akan disimpan sebagai BLOB (Binary Large Object) di database.
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] gambar;
}   