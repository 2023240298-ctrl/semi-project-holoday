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
import org.springframework.test.annotation.Commit;

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
    @Commit
    public void testInsertUser() {
        User user = new User(
                "alstn11",
                "gildong11@naver.com",
                "홍길동",
                passwordEncoder.encode("1234"),
                false
        );

        User result = userRepository.save(user);
        printUser(result);
    }


    @Test
    @Commit
    public void testInsertUserAdmin() {
        User user = new User(
                "admin1234",
                "gildong11@naver.com",
                "홍길동",
                passwordEncoder.encode("1234"),
                true
        );

        User result = userRepository.save(user);
    }

    @Test
    public void testRead() {
        String userId = "alstn11";

        User user = userRepository.findByUserId(userId)
                .orElseThrow(() ->
                        new IllegalArgumentException("회원이 존재하지 않습니다.")
                );

        printUser(user);
        log.info("isAdmin: {}", user.isUserIsAdmin());
    }
}
