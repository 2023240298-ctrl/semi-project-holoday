package com.holoday.api.holoddam.repository;

import com.holoday.api.holoddam.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByCardNoNotIn(List<Long> cardNos);

    @Modifying
    @Transactional
    @Query(value = "TRUNCATE TABLE h_card", nativeQuery = true)
    void truncateCard();
}
