package id.go.beacukai.pengaduanonline.repository;

import id.go.beacukai.pengaduanonline.model.Pengumuman;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PengumumanRepository extends JpaRepository<Pengumuman, Long> {
}