package com.holoday.api.holoddam.service.api;

import com.holoday.api.holoddam.dto.api.OpenApiRequest;
import com.holoday.api.holoddam.dto.api.OpenApiResponse;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenApiService {
    private static final int MAX_TEXT_LENGTH = 2500;
    @Value("${external-api.openai.api-key}")
    private String apiKey;

    private final RestClient restClient;

    public String summarize(String content){
        if (content == null || content.isBlank()){
            return null;
        }
        if (content.length() >= MAX_TEXT_LENGTH){
            content = content.substring(0, MAX_TEXT_LENGTH);
        }
        OpenApiRequest request = new OpenApiRequest(
                "gpt-4o-mini",
                List.of(
                        new OpenApiRequest.Message("system", "너는 웹 컨텐츠 및 뉴스 전문 요약 AI이다.전달받은 본문 텍스트를 바탕으로 핵심 내용만 문장으로 요약하라.\n" +
                                "[제약 조건]\n" +
                                "    1. 각 문장은 원문의 핵심 사실을 포함하여 충분히 상세하게 작성할 것.\n" +
                                "    2. 3개 이상의 문장이 하나의 완성도 높은 문단을 이루도록 할 것.\n" +
                                "    3. 인사말, 서론, 결론(\"요약입니다\" 등)은 절대 포함하지 말 것.\n" +
                                "    4. 원문에 없는 내용을 추측하거나 지어내지 말 것.\n" +
                                "    5. 자연스러운 한국어로 작성할 것."),
                        new OpenApiRequest.Message("user", content)
                )
        );
        try{
            OpenApiResponse response = restClient.post()
                    .uri("https://api.openai.com/v1/chat/completions")
                    .header("Authorization", "Bearer "+apiKey)
                    .header("Content-Type", "application/json")
                    .body(request)
                    .retrieve()
                    .body(OpenApiResponse.class);

            if (response !=null && response.getChoices() != null && !response.getChoices().isEmpty()){
                String summary = response.getChoices().get(0).getMessage().getContent();
                if (summary != null && summary.length()>=500){
                    summary = summary.substring(0, 496)+"...";
                }
                return summary;
            }
            return null;
        } catch (Exception e){
            log.error(e.getMessage());
            return null;
        }
    }
}
