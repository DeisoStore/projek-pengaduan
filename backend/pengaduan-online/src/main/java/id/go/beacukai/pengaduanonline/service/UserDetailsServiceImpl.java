package id.go.beacukai.pengaduanonline.service;

import id.go.beacukai.pengaduanonline.config.UserDetailsImpl;
import id.go.beacukai.pengaduanonline.model.User;
import id.go.beacukai.pengaduanonline.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Cari user dari database
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User tidak ditemukan dengan username: " + username));

        // 2. Convert User Database menjadi UserDetails Spring Security
        // PERUBAHAN DISINI: Gunakan .build() bukan new UserDetailsImpl()
        return UserDetailsImpl.build(user); 
    }
}