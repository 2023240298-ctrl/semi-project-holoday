package com.holoday.api.common.pagination;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PageRequestDTO {
    private int page = 1;
    private int size = 10;

    private String searchType = "";
    private String keyword;

    public PageRequestDTO(int page, int size) {
        this.page = page;
        this.size = size;
    }

    public Pageable getPageable(String sortField) {
        return PageRequest.of(page - 1, size, Sort.Direction.DESC, sortField);
    }
}
