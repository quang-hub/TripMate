package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.dto.request.tripmember.UpdateTripMemberRole;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.dto.response.MemberInTripResponse;
import com.quangcd.tripmate.dto.response.TripMemberResponse;
import com.quangcd.tripmate.dto.response.UserSearchResponse;
import com.quangcd.tripmate.service.tripmember.TripMemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpSession;
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
    @ApiResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = TripMemberResponse.class))
    )
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

    @PostMapping("/set-role")
    @Operation(summary = "set authorities for member (LEADER,MEMBER,GUEST)", description = "")
    public ResponseEntity<?> updateMembership(@RequestBody UpdateTripMemberRole updateTripMemberRole, HttpSession session) {
        try {
            String username = session.getAttribute("username").toString();
            tripMemberService.setAuthoritiesForMember(updateTripMemberRole, username);
            log.info("set authorities for member successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale("common.success.notification"))
                    .build());
        } catch (Exception e) {
            log.error("errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/member/{tripId}")
    @Operation(summary = "get member in trip", description = "")
    @ApiResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MemberInTripResponse.class))
    )
    public ResponseEntity<?> getMemberInTrip(@PathVariable Long tripId) {
        try {
            List<MemberInTripResponse> listMember = tripMemberService.getMemberInTrip(tripId);
            log.info("get member in trip successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale("common.success.notification"))
                    .data(listMember)
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
