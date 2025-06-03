package com.quangcd.tripmate.dto.request.tripmember;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTripMemberRole {
    @NotBlank(message = "field.required")
    private String role;
    @NotBlank(message = "field.required")
    private Long tripId;
    @NotBlank(message = "field.required")
    private Long memberId;

}
