package com.quangcd.tripmate.service.trip;

import com.quangcd.tripmate.common.RoleMember;
import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.dto.request.trip.CreateTripRequest;
import com.quangcd.tripmate.dto.request.trip.InviteMemberRequest;
import com.quangcd.tripmate.dto.request.trip.UpdateTripRequest;
import com.quangcd.tripmate.entity.Trip;
import com.quangcd.tripmate.entity.TripMember;
import com.quangcd.tripmate.entity.User;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import com.quangcd.tripmate.repository.TripMemberRepository;
import com.quangcd.tripmate.repository.TripRepository;
import com.quangcd.tripmate.service.user.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "TRIP-SERVICE")

public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;
    private final TripMemberRepository tripMemberRepository;
    private final UserService userService;

    @Override
    public Trip findById(Long id) {
        return tripRepository.findByIdAndIsDeleted(id, false).orElseThrow(() -> new ResourceNotFoundException(
                Translator.toLocale("common.resource.not.found", "for trip " + id)));
    }

    @Override
    @Transactional
    public void addNewTrip(CreateTripRequest request, Long userId) {
        User user = userService.findById(userId);
        if (request.getStartDate().after(request.getEndDate())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.start.date.not.greater.than.end.date"));
        }

        Trip trip = Trip.builder()
                .name(request.getName())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .logoUrl(request.getLogoUrl())
                .creatorId(user.getId())
                .build();
        trip.setCreatedBy(user.getUsername());
        Trip savedTrip = tripRepository.save(trip);
        log.info("User {} created new trip {}", userId, savedTrip.getId());
        TripMember tripMember = TripMember.builder()
                .tripId(savedTrip.getId())
                .userId(user.getId())
                .role(RoleMember.LEADER.toString())
                .build();
        tripMemberRepository.save(tripMember);

    }

    @Override
    public void updateTrip(UpdateTripRequest request, Long userId) {
        User user = userService.findById(userId);

        TripMember member = tripMemberRepository.findByTripIdAndUserIdAndIsDeleted(request.getTripId(), user.getId(), false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("tripmember.error.trip_member_not_found")));

        if (!member.getRole().equals(RoleMember.LEADER.toString())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("tripmember.error.role_not_leader"));
        }

        Trip trip = tripRepository.findById(request.getTripId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("common.resource.not.found", "for trip " + request.getTripId())));
        trip.setName(request.getName());
        trip.setDescription(request.getDescription());
        trip.setStartDate(request.getStartDate());
        trip.setEndDate(request.getEndDate());
        trip.setLogoUrl(request.getLogoUrl());
        trip.setCreatorId(user.getId());

        if (request.getStartDate().after(request.getEndDate())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.start.date.not.greater.than.end.date"));
        }

        log.info("User {} updated trip {}", userId, trip.getId());

        tripRepository.save(trip);
    }

    @Override
    public void inviteTrip(InviteMemberRequest inviteMemberRequest, Long userId) {
        User user = userService.findById(userId);

        TripMember leader = tripMemberRepository.findByTripIdAndUserIdAndIsDeleted(
                        inviteMemberRequest.getTripId(), user.getId(), false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("tripmember.error.trip_member_not_found")));

        if (!leader.getRole().equals(RoleMember.LEADER.toString())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("tripmember.error.role_not_leader"));
        }
        userService.findById(inviteMemberRequest.getUserId());
        Optional<TripMember> member = tripMemberRepository.findByTripIdAndUserIdAndIsDeleted(
                inviteMemberRequest.getTripId(), inviteMemberRequest.getUserId(), false);

        if (member.isPresent()) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("tripmember.error.user_already_in_trip"));
        }

        TripMember newMember = TripMember.builder()
                .tripId(inviteMemberRequest.getTripId())
                .userId(inviteMemberRequest.getUserId())
                .role(RoleMember.MEMBER.toString())
                .build();

        tripMemberRepository.save(newMember);

    }

    @Override
    @Transactional
    public void removeTrip(Long tripId, Long userId) {
        User user = userService.findById(userId);

        TripMember leader = tripMemberRepository.findByTripIdAndUserIdAndIsDeleted(tripId, userId, false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("tripmember.error.trip_member_not_found")));

        if (!leader.getRole().equals(RoleMember.LEADER.toString())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("tripmember.error.role_not_leader"));
        }
        Trip trip = tripRepository.findByIdAndIsDeleted(tripId, false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("common.resource.not.found", "for trip " + tripId)));
        trip.setDeleted(true);
        tripRepository.save(trip);

        List<TripMember> members = tripMemberRepository.findAllByTripIdAndIsDeleted(tripId, false);
        members.forEach(tm -> tm.setDeleted(true));
        tripMemberRepository.saveAll(members);

    }
}
