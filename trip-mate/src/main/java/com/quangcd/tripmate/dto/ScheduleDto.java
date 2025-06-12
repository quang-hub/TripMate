package com.quangcd.tripmate.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class ScheduleDto {
    private Long id;
    private String title;
    private String description;
    private String location;
    private Date startTime;
    private Date endTime;
}
