package com.quangcd.tripmate.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter

@Builder
public class MessageResponse {
    private Long id;
    private Long tripId;
    private Long senderId;
    private String senderAvatarUrl;
    private String nickname;
    private String content;
    private LocalDateTime createdAt;

}
