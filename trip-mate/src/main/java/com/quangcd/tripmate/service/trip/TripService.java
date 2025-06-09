package com.quangcd.tripmate.service.trip;

import com.quangcd.tripmate.dto.request.trip.CreateTripRequest;
import com.quangcd.tripmate.dto.request.trip.InviteMemberRequest;
import com.quangcd.tripmate.dto.request.trip.UpdateTripRequest;
import com.quangcd.tripmate.entity.Trip;

public interface TripService {
    Trip findById(Long id);

    void addNewTrip(CreateTripRequest request, Long userId);

    void updateTrip(UpdateTripRequest request, Long userId);

    void inviteTrip(InviteMemberRequest inviteMemberRequest, Long userId);
}
