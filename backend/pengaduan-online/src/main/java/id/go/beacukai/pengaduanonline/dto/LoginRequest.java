package id.go.beacukai.pengaduanonline.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}