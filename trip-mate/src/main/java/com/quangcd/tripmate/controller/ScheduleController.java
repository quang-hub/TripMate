package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.dto.request.schedule.CreateScheduleRequest;
import com.quangcd.tripmate.dto.request.schedule.UpdateScheduleRequest;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.service.schedule.ScheduleService;
import com.quangcd.tripmate.service.security.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/schedule")
@Slf4j(topic = "SCHEDULE-CONTROLLER")
@RequiredArgsConstructor
@Validated
public class ScheduleController {

    private final AuthenticationService authenticationService;
    private final ScheduleService scheduleService;

    @PostMapping("/create")
    @Operation(summary = "createSchedule for trip", description = "create schedule for trip")
    public ResponseEntity<Object> createSchedule(@RequestBody CreateScheduleRequest request, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            scheduleService.createSchedule(request, userId);
            log.info("createSchedule successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("createSchedule errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/update")
    @Operation(summary = "updateSchedule for trip", description = "create schedule for trip")
    public ResponseEntity<Object> updateSchedule(@RequestBody UpdateScheduleRequest request, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            scheduleService.updateSchedule(request, userId);
            log.info("updateSchedule successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("updateSchedule errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/delete/{id}")
    @Operation(summary = "deleteSchedule for trip", description = "create schedule for trip")
    public ResponseEntity<Object> deleteSchedule(@PathVariable Long id, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            scheduleService.deleteSchedule(id, userId);
            log.info("deleteSchedule successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("deleteSchedule errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }
}
