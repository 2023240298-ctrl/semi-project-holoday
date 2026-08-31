package com.holoday.api.common.responsedto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;

    public static <T> ApiResponse<Void> success(String message){
        return new ApiResponse<>(true, message, null);
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<Void> fail(String message){
        return new ApiResponse<>(false, message, null);
    }
}
