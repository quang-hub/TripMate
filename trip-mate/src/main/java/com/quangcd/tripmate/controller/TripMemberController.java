package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.dto.request.user.CreateUserRequest;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.dto.response.TripMemberResponse;
import com.quangcd.tripmate.service.tripmember.TripMemberService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-members")
@Slf4j
@RequiredArgsConstructor
@Validated
public class TripMemberController {

    private final TripMemberService tripMemberService;

    @GetMapping("/{userId}")
    @Operation(summary = "get trip of user", description = "")
    public ResponseEntity<?> getTripsByUser(@PathVariable Long userId) {
        try {
            List<TripMemberResponse> listTripMembers = tripMemberService.getTripMembersByUserId(userId);
            log.info("get trip member successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale("common.success.notification"))
                    .data(listTripMembers)
                    .build());
        } catch (Exception e) {
            log.error("errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

}
