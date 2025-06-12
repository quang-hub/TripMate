package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.dto.request.trip.InviteMemberRequest;
import com.quangcd.tripmate.dto.request.trip.UpdateTripRequest;
import com.quangcd.tripmate.dto.request.trip.CreateTripRequest;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.dto.response.TripDetailResponse;
import com.quangcd.tripmate.dto.response.TripMemberResponse;
import com.quangcd.tripmate.service.security.AuthenticationService;
import com.quangcd.tripmate.service.trip.TripService;
import com.quangcd.tripmate.service.tripmember.TripMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/trip")
@Slf4j(topic = "TRIP-CONTROLLER")
@RequiredArgsConstructor
@Validated
public class TripController {

    private final TripService tripService;
    private final TripMemberService tripMemberService;
    private final AuthenticationService authenticationService;

    @GetMapping("/detail/{tripId}")
    @Operation(summary = "get trip detail", description = "get all trips that user is a member of")
    @ApiResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = TripMemberResponse.class))
    )
    public ResponseEntity<Object> getTripDetail(@PathVariable Long tripId,Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            TripDetailResponse response = tripMemberService.getTripMemberDetail(tripId,userId);
            log.info("get trip member successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .data(response)
                    .build());
        } catch (Exception e) {
            log.error("getTripsByUser errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createTrip(@Valid @RequestBody CreateTripRequest request, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            tripService.addNewTrip(request, userId);
            log.info("createTrip successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("createTrip errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateTrip(@Valid @RequestBody UpdateTripRequest request, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);

            tripService.updateTrip(request, userId);
            log.info("updateTrip successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("updateTrip errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/invite")
    public ResponseEntity<Object> inviteTrip(@RequestBody InviteMemberRequest inviteMemberRequest, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);

            tripService.inviteTrip(inviteMemberRequest, userId);
            log.info("inviteTrip successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("inviteTrip errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }
    @PostMapping("/remove/{tripId}")
    public ResponseEntity<Object> removeTrip(@PathVariable Long tripId, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);

            tripService.removeTrip(tripId, userId);
            log.info("removeTrip successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("removeTrip errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }
}
