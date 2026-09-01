package com.holoday.api.hololounge.service;

import com.holoday.api.common.pagination.PageRequestDTO;
import com.holoday.api.common.pagination.PageResponseDTO;
import com.holoday.api.hololounge.dto.HCommentDTO;

public interface HCommentService {
    Long register(HCommentDTO hCommentDTO);
    PageResponseDTO<HCommentDTO> list(Long boardNo, PageRequestDTO pageRequestDTO);
    void modify(HCommentDTO hCommentDTO);
    void remove(Long commentNo);
    void like(Long commentNo);
    void unlike(Long commentNo);
}
