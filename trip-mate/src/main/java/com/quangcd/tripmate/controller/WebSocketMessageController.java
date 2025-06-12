package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.common.TokenType;
import com.quangcd.tripmate.dto.request.message.MessageRequest;
import com.quangcd.tripmate.dto.response.MessageResponse;
import com.quangcd.tripmate.service.message.MessageService;
import com.quangcd.tripmate.service.security.JWTService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Slf4j(topic = "WEBSOCKET-MESSAGE-CONTROLLER")
@Controller
@RequiredArgsConstructor

public class WebSocketMessageController {

    private final MessageService messageService;
    private final JWTService jwtService;

    @MessageMapping("/send-message")
    @SendTo("/topic/messages")
    public MessageResponse sendMessage(@Valid @Payload MessageRequest message) {
        log.debug("Raw message received: {}", message);
        if (message.getContent() == null || message.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Empty message");
        }
        Long userId = jwtService.extractUserId(message.getToken(), TokenType.ACCESS_TOKEN);

        log.info("Processing message: {}", message.getContent());
        return messageService.sendMessage(message, userId);
    }

}

