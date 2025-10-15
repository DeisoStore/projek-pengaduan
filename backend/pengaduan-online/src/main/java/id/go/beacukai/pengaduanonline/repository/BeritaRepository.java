// File: src/main/java/id/go/beacukai/pengaduanonline/repository/BeritaRepository.java

package id.go.beacukai.pengaduanonline.repository;

import id.go.beacukai.pengaduanonline.model.Berita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeritaRepository extends JpaRepository<Berita, Long> {
}