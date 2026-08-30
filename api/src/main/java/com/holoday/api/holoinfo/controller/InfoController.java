package com.holoday.api.holoinfo.controller;

import com.holoday.api.common.pagination.PageRequestDTO;
import com.holoday.api.common.pagination.PageResponseDTO;
import com.holoday.api.holoinfo.dto.InfoDTO;
import com.holoday.api.holoinfo.service.InfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/holoday/info")
@RequiredArgsConstructor
public class InfoController {

    private final InfoService infoService;

    @GetMapping(value = "/{info_no}",produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Info 조회",
            description = "번호에 해당하는 Info를 조회한다."
    )

    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공"),
            @ApiResponse(responseCode = "404", description = "Info 없음")
    })
    public ResponseEntity<InfoDTO> get(@PathVariable(name = "info_no") Long infoNo){
        InfoDTO infoDTO = infoService.get(infoNo);
        return ResponseEntity.ok(infoDTO);
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(
            summary = "Info 목록 조회",
            description = "Info 목록을 페이지 단위로 조회한다."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조회 성공")
    })
    public ResponseEntity<PageResponseDTO<InfoDTO>> list(PageRequestDTO pageRequestDTO) {
        PageResponseDTO<InfoDTO> responseDTO = infoService.list(pageRequestDTO);
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping
    @Operation(hidden = true)
    public ResponseEntity<Map<String,Long>> register(@RequestBody InfoDTO infoDTO){
        Long infoNo = infoService.register(infoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("infoNo",infoNo));
    }

    @PatchMapping("/{info_no}")
    @Operation(hidden = true)
    public ResponseEntity<Map<String,String>> modify(@PathVariable(name = "info_no") Long infoNo, @RequestBody InfoDTO infoDTO){
        infoDTO.setInfoNo(infoNo);
        infoService.modify(infoDTO);
        return ResponseEntity.ok(Map.of("result", "success"));
    }

    @DeleteMapping("/{info_no}")
    @Operation(hidden = true)
    public ResponseEntity<Map<String, String>> remove(@PathVariable(name = "info_no") Long infoNo){
        infoService.remove(infoNo);
        return ResponseEntity.ok(Map.of("result","success"));
    }


}
