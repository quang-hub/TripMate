package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.dto.request.tripmember.UpdateTripMemberRole;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.dto.response.MemberInTripResponse;
import com.quangcd.tripmate.dto.response.TripMemberResponse;
import com.quangcd.tripmate.service.security.AuthenticationService;
import com.quangcd.tripmate.service.tripmember.TripMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trip-members")
@Slf4j(topic = "TRIP-MEMBER-CONTROLLER")
@RequiredArgsConstructor
@Validated
public class TripMemberController {

    private final TripMemberService tripMemberService;
    private final AuthenticationService authenticationService;

    @GetMapping("/list")
    @Operation(summary = "get trip of user", description = "get all trips that user is a member of")
    @ApiResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = TripMemberResponse.class))
    )
    public ResponseEntity<Object> getTripsByUser(Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            List<TripMemberResponse> listTripMembers = tripMemberService.getTripMembersByUserId(userId);
            log.info("get trip member successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .data(listTripMembers)
                    .build());
        } catch (Exception e) {
            log.error("getTripsByUser errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/set-role")
    @Operation(summary = "set authorities for member (LEADER,MEMBER,GUEST)", description = "set role for member in trip")
    public ResponseEntity<Object> updateMembership(@RequestBody UpdateTripMemberRole updateTripMemberRole, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            tripMemberService.setAuthoritiesForMember(updateTripMemberRole, userId);
            log.info("set authorities for member successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("updateMembership errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/member/{tripId}")
    @Operation(summary = "get member in trip", description = "get all members in a trip by tripId")
    @ApiResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MemberInTripResponse.class))
    )
    public ResponseEntity<Object> getMemberInTrip(@PathVariable Long tripId) {
        try {
            List<MemberInTripResponse> listMember = tripMemberService.getMemberInTrip(tripId);
            log.info("get member in trip successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .data(listMember)
                    .build());
        } catch (Exception e) {
            log.error("getMemberInTrip errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

}
