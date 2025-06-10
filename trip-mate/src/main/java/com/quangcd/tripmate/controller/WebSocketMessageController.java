package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.dto.request.message.MessageRequest;
import com.quangcd.tripmate.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor

public class WebSocketMessageController {

    private final MessageService messageService;

    @MessageMapping("/send-message")
    @SendTo("/topic/messages")
    public String sendMessage(MessageRequest message) {
        // xử lý gửi tin nhắn
        return message.getContent();
    }
}

