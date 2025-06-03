package com.quangcd.tripmate.dto.request.trip;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InviteMemberRequest {
    @NotNull(message = "field.required")
    private Long tripId;
    @NotNull(message = "field.required")
    private Long userId;

}
