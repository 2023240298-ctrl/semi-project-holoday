package com.holoday.api.holoddam.service.api;

import com.holoday.api.holoddam.entity.SortType;

public interface ApiService<T> {
    T search(String keyword, SortType sortType);
}
