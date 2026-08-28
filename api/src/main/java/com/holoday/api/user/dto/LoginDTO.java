package com.holoday.api.user.dto;

import lombok.*;

@Setter
@Getter
public class LoginDTO {
    private String userId;
    private String userPw;
}