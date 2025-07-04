package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.dto.request.message.MessageRequest;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.dto.response.MessageResponse;
import com.quangcd.tripmate.service.message.MessageService;
import com.quangcd.tripmate.service.security.AuthenticationService;
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

@RestController
@RequestMapping("/api/message")
@Slf4j(topic = "MESSAGE-CONTROLLER")
@RequiredArgsConstructor
@Validated

public class MessageController {

    private final MessageService messageService;
    private final AuthenticationService authenticationService;

    @PostMapping()
    @Operation(summary = "send message for trip", description = "sendMessage for trip")
    public ResponseEntity<Object> sendMessage(@RequestBody MessageRequest request, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);

            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .data(messageService.sendMessage(request, userId))
                    .build());
        } catch (Exception e) {
            log.error("sendMessage errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/trip/{tripId}")
    @Operation(summary = "get member in trip", description = "get all members in a trip by tripId")
    @ApiResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageResponse.class))
    )
    public ResponseEntity<Object> getMessagesByTrip(@PathVariable Long tripId) {
        try {
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .data(messageService.getMessagesByTrip(tripId))
                    .build());
        } catch (Exception e) {
            log.error("getMessagesByTrip errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

}
