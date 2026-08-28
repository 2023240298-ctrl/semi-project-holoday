package com.holoday.api.holoddam.service;

import com.holoday.api.holoddam.dto.NaverNewsResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class NaverNewsApiServiceImpl {
    @Value("${external-api.naver.client-id}")
    private String clientId;

    @Value("${external-api.naver.client-secret}")
    private String clientSecret;

    private final RestClient restClient = RestClient.create();

    public NaverNewsResponse search(String keyword, String sortValue){
        URI uri = UriComponentsBuilder
                .fromUriString("https://openapi.naver.com")
                .path("/v1/search/news.json")
                .queryParam("query", keyword)
                .queryParam("display", 5)
                //resent: date, popular: sim
                .queryParam("sort", sortValue)
                .encode()
                .build()
                .toUri();

        return restClient.get()
                .uri(uri)
                .header("X-Naver-Client-Id", clientId)
                .header("X-Naver-Client-Secret", clientSecret)
                .retrieve()
                .body(NaverNewsResponse.class);
    }
}
