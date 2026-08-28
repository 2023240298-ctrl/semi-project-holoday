package com.holoday.api.holoddam.service.api;

import com.holoday.api.holoddam.dto.api.NaverNewsResponse;

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
public class NaverNewsApiServiceImpl implements ApiService<NaverNewsResponse> {
    @Value("${external-api.naver.client-id}")
    private String clientId;

    @Value("${external-api.naver.client-secret}")
    private String clientSecret;

    private final RestClient restClient;

    @Override
    public NaverNewsResponse search(String keyword, SortType sortType) {
        String sort = (sortType == SortType.RECENCY) ? "date":"sim";

        URI uri = UriComponentsBuilder
                .fromUriString("https://openapi.naver.com")
                .path("/v1/search/news.json")
                .queryParam("query", keyword)
                .queryParam("display", 5)
                //resent: date, popular: sim
                .queryParam("sort", sort)
                .encode()
                .build()
                .toUri();
        try {
            return restClient.get()
                    .uri(uri)
                    .header("X-Naver-Client-Id", clientId)
                    .header("X-Naver-Client-Secret", clientSecret)
                    .retrieve()
                    .body(NaverNewsResponse.class);
        } catch (Exception e) {
            log.error("네이버 API 호출 중 에러 발생: {}", e.getMessage());
            return null;
        }
    }
}