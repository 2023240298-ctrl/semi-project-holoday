package com.holoday.api.holoddam.service;

import com.holoday.api.holoddam.dto.api.CrawlResult;
import com.holoday.api.holoddam.dto.api.GoogleSearchResponse;
import com.holoday.api.holoddam.dto.api.NaverNewsResponse;
import com.holoday.api.holoddam.dto.api.YoutubeVideoResponse;
import com.holoday.api.holoddam.entity.Card;
import com.holoday.api.holoddam.entity.SortType;
import com.holoday.api.holoddam.repository.CardRepository;
import com.holoday.api.holoddam.service.api.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.util.HtmlUtils;

@Service
@Slf4j
@RequiredArgsConstructor
public class CardFacadeServiceImpl implements CardFacadeService {
    private final NaverNewsApiServiceImpl naverNewsApiService;
    private final GoogleSearchApiServiceImpl googleSearchApiService;
    private final YoutubeVideoServiceImpl youtubeVideoServiceImpl;
    private final OpenApiService openApiService;
    private final CrawlerService crawlerService;
    private final CardRepository cardRepository;

    @Override
    public void collectAndSaveAll(String query, SortType sortType) {
        collectAndSaveNews(query, sortType);
        collectAndSaveBlog(query, sortType);
        collectAndSaveVideo(query, sortType);
    }

    @Override
    public void collectAndSaveNews(String query, SortType sortType) {
        try {
            NaverNewsResponse response = naverNewsApiService.search(query, sortType);
            if (response == null || response.getItems() == null) return;
            for (NaverNewsResponse.NewsItem item : response.getItems()) {
                CrawlResult crawlResult = crawlerService.extractText(item.getOriginallink());
                String rawContent = (crawlResult != null && !crawlResult.getContent().isBlank())
                        ? crawlResult.getContent() : item.getDescription();
                String imageUrl = (crawlResult != null) ? crawlResult.getImageUrl() : "";

                String summary = openApiService.summarize(rawContent);

                Card card = Card.builder()
                        .cardCategory("NEWS")
                        .cardTitle(cutText(item.getTitle(),100))
                        .cardSumm(cutText(summary,500))
                        .cardOriginUrl(item.getLink())
                        .cardImageUrl(imageUrl)
                        .build();

                cardRepository.save(card);
            }
        } catch (Exception e) {
            log.error("error occurred during collecting news(naver)", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public void collectAndSaveBlog(String query, SortType sortType) {
        try {
            GoogleSearchResponse response = googleSearchApiService.search(query, sortType);
            if (response == null || response.getOrganicResults() == null) return;

            for (GoogleSearchResponse.SearchItem item : response.getOrganicResults()) {
                CrawlResult crawlResult = crawlerService.extractText(item.getLink());

                String rawContent = (crawlResult != null && !crawlResult.getContent().isBlank())
                        ? crawlResult.getContent() : item.getSnippet();

                String title = (crawlResult != null && crawlResult.getTitle() != null && !crawlResult.getTitle().isBlank())
                        ? crawlResult.getTitle() : item.getTitle();
                String imageUrl = (crawlResult != null) ? crawlResult.getImageUrl() : "";
                String summary = openApiService.summarize(rawContent);

                Card card = Card.builder()
                        .cardCategory("BLOG")
                        .cardTitle(cutText(title, 100))
                        .cardSumm(cutText(summary, 500))
                        .cardOriginUrl(item.getLink())
                        .cardImageUrl(imageUrl)
                        .build();
                cardRepository.save(card);
            }
        } catch (Exception e) {
            log.error("Error occurred during collecting blog(google api)", e.getMessage(), e);
            throw e;
        }
    }

    @Override
    public void collectAndSaveVideo(String query, SortType sortType) {
        try {
            YoutubeVideoResponse response = youtubeVideoServiceImpl.search(query, sortType);
            if (response == null || response.getItems() == null) return;

            for (YoutubeVideoResponse.SearchItem item : response.getItems()) {
                String summary = (item.getDescription() == null||item.getDescription().isBlank()) ? "영상을 시청해보세요!":item.getDescription();
                Card card = Card.builder()
                        .cardCategory("VIDEO")
                        .cardTitle(cutText(item.getTitle(),100))
                        .cardSumm(cutText(summary,500))
                        .cardOriginUrl(item.getVideoUrl())
                        .cardImageUrl(item.getThumbnailUrl())
                        .build();
                cardRepository.save(card);
            }
        } catch (Exception e) {
            log.error("error occurred during collecting video(youtube)", e.getMessage(), e);
            throw e;
        }
    }

    private String cleanText(String text){
        if (text == null || text.isBlank()){
            return "";
        }
        String cleaned = text.replaceAll("<[^>]*>", "");
        cleaned = HtmlUtils.htmlUnescape(cleaned);
        cleaned = cleaned.replaceAll("&nbsp;", " ")
                .replaceAll("\\s+", " ")
                .trim();
        return cleaned;
    }

    private String cutText(String text, int maxLength){
        String cleaned = cleanText(text);

        if (cleaned.length()<maxLength){
            return cleaned;
        }
        return cleaned.substring(0, maxLength-4)+"...";
    }
}
