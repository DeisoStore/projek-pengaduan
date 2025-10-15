// File: src/main/java/id/go/beacukai/pengaduanonline/dto/LaporanRequestDTO.java

package id.go.beacukai.pengaduanonline.dto;

import lombok.Data;

@Data
public class LaporanRequestDTO {
    private String namaPelapor;
    private String kategoriLaporan;
    private String deskripsiLaporan;
    private Long userId; // Kita hanya butuh ID user, bukan seluruh objek
}