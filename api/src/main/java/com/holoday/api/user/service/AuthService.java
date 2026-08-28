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

        System.out.println("회원가입 서비스 진입");
        System.out.println("암호화 전: " + user.getUserPw());

        user.changeUserPw(
                passwordEncoder.encode(user.getUserPw())
        );

        System.out.println("암호화 후: " + user.getUserPw());

        user.changeUserIsAdmin(false);

        userRepository.save(user);
    }
}
