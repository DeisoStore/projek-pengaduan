// File: src/main/java/id/go/beacukai/pengaduanonline/controller/AuthController.java

package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.config.JwtUtils;
import id.go.beacukai.pengaduanonline.config.UserDetailsImpl;
import id.go.beacukai.pengaduanonline.dto.JwtResponse;
import id.go.beacukai.pengaduanonline.dto.LoginRequest;
import id.go.beacukai.pengaduanonline.model.User;
import id.go.beacukai.pengaduanonline.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Pastikan port React benar
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager; // Mesin Login

    @Autowired
    AuthService authService;

    @Autowired
    JwtUtils jwtUtils; // Mesin Pembuat Token

    // --- LOGIN (MENGHASILKAN TOKEN) ---
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        
        // 1. Cek Username & Password
        // Jika password salah, baris ini akan melempar Error 401 (Bad Credentials)
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        // 2. Simpan sesi sementara
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. BUAT TOKEN (JWT)
        String jwt = jwtUtils.generateJwtToken(authentication);

        // 4. Ambil data user
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        // 5. Kirim Token ke Frontend
        return ResponseEntity.ok(new JwtResponse(
                jwt, 
                userDetails.getId(), 
                userDetails.getUsername(), 
                userDetails.getEmail(), 
                roles.isEmpty() ? "USER" : roles.get(0)));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User registeredUser = authService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/register-admin")
    public ResponseEntity<?> registerAdmin(@RequestBody User user) {
        try {
            User registeredAdmin = authService.registerAdmin(user);
            return ResponseEntity.ok(registeredAdmin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}