package com.holoday.api.holoddam.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
public class NaverNewsResponse {
    private List<NewsItem> items;

    @Getter
    @NoArgsConstructor
    public static class NewsItem{
        private String title;
        private String originallink;
        private String link;
        private String description;
        private String pubDate;

        private String fullText;
    }
}
