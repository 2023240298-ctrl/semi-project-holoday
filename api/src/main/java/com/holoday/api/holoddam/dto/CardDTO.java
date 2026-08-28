package com.holoday.api.holoddam.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.holoday.api.holoddam.entity.Card;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CardDTO {
    private Long cardNo;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime cardOriginDate;
    private String cardCategory;
    private String cardTitle;
    private String cardSumm;
    private String cardOriginUrl;
    private String cardImageUrl;

    public static CardDTO from(Card card){
        return CardDTO.builder()
                .cardNo(card.getCardNo())
                .cardOriginDate(card.getCardOriginDate())
                .cardCategory(card.getCardCategory())
                .cardTitle(card.getCardTitle())
                .cardSumm(card.getCardSumm())
                .cardOriginUrl(card.getCardOriginUrl())
                .cardImageUrl(card.getCardImageUrl())
                .build();
    }

    public Card toEntity(){
        return Card.builder()
                .cardNo(this.getCardNo())
                .cardOriginDate(this.getCardOriginDate())
                .cardCategory(this.getCardCategory())
                .cardTitle(this.getCardTitle())
                .cardSumm(this.getCardSumm())
                .cardOriginUrl(this.getCardOriginUrl())
                .cardImageUrl(this.getCardImageUrl())
                .build();
    }
}
