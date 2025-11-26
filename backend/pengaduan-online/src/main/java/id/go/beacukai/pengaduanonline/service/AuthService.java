package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.dto.LoginRequest;
import id.go.beacukai.pengaduanonline.model.User;
import id.go.beacukai.pengaduanonline.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager; // PENTING
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder; // PENTING
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // INI KUNCINYA

    @Autowired
    private AuthenticationManager authenticationManager;

    // --- REGISTER USER BIASA ---
    public User registerUser(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username sudah digunakan!");
        }
        
        // ENKRIPSI PASSWORD SEBELUM SIMPAN
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        user.setRole("USER"); 
        return userRepository.save(user);
    }

    // --- REGISTER ADMIN ---
    public User registerAdmin(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Username sudah digunakan!");
        }

        // ENKRIPSI PASSWORD SEBELUM SIMPAN
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        user.setRole("ADMIN");
        return userRepository.save(user);
    }

    // --- LOGIN (Hanya Helper, Logic Utama ada di Controller) ---
    public User loginUser(LoginRequest loginRequest) {
        // Kita biarkan Controller yang menangani JWT, method ini opsional
        // Tapi untuk memastikan user ada:
        return userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User tidak ditemukan"));
    }
}