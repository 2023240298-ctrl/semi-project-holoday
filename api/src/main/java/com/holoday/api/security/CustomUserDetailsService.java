package com.holoday.api.security;

import com.holoday.api.user.dto.UserDTO;
import com.holoday.api.user.entity.User;
import com.holoday.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
    public final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        log.info("loadUserByUsername() 실행");
        log.info("username: {}", username);

        User user = userRepository.findByUserId(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("회원을 찾을 수가 없습니다."));

        return new UserDTO(
                user.getUserId(),
                user.getUserEmail(),
                user.getUserNick(),
                user.getUserPw(),
                user.isUserIsAdmin());
    }
}