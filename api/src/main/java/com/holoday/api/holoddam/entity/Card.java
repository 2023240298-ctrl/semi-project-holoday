package com.holoday.api.holoddam.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "h_card")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_no")
    private Long cardNo;

    @Builder.Default
    @Column(name = "card_origin_date", nullable = false, updatable = false)
    private LocalDateTime cardOriginDate = LocalDateTime.now();

    @Column(name = "card_category", length = 10, nullable = false)
    private String cardCategory;

    @Column(name = "card_title", length = 100, nullable = false)
    private String cardTitle;

    @Column(name = "card_summ", length = 500, nullable = false)
    private String cardSumm;

    @Column(name = "card_origin_url", length = 1000, nullable = false)
    private String cardOriginUrl;

    @Column(name = "card_image_url", length = 1000)
    private String cardImageUrl;
}
