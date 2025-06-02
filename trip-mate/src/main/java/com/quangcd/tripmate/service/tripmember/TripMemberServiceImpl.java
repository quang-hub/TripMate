package com.quangcd.tripmate.service.tripmember;


import com.quangcd.tripmate.dto.response.TripMemberResponse;
import com.quangcd.tripmate.entity.Trip;
import com.quangcd.tripmate.entity.TripMember;
import com.quangcd.tripmate.repository.TripMemberRepository;
import com.quangcd.tripmate.service.trip.TripService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor

public class TripMemberServiceImpl implements TripMemberService {

    private final TripMemberRepository tripMemberRepository;

    private final TripService tripService;

    @Override
    public List<TripMemberResponse> getTripMembersByUserId(Long userId) {
        List<TripMember> tripMember = tripMemberRepository.findAllTripMembersByUserIdAndIsDeleted(userId,false);

        return tripMember.stream()
                .map(tm -> {
                    Trip trip = tripService.findById(tm.getTripId());
                    int memberCount = tripMemberRepository.countByTripIdAndIsDeleted(tm.getTripId(),false);

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
                }).collect(Collectors.toList());
    }
}
