// File: src/main/java/id/go/beacukai/pengaduanonline/controller/TestController.java

package id.go.beacukai.pengaduanonline.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping("/admin")
    public String adminAccess() {
        return "Halo Admin! Jika Anda melihat pesan ini, koneksi berhasil!";
    }
}