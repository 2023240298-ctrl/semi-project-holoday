package com.holoday.api.hololounge.service;

import com.holoday.api.hololounge.dto.HoloLoungeDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class HoloLoungeServiceImpl implements HoloLoungeService{

    @Override
    public Long register(HoloLoungeDTO holoLoungeDTO) {
        return null;
    }
}
