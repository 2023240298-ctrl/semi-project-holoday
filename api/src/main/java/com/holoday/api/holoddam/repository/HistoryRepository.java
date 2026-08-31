package com.holoday.api.holoddam.repository;

import com.holoday.api.holoddam.entity.Card;
import com.holoday.api.holoddam.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {
}
