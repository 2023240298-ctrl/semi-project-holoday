package com.holoday.api.hololounge.controller;

import com.holoday.api.common.pagination.*;
import com.holoday.api.hololounge.dto.HoloLoungeDTO;
import com.holoday.api.hololounge.service.HoloLoungeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.*;
import org.springframework.http.*;
import lombok.*;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.nio.channels.FileChannel;
import java.util.Map;

@RestController
@RequestMapping("/api/holoday/board")
@RequiredArgsConstructor
public class HoloLoungeController {

    private final HoloLoungeService holoLoungeService;

    @GetMapping(value = "/{no}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "HoloLounge 상세조회",
            description = "번호에 해당하는 게시판의 상세 페이지를 조회한다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "404", description = "게시글 없음")
    })
    public ResponseEntity<HoloLoungeDTO> get(@PathVariable Long no) {
        HoloLoungeDTO holoLoungeDTO = holoLoungeService.get(no);
        return ResponseEntity.ok(holoLoungeDTO);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "HoloLounge 목록 조회",
            description = "게시판의 목록을 페이지 단위로 조회한다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공")
    })
    public ResponseEntity<PageResponseDTO<HoloLoungeDTO>> list(PageRequestDTO pageRequestDTO) {
        PageResponseDTO<HoloLoungeDTO> responseDTO = holoLoungeService.list(pageRequestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/{no}/like")
    public ResponseEntity<Map<String, String>> like(@PathVariable Long no) {
        holoLoungeService.like(no);
        return ResponseEntity.ok(Map.of("result", "좋아요"));
    }

    @PatchMapping("/{no}/unlike")
    public ResponseEntity<Map<String, String>> unLike(@PathVariable Long no) {
        holoLoungeService.unLike(no);
        return ResponseEntity.ok(Map.of("result", "좋아요 취소"));
    }

    @PostMapping
    @Operation(hidden = true)
    public ResponseEntity<Map<String, Long>> register(@RequestBody HoloLoungeDTO holoLoungeDTO) {
        Long no = holoLoungeService.register(holoLoungeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("boardNo", no));
    }

    @PatchMapping("/{no}")
    @Operation(hidden = true)
    public ResponseEntity<Map<String, String>> modify(@PathVariable Long no, @RequestBody HoloLoungeDTO holoLoungeDTO) {
        holoLoungeDTO.setBoardNo(no);
        holoLoungeService.modify(holoLoungeDTO);
        return ResponseEntity.ok(Map.of("result", "수정되었습니다."));
    }

    @DeleteMapping("/{no}")
    @Operation(hidden = true)
    public ResponseEntity<Map<String, String>> remove(@PathVariable Long no) {
        holoLoungeService.remove(no);
        return ResponseEntity.ok(Map.of("result","삭제되었습니다."));
    }
}