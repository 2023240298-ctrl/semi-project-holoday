package com.holoday.api.common.category.service;

import com.holoday.api.common.category.dto.CategoryDTO;
import com.holoday.api.common.category.mapper.CategoryMapper;
import com.holoday.api.common.category.repository.CategoryRepository;

import java.util.List;

public interface CategoryService {
    List<CategoryDTO> getList();
}
