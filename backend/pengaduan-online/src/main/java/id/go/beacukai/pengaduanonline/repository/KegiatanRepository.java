// File: src/main/java/id/go/beacukai/pengaduanonline/repository/KegiatanRepository.java

package id.go.beacukai.pengaduanonline.repository;

import id.go.beacukai.pengaduanonline.model.Kegiatan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KegiatanRepository extends JpaRepository<Kegiatan, Long> {
}