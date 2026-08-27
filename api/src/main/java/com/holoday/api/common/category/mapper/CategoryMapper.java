package com.holoday.api.common.category.mapper;

import com.holoday.api.common.category.dto.CategoryDTO;
import com.holoday.api.common.category.entity.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryDTO toDTO(Category category);
}
