package com.holoday.api.holoddam.service;

import com.holoday.api.holoddam.entity.Card;
import com.holoday.api.holoddam.repository.CardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService{
    private final CardRepository cardRepository;

    private Card findByCardNo(Long cardNo){
        return cardRepository.findById(cardNo)
                .orElseThrow(()-> new IllegalArgumentException("there is no such card"));
    }

    @Override
    public void delete(Long cardNo) {
        cardRepository.delete(findByCardNo(cardNo));
    }
}
