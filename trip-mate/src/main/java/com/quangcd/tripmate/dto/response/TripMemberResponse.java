package com.quangcd.tripmate.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Data
@Builder
public class TripMemberResponse {

    private Long id;
    private String name;
    private String description;
    private Date startDate;
    private Date endDate;

    private int memberCount;
    private String logoUrl;
    private String role;
}
