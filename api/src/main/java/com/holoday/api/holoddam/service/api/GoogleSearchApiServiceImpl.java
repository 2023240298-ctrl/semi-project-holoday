package com.holoday.api.holoddam.service.api;


import com.holoday.api.holoddam.dto.api.GoogleSearchResponse;
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
public class GoogleSearchApiServiceImpl implements ApiService<GoogleSearchResponse> {
    @Value("${external-api.serpapi-key}")
    private String apiKey;

    private final RestClient restClient;

    @Override
    public GoogleSearchResponse search(String query, SortType sortType) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString("https://serpapi.com/search.json")
                .queryParam("engine", "google")
                .queryParam("api_key", apiKey)
                .queryParam("q", query)
                .queryParam("hl", "ko")
                .queryParam("gl", "kr")
                .queryParam("num", 5);
        if (sortType == SortType.RECENCY) {
            builder.queryParam("tbs", "qdr:d");
        }
        URI uri = builder.build().toUri();

        try {
            return restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(GoogleSearchResponse.class);
        } catch (Exception e) {
            log.error("구글 API 호출 중 에러 발생: {}", e.getMessage());
            return null;
        }
    }
}
