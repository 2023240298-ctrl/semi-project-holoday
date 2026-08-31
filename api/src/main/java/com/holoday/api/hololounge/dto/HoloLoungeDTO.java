package com.holoday.api.hololounge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HoloLoungeDTO {
    private Long boardNo;
    private Long categoryNo;
    private String userId;
    private String boardTitle;
    private String boardContent;
    private String boardScontent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate boardDate;

    private Long boardLike;
    private Long boardHit;
    private String boardImg;
    private String boardSimg;
}
