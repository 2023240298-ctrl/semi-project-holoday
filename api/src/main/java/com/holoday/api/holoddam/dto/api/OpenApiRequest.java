package com.holoday.api.holoddam.dto.api;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OpenApiRequest {
    private String model;
    private List<Message> message;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Message{
        private String role;
        private String content;
    }
}
