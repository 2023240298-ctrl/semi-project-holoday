package com.holoday.api.holoinfo.repository;

import com.holoday.api.holoinfo.entity.Info;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InfoRepository extends JpaRepository<Info, Long> {
}
