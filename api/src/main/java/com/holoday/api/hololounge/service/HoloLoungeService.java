package com.holoday.api.hololounge.service;

import com.holoday.api.common.pagination.PageRequestDTO;
import com.holoday.api.common.pagination.PageResponseDTO;
import com.holoday.api.hololounge.dto.HoloLoungeDTO;

public interface HoloLoungeService {
    Long register(HoloLoungeDTO holoLoungeDTO);
    HoloLoungeDTO get(Long no);
    void modify(HoloLoungeDTO holoLoungeDTO);
    void remove(Long no);
    PageResponseDTO<HoloLoungeDTO> list(PageRequestDTO pageRequestDTO);
    void like(Long no);
    void unLike(Long no);
}
