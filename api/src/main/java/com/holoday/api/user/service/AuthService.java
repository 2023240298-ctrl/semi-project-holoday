package com.holoday.api.user.service;

import com.holoday.api.user.entity.User;
import com.holoday.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(User user) {
        user.changeUserPw(
                passwordEncoder.encode(user.getUserPw())
        );

        user.changeUserIsAdmin(false);

        userRepository.save(user);
    }
}
