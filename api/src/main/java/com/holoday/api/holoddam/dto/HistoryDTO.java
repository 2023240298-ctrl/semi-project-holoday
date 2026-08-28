package com.holoday.api.holoddam.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.holoday.api.holoddam.entity.History;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HistoryDTO {
    private Long historyNo;
    private String userId;
    private Long cardNo;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime historyDate;

    public static HistoryDTO from(History history){
        return HistoryDTO.builder()
                .historyNo(history.getHistoryNo())
                .userId(history.getUser() != null ? history.getUser().getUserId() : null)
                .cardNo(history.getCard() != null ? history.getCard().getCardNo() : null)
                .historyDate(history.getHistoryDate())
                .build();
    }
}
