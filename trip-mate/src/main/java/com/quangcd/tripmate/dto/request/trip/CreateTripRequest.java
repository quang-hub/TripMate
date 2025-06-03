package com.quangcd.tripmate.dto.request.trip;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CreateTripRequest {
    @NotBlank(message = "field.required")
    private String name;
    @NotBlank(message = "field.required")
    private String description;
    @NotNull(message = "field.required")
    private Date startDate;
    @NotNull(message = "field.required")
    private Date endDate;
    private String logoUrl;
}
