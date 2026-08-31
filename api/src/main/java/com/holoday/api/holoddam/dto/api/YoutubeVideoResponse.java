package com.holoday.api.holoddam.dto.api;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
public class YoutubeVideoResponse {
    private List<SearchItem> items;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class SearchItem {
        private String videoId;
        private String title;
        private String description;
        private String channelTitle;
        private String thumbnailUrl;

        public String getVideoUrl() {
            return (videoId != null) ? "https://www.youtube.com/watch?v=" + videoId : null;
        }

        @JsonProperty("id")
        private void unpackVideoId(Map<String, Object> id) {
            if (id != null) {
                this.videoId = (String) id.get("videoId");
            }
        }

        @SuppressWarnings("unchecked")
        @JsonProperty("snippet")
        private void unpackSnippet(Map<String, Object> snippet) {
            if (snippet != null) {
                this.title = (String) snippet.get("title");
                this.description = (String) snippet.get("description");
                this.channelTitle = (String) snippet.get("channelTitle");

                Map<String, Object> thumbnails = (Map<String, Object>) snippet.get("thumbnails");
                if (thumbnails != null) {
                    Map<String, Object> medium = (Map<String, Object>) thumbnails.get("medium");
                    if (medium != null) {
                        this.thumbnailUrl = (String) medium.get("url");
                    }
                }
            }
        }
    }
}
