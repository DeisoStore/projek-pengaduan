package id.go.beacukai.pengaduanonline.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

@Data
@Entity
@Table(name = "pengumuman")
public class Pengumuman {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String judul;
    @Column(columnDefinition = "TEXT")
    private String isi;
    private String pembuat;
    @CreationTimestamp
    private LocalDateTime tanggalDibuat;
}