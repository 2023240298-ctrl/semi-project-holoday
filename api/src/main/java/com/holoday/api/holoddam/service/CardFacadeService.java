package com.holoday.api.holoddam.service;

import com.holoday.api.holoddam.entity.SortType;

public interface CardFacadeService {
    void collectAndSaveAll(String query, SortType sortType);
    void collectAndSaveNews(String query, SortType sortType);
    void collectAndSaveBlog(String query, SortType sortType);
    void collectAndSaveVideo(String query, SortType sortType);
}
