package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.dto.request.trip.InviteMemberRequest;
import com.quangcd.tripmate.dto.request.trip.UpdateTripRequest;
import com.quangcd.tripmate.dto.request.trip.CreateTripRequest;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.service.trip.TripService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/trip")
@Slf4j
@RequiredArgsConstructor
@Validated
public class TripController {

    private final TripService tripService;

    @PostMapping("/create")
    public ResponseEntity<?> createTrip(@Valid @RequestBody CreateTripRequest request, HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            tripService.addNewTrip(request, username);
            log.info("add trip successful");
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

    @PostMapping("/update")
    public ResponseEntity<?> updateTrip(@Valid @RequestBody UpdateTripRequest request, HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            tripService.updateTrip(request, username);
            log.info("add trip successful");
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

    @PostMapping("/invite")
    public ResponseEntity<?> inviteTrip(@RequestBody InviteMemberRequest inviteMemberRequest, HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            tripService.inviteTrip(inviteMemberRequest, username);
            log.info("add trip successful");
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
}
