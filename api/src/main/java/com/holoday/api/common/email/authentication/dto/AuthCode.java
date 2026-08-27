package com.holoday.api.common.email.authentication.dto;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AuthCode {
    private final String code;
    private final LocalDateTime expiredAt;

    public AuthCode(String code, long validMin) {
        this.code = code;
        this.expiredAt = LocalDateTime.now().plusMinutes(validMin);
    }

    public boolean isExpired(){
        return LocalDateTime.now().isAfter(this.expiredAt);
    }
}
