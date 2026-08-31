package com.holoday.api.hololounge.entity;

import jakarta.persistence.*;
import lombok.*;

import java.lang.invoke.StringConcatException;
import java.time.LocalDate;

@Entity
@Table(name = "h_board")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HoloLounge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardNo;

    @Column(name = "category_no",nullable = false)
    private Long categoryNo;

    @Column(name = "user_id", nullable = false, length = 10)
    private String userId;

    @Column(name = "board_title", nullable = false, length = 100)
    private String boardTitle;

    @Lob
    @Column(name = "board_content", nullable = false, length = 100)
    private String boardContent;

    @Column(name = "board_scontent", length = 100)
    private String boardScontent;

    @Column(name = "board_date", nullable = false)
    private LocalDate boardDate;

    @Column(name = "board_like", nullable = false)
    private Long boardLike = 0L;

    @Column(name = "board_hit", nullable = false)
    private Long boardHit = 0L;

    @Column(name = "board_img", length = 200)
    private String boardImg;

    @Column(name = "board_simg", length = 200)
    private String boardSimg;

    public HoloLounge(Long categoryNo, String userId, String boardTitle, String boardContent, String boardScontent,
                      String boardImg, String boardSimg){
        this.categoryNo = categoryNo;
        this.userId = userId;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.boardScontent = boardScontent;
        this.boardImg = boardImg;
        this.boardSimg = boardSimg;

        this.boardDate = LocalDate.now();
    }

    public void updateDate(Long categoryNo, String boardTitle, String boardContent, String boardScontent,
                           String boardImg, String boardSimg){
        this.categoryNo = categoryNo;
        this.boardTitle = boardTitle;
        this.boardContent = boardContent;
        this.boardScontent = boardScontent;
        this.boardImg = boardImg;
        this.boardSimg = boardSimg;
    }

    public void plusHit() {
        this.boardHit++;
    }

    public void plusLike() {
        this.boardLike++;
    }

    public void minusLike() {
        if(this.boardLike > 0) {
            this.boardLike--;
        }
    }
}
