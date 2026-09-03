package com.holoday.api.hololounge.repository;

import com.holoday.api.hololounge.entity.HComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HCommentRepository extends JpaRepository<HComment, Long> {
    Page<HComment> findByBoardNo(Long boardNo, Pageable pageable);

    void deleteByBoardNo(Long boardNo);
}
