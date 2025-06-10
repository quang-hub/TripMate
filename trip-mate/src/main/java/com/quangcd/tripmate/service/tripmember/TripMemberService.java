package com.quangcd.tripmate.service.tripmember;

import com.quangcd.tripmate.dto.request.tripmember.UpdateTripMemberRole;
import com.quangcd.tripmate.dto.response.MemberInTripResponse;
import com.quangcd.tripmate.dto.response.TripMemberResponse;
import com.quangcd.tripmate.entity.TripMember;

import java.util.List;
import java.util.Optional;

public interface TripMemberService {
    List<TripMemberResponse> getTripMembersByUserId(Long userId);

    void setAuthoritiesForMember(UpdateTripMemberRole updateTripMemberRole, Long userId);

    List<MemberInTripResponse> getMemberInTrip(Long tripId);

    TripMember findByTripIdAndUserId(Long tripId, Long userId);
}
