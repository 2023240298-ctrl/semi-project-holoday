package com.holoday.api.hololounge.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "h_comment")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class HComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentNo;

    @Column(name = "board_no", nullable = false)
    private Long boardNo;

    @Column(name = "user_id", nullable = false, length = 10)
    private String userId;

    @Column(name = "comment_content", nullable = false, length = 500)
    private String commentContent;

    @Column(name = "comment_date", nullable = false)
    private LocalDate commentDate;

    @Column(name = "comment_like", nullable = false)
    private Long commentLike = 0L;

    public HComment(Long boardNo, String userId, String commentContent) {
        this.boardNo = boardNo;
        this.userId = userId;
        this.commentContent = commentContent;
        this.commentDate = LocalDate.now();
    }

    public void updateContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public void plusLike() {
        this.commentLike++;
    }

    public void minusLike() {
        if(this.commentLike > 0) {
            this.commentLike--;
        }
    }
}
