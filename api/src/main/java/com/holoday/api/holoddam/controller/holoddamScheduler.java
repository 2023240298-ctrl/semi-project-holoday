package com.holoday.api.holoddam.controller;

import com.holoday.api.holoddam.entity.SortType;
import com.holoday.api.holoddam.repository.CardRepository;
import com.holoday.api.holoddam.repository.HistoryRepository;
import com.holoday.api.holoddam.service.CardFacadeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class holoddamScheduler {
    private final HistoryRepository historyRepository;
    private final CardRepository cardRepository;

    private final CardFacadeService cardFacadeService;

    @Scheduled(cron = "0 0 3 * * *")
    public void clearHistoryAndCard(){
        try{
            historyRepository.truncateHistory();
            cardRepository.truncateCard();
        }catch (Exception e){
            log.error("error occurred during truncate operation", e.getMessage());
        }
    }

    @Scheduled(cron = "30 0 3 * * *")
    public void autoCollectCards(){
        try{
            String query = "혼자 즐기다 먹거리 즐거움 놀기 행복";
            SortType sortType = SortType.RECENCY;
            cardFacadeService.collectAndSaveAll(query, sortType);
        }catch (Exception e){
            log.error("error occurred during collecting card", e.getMessage());
        }
    }
}
