package com.quangcd.tripmate.service.tripmember;

import com.quangcd.tripmate.dto.response.TripMemberResponse;

import java.util.List;

public interface TripMemberService {
    List<TripMemberResponse> getTripMembersByUserId(Long userId);

}
