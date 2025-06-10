package com.quangcd.tripmate.dto.request.schedule;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class CreateScheduleRequest {
    @NotNull(message = "field.required")
    private Long tripId;
    @NotBlank(message = "field.required")
    private String title;
    private String description;
    private String location;
    @NotNull(message = "field.required")
    private Date startTime;
    @NotNull(message = "field.required")
    private Date endTime;

}
