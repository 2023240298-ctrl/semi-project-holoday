package com.holoday.api.common.category.repository;

import com.holoday.api.common.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository <Category, Long> {

}
