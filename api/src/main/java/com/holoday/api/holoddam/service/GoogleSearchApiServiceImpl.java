package com.holoday.api.holoddam.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GoogleSearchApiServiceImpl {
    @Value("${google.api.key}")
    private String apiKey;
    @Value("${google.api.cx}")
    private String cx;

    private final RestClient restClient = RestClient.create();

}
