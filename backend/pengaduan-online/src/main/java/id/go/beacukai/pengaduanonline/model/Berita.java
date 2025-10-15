// File: src/main/java/id/go/beacukai/pengaduanonline/model/Berita.java

package id.go.beacukai.pengaduanonline.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "berita")
public class Berita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String judul;

    @Column(columnDefinition = "TEXT")
    private String isi;

    private String penulis; // Nama admin yang membuat

    @CreationTimestamp
    private LocalDateTime tanggalDibuat;

    // Anotasi @Lob untuk Large Object, akan disimpan sebagai BLOB di database
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] gambar;
}