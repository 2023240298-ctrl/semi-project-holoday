package com.holoday.api.common.email.authentication.service;

import com.holoday.api.common.email.authentication.dto.AuthCode;
import com.holoday.api.common.email.authentication.dto.EmailDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {
    private final JavaMailSender mailSender;
    private final Map<String, AuthCode> savedAuthCode = new ConcurrentHashMap<>();
    private static final long VALID_MINUTES = 5L;

    private String createCode(){
        Random random = new Random();
        int code = random.nextInt(1000000);
        return String.format("%06d", code);
    }

    @Override
    public void sendEmail(EmailDTO.EmailSendRequest request) {
        String email = request.getEmail();
        String authCode = createCode();
        savedAuthCode.put(email, new AuthCode(authCode, VALID_MINUTES));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("[Holoday] 회원 가입 이메일 인증 코드");
        message.setText("인증번호는 ["+authCode+"] 입니다.");
        try {
            mailSender.send(message);
        } catch (Exception e){
            log.error("error occurred during sending email", e);
            throw new RuntimeException("failed to send email", e);
        }
    }

    @Override
    public boolean verifyCode(EmailDTO.EmailAuthenticationRequest request) {
        String email = request.getEmail();
        String userInput = request.getCode();

        AuthCode storedAuthCode = savedAuthCode.get(email);
        if (storedAuthCode == null){
            return false;
        }
        if (storedAuthCode.isExpired()){
            savedAuthCode.remove(email);
            return false;
        }
        if (storedAuthCode.getCode().equals(userInput)){
            savedAuthCode.remove(email);
            return true;
        }
        return false;
    }
}
