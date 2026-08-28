package com.holoday.api.holoddam.dto.api;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GoogleSearchResponse {
    private List<SearchItem> items;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SearchItem{
        private String title;
        private String link;
        private String snippet;

        private String fullText;
    }
}
