package com.holoday.api.hololounge.service;

import com.holoday.api.common.pagination.*;
import com.holoday.api.hololounge.dto.HCommentDTO;
import com.holoday.api.hololounge.entity.HComment;
import com.holoday.api.hololounge.repository.HCommentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HCommentServiceImpl implements HCommentService {
    private final HCommentRepository hCommentRepository;

    @Override
    public Long register(HCommentDTO hCommentDTO) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String userId = authentication.getName();

        HComment hComment = new HComment(
                hCommentDTO.getBoardNo(),
                userId,
                hCommentDTO.getCommentContent()
        );

        HComment saveComment = hCommentRepository.save(hComment);

        return saveComment.getCommentNo();
    }

    @Transactional(readOnly = true)
    @Override
    public PageResponseDTO<HCommentDTO> list(Long boardNo, PageRequestDTO pageRequestDTO) {
        Pageable pageable = pageRequestDTO.getPageable("commentNo");

        Page<HComment> commentPage =
                hCommentRepository.findByBoardNo(boardNo, pageable);

        List<HCommentDTO> dtoList = commentPage.getContent()
                .stream()
                .map(comment -> new HCommentDTO(
                        comment.getCommentNo(),
                        comment.getBoardNo(),
                        comment.getUserId(),
                        comment.getCommentContent(),
                        comment.getCommentDate(),
                        comment.getCommentLike()
                )).toList();

        return new PageResponseDTO<>(
                dtoList,
                pageRequestDTO,
                commentPage.getTotalElements()
        );
    }

    @Override
    public void modify(HCommentDTO hCommentDTO) {
        HComment hComment = hCommentRepository.findById(
                hCommentDTO.getCommentNo()
        ).orElseThrow(() ->
                new EntityNotFoundException(
                        hCommentDTO.getCommentNo() + "번 댓글이 존재하지 않습니다."
                )
        );

        hComment.updateContent(
                hCommentDTO.getCommentContent()
        );
    }

    @Override
    public void remove(Long commentNo) {

        HComment hComment = hCommentRepository.findById(commentNo)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                commentNo + "번 댓글이 존재하지 않습니다."
                        )
                );

        hCommentRepository.delete(hComment);
    }

    @Override
    public void like(Long commentNo) {

        HComment hComment = getComment(commentNo);
        hComment.plusLike();
    }

    @Override
    public void unlike(Long commentNo) {

        HComment hComment = getComment(commentNo);
        hComment.minusLike();
    }

    private HComment getComment(Long commentNo) {
        return hCommentRepository.findById(commentNo)
                .orElseThrow(() ->
                        new EntityNotFoundException(
                                commentNo + "번 댓글이 존재하지 않습니다."
                        )
                );
    }
}
