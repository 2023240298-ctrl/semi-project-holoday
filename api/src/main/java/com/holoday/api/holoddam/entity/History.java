package com.holoday.api.holoddam.entity;


import com.holoday.api.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "h_history")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class History {
    @Id
    @Column(name = "history_no", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_no", nullable = false)
    private Card card;

    @Builder.Default
    @Column(name = "history_date", nullable = false, updatable = false)
    private LocalDateTime historyDate = LocalDateTime.now();
}
