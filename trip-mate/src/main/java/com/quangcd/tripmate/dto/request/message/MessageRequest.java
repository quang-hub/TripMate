package com.quangcd.tripmate.dto.request.message;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MessageRequest {
    @NotNull(message = "field.required")
    private Long tripId;
    @NotBlank(message = "field.required")
    private String token;
    private String content;
}

