// File: src/main/java/id/go/beacukai/pengaduanonline/service/UserDetailsServiceImpl.java

package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.config.UserDetailsImpl;
import id.go.beacukai.pengaduanonline.model.User;
import id.go.beacukai.pengaduanonline.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Cari user di database kita berdasarkan username
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User tidak ditemukan dengan username: " + username));

        // Bungkus user kita menjadi UserDetails yang dimengerti Spring Security
        return new UserDetailsImpl(user);
    }
}