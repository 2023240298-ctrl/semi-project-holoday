package com.holoday.api.holoddam.dto.api;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CrawlResult{
    private String content;
    private String imageUrl;
    private String title;
}
