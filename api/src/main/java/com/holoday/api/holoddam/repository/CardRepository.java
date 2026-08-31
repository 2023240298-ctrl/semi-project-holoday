package com.holoday.api.holoddam.repository;

import com.holoday.api.holoddam.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {
}
