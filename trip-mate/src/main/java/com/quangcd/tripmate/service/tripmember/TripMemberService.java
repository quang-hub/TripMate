package com.quangcd.tripmate.service.tripmember;

import com.quangcd.tripmate.dto.request.tripmember.UpdateTripMemberRole;
import com.quangcd.tripmate.dto.response.MemberInTripResponse;
import com.quangcd.tripmate.dto.response.TripMemberResponse;

import java.util.List;

public interface TripMemberService {
    List<TripMemberResponse> getTripMembersByUserId(Long userId);

    void setAuthoritiesForMember(UpdateTripMemberRole updateTripMemberRole, Long userId);

    List<MemberInTripResponse> getMemberInTrip(Long tripId);
}
