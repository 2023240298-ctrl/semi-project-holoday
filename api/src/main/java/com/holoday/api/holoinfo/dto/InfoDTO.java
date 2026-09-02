package com.holoday.api.holoinfo.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InfoDTO {
    private Long infoNo;
    private String userId;
    private Long categoryNo;
    private LocalDateTime infoDate;
    private Long infoHit;
    private String infoTitle;
    private String infoContent;
    private String infoPlace;
    private String infoAddress;
    private Long infoLike;
    private String infoImg;
    private String infoSimg;
}
