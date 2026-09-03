package com.holoday.api.holoinfo.repository;

import com.holoday.api.holoinfo.entity.Info;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoRepository extends JpaRepository<Info, Long> {
    Page<Info> findByCategoryNo(Long categoryNo, Pageable pageable);
}
