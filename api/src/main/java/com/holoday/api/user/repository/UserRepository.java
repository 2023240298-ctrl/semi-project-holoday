package com.holoday.api.user.repository;

import com.holoday.api.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByUserId(String userId);
    boolean existsByUserEmail(String userEmail);
    Optional<User> findByUserId(String userId);
}