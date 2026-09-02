package com.holoday.api.hololounge.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HCommentDTO {

    private Long commentNo;
    private Long boardNo;
    private String userId;
    private String commentContent;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate commentDate;

    private Long commentLike;
}