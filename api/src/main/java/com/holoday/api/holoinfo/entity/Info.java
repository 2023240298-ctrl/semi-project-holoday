package com.holoday.api.holoinfo.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "h_info")
@Getter
@NoArgsConstructor
public class Info {

    @Id
    @Column(name = "INFO_NO")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long infoNo;

    @Column(name = "USER_ID", length = 10, nullable = false)
    private String userId;

    @Column(name = "CATEGORY_NO", nullable = false)
    private Long categoryNo;

    @Column(name = "INFO_DATE", nullable = false)
    private LocalDateTime infoDate = LocalDateTime.now();

    @Column(name = "INFO_HIT", nullable = false)
    private Long infoHit = 0L;

    @Column(name = "INFO_TITLE", length = 100, nullable = false)
    private String infoTitle;

    @Lob
    @Column(name = "INFO_CONTENT", nullable = false)
    private String infoContent;

    @Column(name = "INFO_PLACE", length = 100, nullable = false)
    private String infoPlace;

    @Column(name = "INFO_ADDRESS", length = 200, nullable = false)
    private String infoAddress;

    @Column(name = "INFO_LIKE", nullable = false)
    private Long infoLike = 0L;

    @Column(name = "INFO_IMG", length = 200)
    private String infoImg;

    @Column(name = "INFO_SIMG", length = 200)
    private String infoSimg;

    public Info(
            String userId,
            Long categoryNo,
            String infoTitle,
            String infoContent,
            String infoPlace,
            String infoAddress,
            String infoImg,
            String infoSimg
    ) {
        this.userId = userId;
        this.categoryNo = categoryNo;
        this.infoTitle = infoTitle;
        this.infoContent = infoContent;
        this.infoPlace = infoPlace;
        this.infoAddress = infoAddress;
        this.infoImg = infoImg;
        this.infoSimg = infoSimg;
    }

    public void changeCategoryNo(Long categoryNo) {
        this.categoryNo = categoryNo;
    }

    public void changeInfoTitle(String infoTitle) {
        this.infoTitle = infoTitle;
    }

    public void changeInfoContent(String infoContent) {
        this.infoContent = infoContent;
    }

    public void changeInfoPlace(String infoPlace) {
        this.infoPlace = infoPlace;
    }

    public void changeInfoAddress(String infoAddress) {
        this.infoAddress = infoAddress;
    }

    public void changeInfoImg(String infoImg) {
        this.infoImg = infoImg;
    }

    public void changeInfoSimg(String infoSimg) {
        this.infoSimg = infoSimg;
    }
    public void increaseInfoHit() {
        this.infoHit++;
    }
}