package com.holoday.api.user.controller;

import com.holoday.api.user.entity.User;
import com.holoday.api.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/holoday")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public void signup(@RequestBody User user) {
        userService.signup(user);
    }

    @GetMapping("/checkEmail")
    public boolean existsByUserEmail(String userEmail){
        return userService.existsByUserEmail(userEmail);
    }

    @GetMapping("/checkId")
    public boolean existsByUserId(String userId){
        return userService.existsByUserId(userId);
    }


}
