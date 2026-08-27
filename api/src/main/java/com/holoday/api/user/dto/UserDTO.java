package com.holoday.api.user.dto;

import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Getter
public class UserDTO extends User {
    private String userId;
    private String userEmail;
    private String userNick;
    private String userPw;
    private boolean userIsAdmin;

    public UserDTO(String userId, String userEmail, String userNick, String userPw, boolean userIsAdmin) {
        super(userId, userPw,
                List.of(new SimpleGrantedAuthority(userIsAdmin ? "ROLE_ADMIN" : "ROLE_USER")));
        this.userId = userId;
        this.userEmail = userEmail;
        this.userNick = userNick;
        this.userPw = userPw;
        this.userIsAdmin = userIsAdmin;
    }

    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();

        dataMap.put("userId",userId);
        dataMap.put("userEmail",userEmail);
        dataMap.put("userNick",userNick);
        dataMap.put("userIsAdmin",userIsAdmin);

        return dataMap;
    }
}
