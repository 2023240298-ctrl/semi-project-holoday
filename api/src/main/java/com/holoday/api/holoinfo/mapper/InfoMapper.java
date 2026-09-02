package com.holoday.api.holoinfo.mapper;

import com.holoday.api.holoinfo.dto.InfoDTO;
import com.holoday.api.holoinfo.entity.Info;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InfoMapper {
    InfoDTO toDTO(Info info);
}
