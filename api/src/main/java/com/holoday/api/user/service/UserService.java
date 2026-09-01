package com.holoday.api.user.service;

import com.holoday.api.user.entity.User;
import com.holoday.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String signup(User user) {
        //System.out.println("회원가입 서비스 진입");
        //System.out.println("암호화 전: " + user.getUserPw());

        user.changeUserPw(
                passwordEncoder.encode(user.getUserPw())
        );
        //System.out.println("암호화 후: " + user.getUserPw());
        user.changeUserIsAdmin(false);
        try{
            userRepository.save(user);
            return "회원가입 성공!";
        } catch (Exception e){
            log.error("error occurred during saving user");
            return "회원가입에 실패하였습니다.";
        }
    }

    public boolean existsByUserId(String userId){
        return userRepository.existsByUserId(userId);
    }

    public boolean existsByUserEmail(String userEmail){
        return userRepository.existsByUserEmail(userEmail);
    }
}
