package com.quangcd.tripmate.service.tripmember;


import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.dto.request.tripmember.UpdateTripMemberRole;
import com.quangcd.tripmate.dto.response.MemberInTripResponse;
import com.quangcd.tripmate.dto.response.TripMemberResponse;
import com.quangcd.tripmate.entity.Trip;
import com.quangcd.tripmate.entity.TripMember;
import com.quangcd.tripmate.entity.User;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import com.quangcd.tripmate.repository.TripMemberRepository;
import com.quangcd.tripmate.service.trip.TripService;
import com.quangcd.tripmate.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j(topic = "TRIP-MEMBER-SERVICE")
@RequiredArgsConstructor

public class TripMemberServiceImpl implements TripMemberService {

    private final TripMemberRepository tripMemberRepository;

    private final TripService tripService;

    private final UserService userService;

    @Override
    public List<TripMemberResponse> getTripMembersByUserId(Long userId) {

        List<TripMember> tripMember = tripMemberRepository.findAllTripMembersByUserIdAndIsDeleted(userId, false);

        return tripMember.stream()
                .map(tm -> {
                    Trip trip = tripService.findById(tm.getTripId());
                    int memberCount = tripMemberRepository.countByTripIdAndIsDeleted(tm.getTripId(), false);

                    return TripMemberResponse.builder()
                            .id(tm.getId())
                            .name(trip.getName())
                            .description(trip.getDescription())
                            .startDate(trip.getStartDate())
                            .endDate(trip.getEndDate())
                            .memberCount(memberCount)
                            .logoUrl(trip.getLogoUrl())
                            .role(tm.getRole())
                            .build();
                }).toList();
    }

    @Override
    public void setAuthoritiesForMember(UpdateTripMemberRole updateTripMemberRole, Long userId) {

        if (!Constant.ROLE_IN_TRIP.containsKey(updateTripMemberRole.getRole())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.resource.not.found", "for role " + updateTripMemberRole.getRole()));
        }
        User leader = userService.findById(userId);

        TripMember leaderMember = tripMemberRepository.findByTripIdAndUserIdAndIsDeleted(
                updateTripMemberRole.getTripId(), leader.getId(), false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("tripmember.error.trip.not_found")));
        if (!leaderMember.getRole().equals("LEADER")) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("tripmember.error.role_not_leader", leader.getUsername()));
        }

        TripMember tagetMember = tripMemberRepository.findByTripIdAndUserIdAndIsDeleted(
                updateTripMemberRole.getTripId(), updateTripMemberRole.getMemberId(), false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("tripmember.error.trip_member_not_found")));

        tagetMember.setRole(updateTripMemberRole.getRole());
        tripMemberRepository.save(tagetMember);
    }

    @Override
    public List<MemberInTripResponse> getMemberInTrip(Long tripId) {
        tripService.findById(tripId);
        List<TripMember> tripMembers = tripMemberRepository.findAllByTripIdAndIsDeleted(tripId, false);
        return tripMembers.stream()
                .map(tm -> {
                    User user = userService.findById(tm.getUserId());
                    return MemberInTripResponse.builder()
                            .id(tm.getId())
                            .nickname(user.getNickname())
                            .role(tm.getRole())
                            .avatarUrl(user.getAvatarUrl())
                            .build();
                }).toList();
    }

    @Override
    public TripMember findByTripIdAndUserId(Long tripId, Long userId) {
        TripMember tagetMember = tripMemberRepository.findByTripIdAndUserIdAndIsDeleted(
                        tripId, userId,false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("tripmember.error.trip_member_not_found")));
        return tagetMember;
    }
}
