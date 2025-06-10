package com.quangcd.tripmate.dto.request.message;

import lombok.Data;

@Data
public class MessageRequest {
    private Long tripId;
    private Long senderId;
    private String content;
}

