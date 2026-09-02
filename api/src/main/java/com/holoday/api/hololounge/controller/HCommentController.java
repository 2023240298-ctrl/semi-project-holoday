package com.holoday.api.hololounge.controller;

import com.holoday.api.common.pagination.PageRequestDTO;
import com.holoday.api.common.pagination.PageResponseDTO;
import com.holoday.api.hololounge.dto.HCommentDTO;
import com.holoday.api.hololounge.service.HCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class HCommentController {

    private final HCommentService hCommentService;

    @GetMapping("/api/holoday/board/{boardNo}/comments")
    public ResponseEntity<PageResponseDTO<HCommentDTO>> list(
            @PathVariable Long boardNo,
            PageRequestDTO pageRequestDTO
    ){
        PageResponseDTO<HCommentDTO> responseDTO =
                hCommentService.list(boardNo, pageRequestDTO);

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping("/api/holoday/board/{boardNo}/comments")
    public ResponseEntity<Map<String, Long>> register(
            @PathVariable Long boardNo,
            @RequestBody HCommentDTO hCommentDTO
    ) {
        hCommentDTO.setBoardNo(boardNo);

        Long commentNo = hCommentService.register(hCommentDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("commentNo", commentNo));
    }

    @PatchMapping("/api/holoday/comment/{commentNo}")
    public ResponseEntity<Map<String, String>> modify(
            @PathVariable Long commentNo,
            @RequestBody HCommentDTO hCommentDTO
    ) {
        hCommentDTO.setCommentNo(commentNo);
        hCommentService.modify(hCommentDTO);

        return ResponseEntity.ok(
                Map.of("result", "댓글이 수정되었습니다.")
        );
    }

    @DeleteMapping("/api/holoday/comment/{commentNo}")
    public ResponseEntity<Map<String, String>> remove(
            @PathVariable Long commentNo
    ) {
        hCommentService.remove(commentNo);

        return ResponseEntity.ok(
                Map.of("result", "댓글이 삭제되었습니다.")
        );
    }
}
