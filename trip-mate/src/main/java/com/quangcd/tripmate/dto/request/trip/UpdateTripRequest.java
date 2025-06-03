package com.quangcd.tripmate.dto.request.trip;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UpdateTripRequest {
    @NotNull(message = "field.required")
    private Long tripId;
    private String name;
    private String description;
    @NotNull(message = "field.required")
    private Date startDate;
    @NotNull(message = "field.required")
    private Date endDate;
    private String logoUrl;
}
