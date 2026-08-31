package com.holoday.api.user.controller;

import com.holoday.api.user.dto.*;
import com.holoday.api.util.JWTUtil;
import io.swagger.v3.oas.annotations.Operation;
import lombok.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/holoday")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

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
        Map<String, Object> claims = userDTO.getClaims();

        String accessToken = jwtUtil.generateToken(loginDTO.getUserId());
        String refreshToken = jwtUtil.generateToken(loginDTO.getUserId());

        Map<String, Object> result = new HashMap<>(claims);

        result.put("accessToken", accessToken);
        result.put("refreshToken", refreshToken);

        return result;
    }
}