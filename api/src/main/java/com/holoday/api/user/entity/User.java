package com.holoday.api.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.type.NumericBooleanConverter;

@Entity
@Table(name = "h_user")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @Column(length = 10)
    private String userId;

    @Column(length = 30)
    private String userEmail;

    @Column(length = 10)
    private String userNick;

    @Column(length = 100)
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

    public void changeUserPw(String userPw) {
        this.userPw = userPw;
    }

    public void changeUserIsAdmin(boolean userIsAdmin) {
        this.userIsAdmin = userIsAdmin;
    }
}
