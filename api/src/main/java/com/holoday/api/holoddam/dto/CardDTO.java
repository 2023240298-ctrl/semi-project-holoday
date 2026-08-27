package com.holoday.api.holoddam.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CardDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardNo;
    private LocalDateTime cardOriginDate;
    private String cardCategory;
    private String cardTitle;
    private String cardSumm;
    private String cardOriginalUrl;
    private String cardImageUrl;
}
