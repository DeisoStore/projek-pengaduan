package id.go.beacukai.pengaduanonline.controller;

import id.go.beacukai.pengaduanonline.dto.LaporanRequestDTO;
import id.go.beacukai.pengaduanonline.dto.ProsesLaporanRequestDTO;
import id.go.beacukai.pengaduanonline.dto.UpdateStatusRequest;
import id.go.beacukai.pengaduanonline.model.Laporan;
import id.go.beacukai.pengaduanonline.service.LaporanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/laporan")
@CrossOrigin(origins = "http://localhost:3000")
public class LaporanController {

    @Autowired
    private LaporanService laporanService;

    @PostMapping("/create")
    public ResponseEntity<Laporan> createLaporan(@RequestBody LaporanRequestDTO requestDTO) {
        Laporan createdLaporan = laporanService.createLaporan(requestDTO);
        return ResponseEntity.ok(createdLaporan);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Laporan>> getAllLaporan() {
        List<Laporan> laporanList = laporanService.getAllLaporan();
        return ResponseEntity.ok(laporanList);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Laporan>> getLaporanByUserId(@PathVariable Long userId) {
        List<Laporan> laporanList = laporanService.getLaporanByUserId(userId);
        return ResponseEntity.ok(laporanList);
    }

    @PutMapping("/proses/{id}")
    public ResponseEntity<Laporan> prosesLaporan(@PathVariable Long id, @RequestBody ProsesLaporanRequestDTO request) {
        return ResponseEntity.ok(laporanService.prosesLaporan(id, request));
    }

    @PutMapping("/update/status/{id}")
    public ResponseEntity<Laporan> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request
    ) {
        Laporan updatedLaporan = laporanService.updateLaporanStatus(id, request.getStatus());
        return ResponseEntity.ok(updatedLaporan);
    }
}
