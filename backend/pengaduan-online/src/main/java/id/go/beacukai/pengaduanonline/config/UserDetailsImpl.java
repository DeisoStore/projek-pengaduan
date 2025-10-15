// File: src/main/java/id/go/beacukai/pengaduanonline/config/UserDetailsImpl.java

package id.go.beacukai.pengaduanonline.config;

import id.go.beacukai.pengaduanonline.model.User;
import java.util.Collection;
import java.util.Collections;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails {

    private final User user;

    public UserDetailsImpl(User user) {
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // --- PERUBAHAN DI SINI ---
        // Kita secara eksplisit menambahkan "ROLE_" di depan nama role dari database
        // Contoh: "ADMIN" menjadi "ROLE_ADMIN"
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
    }

    // ... sisa kode di bawah ini tidak perlu diubah ...
    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}