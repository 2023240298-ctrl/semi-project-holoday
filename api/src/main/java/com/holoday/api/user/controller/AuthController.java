package com.holoday.api.user.controller;

import com.holoday.api.user.dto.*;
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

    @PostMapping("/login")
    @Operation(hidden=true)
    public Map<String, Object> login(@RequestBody LoginDTO loginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDTO.getUserId(), loginDTO.getUserPw());
        Authentication authentication = authenticationManager.authenticate(authenticationToken);
        UserDTO userDTO = (UserDTO) authentication.getPrincipal();
        return userDTO.getClaims();
    }
}
