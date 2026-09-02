package com.holoday.api.holoddam.dto.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class GoogleSearchResponse {
    @JsonProperty("organic_results")
    private List<SearchItem> organicResults;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SearchItem{
        private String title;
        private String link;
        private String snippet;
        private String thumbnail;

        private String fullText;
    }
}
