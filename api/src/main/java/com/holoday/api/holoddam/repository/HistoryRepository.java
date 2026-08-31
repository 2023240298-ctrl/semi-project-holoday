package com.holoday.api.holoddam.repository;

import com.holoday.api.holoddam.entity.Card;
import com.holoday.api.holoddam.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface HistoryRepository extends JpaRepository<History, Long> {
    @Query("SELECT h FROM History h WHERE h.user.userId = :userId ORDER BY h.card.cardNo DESC")
    List<History> findAllByUserIdOrderByCardNoDesc(@Param("userId") String userId);
}
