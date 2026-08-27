package com.holoday.api.common.category.service;

import com.holoday.api.common.category.dto.CategoryDTO;
import com.holoday.api.common.category.entity.Category;
import com.holoday.api.common.category.mapper.CategoryMapper;
import com.holoday.api.common.category.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Override
    public List<CategoryDTO> getList() {
        List<Category> categories = categoryRepository.findAll();

        for (Category category : categories) {
            System.out.println(category.getCategoryNo());
            System.out.println(category.getCategoryName());
        }


        List<CategoryDTO> dtoList = categories.stream()
                .map(categoryMapper::toDTO)
                .toList();


        return dtoList;
    }

}
