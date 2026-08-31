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
    @Value("${external-api.google.api-key}")
    private String apiKey;
    @Value("${external-api.google.cx}")
    private String cx;

    private final RestClient restClient;

    @Override
    public GoogleSearchResponse search(String query, SortType sortType) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromUriString("https://www.googleapis.com/customsearch/v1")
                .queryParam("key", apiKey)
                .queryParam("cx", cx)
                .queryParam("q", query)
                .queryParam("num", 3);
        if (sortType == SortType.RECENCY) {
            builder.queryParam("sort", "date");
        }
        URI uri = builder.build()
                .encode()
                .toUri();

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
