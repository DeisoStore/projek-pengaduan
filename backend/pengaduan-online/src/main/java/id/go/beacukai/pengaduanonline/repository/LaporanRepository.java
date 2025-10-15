package id.go.beacukai.pengaduanonline.repository;

import id.go.beacukai.pengaduanonline.model.Laporan;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaporanRepository extends JpaRepository<Laporan, Long> {
    // Metode custom untuk mencari semua laporan yang dibuat oleh user tertentu
    List<Laporan> findByUserId(Long userId);
}