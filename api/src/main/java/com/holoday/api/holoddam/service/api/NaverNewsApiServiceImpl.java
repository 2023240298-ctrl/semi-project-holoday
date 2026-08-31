package com.holoday.api.holoddam.service.api;

import com.holoday.api.holoddam.dto.api.NaverNewsResponse;

import com.holoday.api.holoddam.entity.SortType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
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
                .fromUriString("https://naverapihub.apigw.ntruss.com")
                .path("/search/v1/news")
                .queryParam("query", keyword)
                .queryParam("display", 3)
                //resent: date, popular: sim
                .queryParam("sort", sort)
                .encode()
                .build()
                .toUri();
        try {
            return restClient.get()
                    .uri(uri)
                    .header("X-NCP-APIGW-API-KEY-ID", clientId)
                    .header("X-NCP-APIGW-API-KEY", clientSecret)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .body(NaverNewsResponse.class);
        } catch (Exception e) {
            log.error("네이버 API 호출 중 에러 발생: {}", e.getMessage());
            return null;
        }
    }
}