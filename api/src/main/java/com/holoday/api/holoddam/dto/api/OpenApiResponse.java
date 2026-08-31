package com.holoday.api.holoddam.dto.api;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class OpenApiResponse {
    private List<Choice> choices;

    @Getter
    @NoArgsConstructor
    public static class Choice{
        private Message message;
    }

    @Getter
    @NoArgsConstructor
    public static class Message{
        private String content;
    }
}
