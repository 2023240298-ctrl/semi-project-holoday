package com.holoday.api.holoddam.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyNo;
    private String userId;
    private String cardNo;
    @Column(name = "history_date", updatable = false)
    private LocalDateTime historyDate;

}
