package id.go.beacukai.pengaduanonline.repository;

import id.go.beacukai.pengaduanonline.model.Laporan;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaporanRepository extends JpaRepository<Laporan, Long> {
    
    List<Laporan> findByUserId(Long userId);
    List<Laporan> findByNamaPelapor(String namaPelapor);
    
}
