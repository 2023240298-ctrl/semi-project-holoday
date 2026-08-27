package com.holoday.api.user.entity;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.type.NumericBooleanConverter;

@Entity
@Table(name = "h_user")
@Getter
@NoArgsConstructor
public class User {
    @Id
    private String userId;
    private String userEmail;
    private String userNick;
    private String userPw;
    @Convert(converter = NumericBooleanConverter.class)
    private boolean userIsAdmin;

    public User(String userId, String userEmail, String userNick, String userPw, boolean userIsAdmin) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.userNick = userNick;
        this.userPw = userPw;
        this.userIsAdmin = userIsAdmin;
    }


}
