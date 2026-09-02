package com.holoday.api.holoddam.controller;

import com.holoday.api.common.responsedto.ApiResponse;
import com.holoday.api.holoddam.entity.Card;
import com.holoday.api.holoddam.entity.SortType;
import com.holoday.api.holoddam.service.CardFacadeService;
import com.holoday.api.holoddam.service.CardFacadeServiceImpl;
import com.holoday.api.holoddam.service.CardService;
import com.holoday.api.holoddam.service.HistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/holoday")
@RequiredArgsConstructor
public class CardController {
    private final CardFacadeService cardFacadeService;
    private final CardService cardService;
    private final HistoryService historyService;

    @PostMapping("/card")
    public ResponseEntity<ApiResponse<Void>> collectCards(@RequestParam String query, @RequestParam(defaultValue = "RECENCY")SortType sortType){
        cardFacadeService.collectAndSaveAll(query, sortType);
        return ResponseEntity.ok(
                ApiResponse.success("query: "+query+", sort value: "+sortType+", successfully collected and saved")
        );
    }

    @DeleteMapping("/{cardNo}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long cardNo){
        cardService.delete(cardNo);
        return ResponseEntity.ok(
                ApiResponse.success("delete "+cardNo+"th card successfully")
        );
    }

    @GetMapping("/card")
    public ResponseEntity<ApiResponse<Card>> viewCard(Authentication authentication){
        String userId = authentication.getName();
        Card card = historyService.viewCard(userId);
        return ResponseEntity.ok(
                ApiResponse.success("random card fetched successfully",card)
        );
    }

    @GetMapping("/card/history")
    public ResponseEntity<ApiResponse<List<Card>>> viewCards(Authentication authentication){
        String userId = authentication.getName();
        List<Card> cards = historyService.viewCards(userId);
        return ResponseEntity.ok(
                ApiResponse.success("viewed card list fetched successfully", cards)
        );
    }
}
