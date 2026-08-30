package com.holoday.api.holoinfo.service;

import com.holoday.api.common.pagination.PageRequestDTO;
import com.holoday.api.common.pagination.PageResponseDTO;
import com.holoday.api.holoinfo.dto.InfoDTO;

public interface InfoService {
    Long register(InfoDTO infoDTO);
    InfoDTO get (Long infoNo);
    void modify (InfoDTO infoDTO);
    void remove(Long infoNo);
    PageResponseDTO<InfoDTO> list(PageRequestDTO pageRequestDTO);
}
