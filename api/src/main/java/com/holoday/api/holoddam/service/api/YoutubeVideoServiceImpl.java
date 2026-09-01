package com.holoday.api.holoddam.service.api;

import com.holoday.api.holoddam.dto.api.YoutubeVideoResponse;
import com.holoday.api.holoddam.entity.SortType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
@RequiredArgsConstructor
@Slf4j
public class YoutubeVideoServiceImpl implements ApiService<YoutubeVideoResponse> {
    @Value("${external-api.youtube.api-key}")
    private String apiKey;

    private final RestClient restClient;

    @Override
    public YoutubeVideoResponse search(String query, SortType sortType) {
        String order = (sortType == SortType.RECENCY) ? "date" : "viewCount";

        URI uri = UriComponentsBuilder
                .fromUriString("https://www.googleapis.com/youtube/v3/search")
                .queryParam("key", apiKey)
                .queryParam("part", "snippet")
                .queryParam("type", "video")
                .queryParam("q", query)
                .queryParam("maxResults", 5) // num 대신 유튜브는 maxResults 사용
                .queryParam("order", order)
                .encode()
                .build()
                .toUri();

        try {
            return restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(YoutubeVideoResponse.class);
        } catch (Exception e) {
            log.error("유튜브 API 호출 실패: {}", e.getMessage());
            return null;
        }
    }
}