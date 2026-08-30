package com.holoday.api.hololounge.mapper;

import com.holoday.api.hololounge.dto.HoloLoungeDTO;
import com.holoday.api.hololounge.entity.HoloLounge;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HoloLoungeMapper {
    HoloLoungeDTO toDTO(HoloLounge holoLounge);
}
