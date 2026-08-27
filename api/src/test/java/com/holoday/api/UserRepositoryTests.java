package com.holoday.api;

import com.holoday.api.user.entity.User;
import com.holoday.api.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Slf4j
public class UserRepositoryTests {
    @Autowired
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private void printUser(User user) {
        log.info("회원 정보: {} {} {} {} {}",
                user.getUserId(), user.getUserEmail(), user.getUserNick(), user.getUserPw(), user.isUserIsAdmin());
    }

    @Test
    public void testInsertUser() {
        User user = new User(
                "gildong11", "gildong11@naver.com", "홍길동",
                "rlfehd1234", false
        );

        User result = userRepository.save(user);
        printUser(result);
    }

    @Test
    public void testRead() {
        String userId = "gildong11";

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("회원이 존재하지 않습니다.")
                );

        printUser(user);
        log.info("isAdmin: {}", user.isUserIsAdmin());
    }
}
