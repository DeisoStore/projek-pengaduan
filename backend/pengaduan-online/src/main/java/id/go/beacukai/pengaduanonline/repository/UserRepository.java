package id.go.beacukai.pengaduanonline.repository;

import id.go.beacukai.pengaduanonline.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA akan otomatis membuat query untuk mencari user berdasarkan username
    Optional<User> findByUsername(String username);
}