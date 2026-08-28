package com.holoday.api.holoddam.service;



import com.holoday.api.holoddam.dto.GoogleSearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Service
public class GoogleSearchApiServiceImpl {
    @Value("${google.api.key}")
    private String apiKey;
    @Value("${google.api.cx}")
    private String cx;

    private final RestClient restClient = RestClient.create();

    public GoogleSearchResponse search(String query, int num){
        URI uri = UriComponentsBuilder
                .fromUriString("https://www.googleapis.com/customsearch/v1")
                .queryParam("key", apiKey)
                .queryParam("cx", cx)
                .queryParam("q", query)
                .queryParam("num", Math.min(num, 10))
                .build()
                .encode()
                .toUri();

        try{
            return restClient.get()
                    .uri(uri)
                    .retrieve()
                    .body(GoogleSearchResponse.class);
        } catch (Exception e){
            return null;
        }
    }
}
