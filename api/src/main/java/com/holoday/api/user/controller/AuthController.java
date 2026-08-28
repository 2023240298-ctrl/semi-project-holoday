package com.holoday.api.user.controller;

import com.holoday.api.user.dto.*;
import com.holoday.api.user.entity.User;
import com.holoday.api.user.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/holoday")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final AuthService authService;

    @PostMapping("/signup")
    public void signup(@RequestBody User user) {

        System.out.println("컨트롤러 회원가입 진입");

        authService.signup(user);
    }

    @PostMapping("/login")
    @Operation(hidden=true)
    public Map<String, Object> login(@RequestBody LoginDTO loginDTO) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        loginDTO.getUserId(),
                        loginDTO.getUserPw()
                );

        Authentication authentication =
                authenticationManager.authenticate(authenticationToken);

        UserDTO userDTO = (UserDTO) authentication.getPrincipal();

        return userDTO.getClaims();
    }
}