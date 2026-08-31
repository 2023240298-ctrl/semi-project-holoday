package com.holoday.api.holoddam.service;

import com.holoday.api.holoddam.entity.Card;
import com.holoday.api.holoddam.entity.History;
import com.holoday.api.holoddam.repository.CardRepository;
import com.holoday.api.holoddam.repository.HistoryRepository;
import com.holoday.api.user.entity.User;
import com.holoday.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService{
    private final HistoryRepository historyRepository;
    private final CardRepository cardRepository;
    private final UserRepository userRepository;

    @Override
    public Card viewCard(String userId) {
        List<Long> viewedCardNos = historyRepository.findAllByUserIdOrderByCardNoDesc(userId).stream()
                .map(history -> history.getCard().getCardNo())
                .toList();

        List<Card> availableCards = viewedCardNos.isEmpty()
                ? cardRepository.findAll() : cardRepository.findByCardNoNotIn(viewedCardNos);

        if (availableCards.isEmpty()) return null;
        int randomIndex = new Random().nextInt(availableCards.size());
        Card selectedCard = availableCards.get(randomIndex);

        User user = userRepository.findByUserId(userId)
                .orElseThrow(()->new IllegalArgumentException("there is no such user"));

        History history = History.builder()
                .user(user)
                .card(selectedCard)
                .build();
        historyRepository.save(history);

        return selectedCard;
    }

    @Override
    public List<Card> viewCards(String userId) {
        List<History> histories = historyRepository.findAllByUserIdOrderByCardNoDesc(userId);
        return histories.stream()
                .map(History::getCard)
                .toList();
    }
}
