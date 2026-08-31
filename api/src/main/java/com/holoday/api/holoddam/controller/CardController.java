package com.holoday.api.holoddam.controller;

import com.holoday.api.common.responsedto.ApiResponse;
import com.holoday.api.holoddam.entity.SortType;
import com.holoday.api.holoddam.service.CardFacadeService;
import com.holoday.api.holoddam.service.CardFacadeServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/holoday")
@RequiredArgsConstructor
public class CardController {
    private final CardFacadeService cardFacadeService;

    @PostMapping("/card")
    public ResponseEntity<ApiResponse<Void>> collectCards(@RequestParam String query, @RequestParam(defaultValue = "RECENCY")SortType sortType){
        cardFacadeService.collectAndSaveAll(query, sortType);
        return ResponseEntity.ok(
                ApiResponse.success("query: "+query+", sort value: "+sortType+", successfully collected and saved")
        );
    }
}
