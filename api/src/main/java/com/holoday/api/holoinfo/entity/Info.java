package com.holoday.api.holoinfo.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "h_info")
public class Info {
    @Id
    @Column(name = "INFO_NO")
    private Long infoNo;

    @Column(name = "USER_ID", length = 10, nullable = false)
    private String userId;

    @Column(name = "CATEGORY_NO",nullable = false)
    private Long categoryNo;

    @Column(name = "INFO_DATE")
    private LocalDateTime infoDate;

    @Column(name = "INFO_HIT", nullable = false)
    private Long infoHit;

    @Column(name = "INFO_TITLE", nullable = false)
    private String infoTitle;

    @Lob
    @Column(name = "INFO_CONTENT",nullable = false)
    private String infoContent;

    @Column(name = "INFO_PLACE", length = 100, nullable = false)
    private String infoPlace;

    @Column(name = "INFO_ADDRESS", length = 200, nullable = false)
    private String infoAddress;

    @Column(name = "INFO_LIKE", nullable = false)
    private Long infoLike;

    @Column(name = "INFO_IMG", length = 200)
    private String infoImg;

    @Column(name = "INFO_SIMG", length = 200)
    private String infoSimg;





}
