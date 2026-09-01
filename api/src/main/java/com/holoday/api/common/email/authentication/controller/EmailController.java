package com.holoday.api.common.email.authentication.controller;

import com.holoday.api.common.email.authentication.dto.EmailDTO;
import com.holoday.api.common.email.authentication.service.EmailService;
import com.holoday.api.common.responsedto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/holoday")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<ApiResponse<Void>> sendEmail(@RequestBody EmailDTO.EmailSendRequest request){
        emailService.sendEmail(request);
        return ResponseEntity.ok(ApiResponse.success("인증번호가 발송되었습니다."));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<ApiResponse<Void>> verifyCode(@RequestBody EmailDTO.EmailAuthenticationRequest request){
        boolean isSuccess = emailService.verifyCode(request);
        if (isSuccess){
            return ResponseEntity.ok(ApiResponse.success("인증 성공!"));
        } else{
         return ResponseEntity.ok(ApiResponse.fail("인증에 실패했습니다."));
        }
    }
}
