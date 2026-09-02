package com.holoday.api.holoinfo.controller;

import com.holoday.api.common.file.FileUtil;
import com.holoday.api.common.file.dto.FileDTO;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/holoday/info")
@RequiredArgsConstructor
public class InfoController {

    private final InfoService infoService;
    private final FileUtil fileUtil;

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
    public ResponseEntity<PageResponseDTO<InfoDTO>> list(
            PageRequestDTO pageRequestDTO,
            @RequestParam(required = false) Long categoryNo
    ) {
        PageResponseDTO<InfoDTO> responseDTO =
                infoService.list(pageRequestDTO, categoryNo);

        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(hidden = true)
    public ResponseEntity<Map<String,Long>> register(
            @RequestPart("info") InfoDTO infoDTO,
            @RequestPart(value = "file", required = false) MultipartFile file
    ){
        String userId = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        infoDTO.setUserId(userId);

        FileDTO fileDTO = fileUtil.saveFile(file);

        if (fileDTO != null) {
            infoDTO.setInfoImg(fileDTO.getSavedName());
            infoDTO.setInfoSimg(fileDTO.getThumbnailName());
        }

        Long infoNo = infoService.register(infoDTO);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("infoNo", infoNo));
    }

    @PatchMapping(value = "/{info_no}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(hidden = true)
    public ResponseEntity<Map<String,String>> modify(
            @PathVariable(name = "info_no") Long infoNo,
            @RequestPart("info") InfoDTO infoDTO,
            @RequestPart(value = "file", required = false) MultipartFile file
    ){
        infoDTO.setInfoNo(infoNo);

        FileDTO fileDTO = fileUtil.saveFile(file);

        if (fileDTO != null) {
            infoDTO.setInfoImg(fileDTO.getSavedName());
            infoDTO.setInfoSimg(fileDTO.getThumbnailName());
        }

        infoService.modify(infoDTO);

        return ResponseEntity.ok(
                Map.of("result", "success")
        );
    }

    @DeleteMapping("/{info_no}")
    @Operation(hidden = true)
    public ResponseEntity<Map<String, String>> remove(@PathVariable(name = "info_no") Long infoNo){

        InfoDTO infoDTO = infoService.get(infoNo);

        fileUtil.deleteFile(infoDTO.getInfoImg());
        fileUtil.deleteFile(infoDTO.getInfoSimg());

        infoService.remove(infoNo);

        return ResponseEntity.ok(Map.of("result","success"));
    }


}
