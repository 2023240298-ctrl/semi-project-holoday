package com.holoday.api.common.email.authentication.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

public class EmailDTO {

    @Getter
    @NoArgsConstructor
    public static class EmailSendRequest{
        private String email;
    }

    @Getter
    @NoArgsConstructor
    public static class EmailAuthenticationRequest{
        private String email;
        private String code;
    }

}
