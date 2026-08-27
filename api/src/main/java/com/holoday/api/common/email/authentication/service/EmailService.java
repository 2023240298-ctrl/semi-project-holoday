package com.holoday.api.common.email.authentication.service;

import com.holoday.api.common.email.authentication.dto.EmailDTO;

public interface EmailService {
    void sendEmail(EmailDTO.EmailSendRequest request);
    boolean verifyCode(EmailDTO.EmailAuthenticationRequest request);
}
