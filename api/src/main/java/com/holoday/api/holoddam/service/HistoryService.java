package com.holoday.api.holoddam.service;

import com.holoday.api.holoddam.entity.Card;

import java.util.List;

public interface HistoryService {
    Card viewCard(String userId);
    List<Card> viewCards(String userId);
    void deleteHistory(Long cardNo);
}
