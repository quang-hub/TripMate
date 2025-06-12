package com.quangcd.tripmate.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class TripDetailResponse {
    private Long tripId;
    private String name;
    private String logoUrl;
    private String description;
    private Date startDate;
    private Date endDate;
    private int memberCount;
    private String status;

}
