package com.holoday.api.common.file.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FileDTO {

    private String savedName; //원본
    private String thumbnailName; //썸네일
}

