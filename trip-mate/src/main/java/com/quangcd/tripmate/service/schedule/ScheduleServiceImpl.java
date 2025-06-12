package com.quangcd.tripmate.service.schedule;

import com.quangcd.tripmate.common.RoleMember;
import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.dto.ScheduleDto;
import com.quangcd.tripmate.dto.request.schedule.CreateScheduleRequest;
import com.quangcd.tripmate.dto.request.schedule.UpdateScheduleRequest;
import com.quangcd.tripmate.entity.Schedule;
import com.quangcd.tripmate.entity.TripMember;
import com.quangcd.tripmate.entity.User;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import com.quangcd.tripmate.repository.ScheduleRepository;
import com.quangcd.tripmate.service.trip.TripService;
import com.quangcd.tripmate.service.tripmember.TripMemberService;
import com.quangcd.tripmate.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j(topic = "SCHEDULE-SERVICE")
@RequiredArgsConstructor
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final TripService tripService;
    private final TripMemberService tripMemberService;
    private final UserService userService;

    @Override
    public void createSchedule(CreateScheduleRequest request, Long userId) {
        User user = userService.findById(userId);
        tripService.findById(request.getTripId());
        TripMember tripMember = tripMemberService.findByTripIdAndUserId(request.getTripId(), userId);
        if (tripMember.getRole().equals(RoleMember.GUEST.toString())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("schedule.error.do_not_has_permission"));
        }
        Schedule schedule = Schedule.builder()
                .tripId(request.getTripId())
                .title(request.getTitle())
                .description(request.getDescription())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .location(request.getLocation())
                .build();
        schedule.setCreatedBy(user.getUsername());
        scheduleRepository.save(schedule);
    }

    @Override
    public void updateSchedule(UpdateScheduleRequest request, Long userId) {
        User user = userService.findById(userId);
        tripService.findById(request.getTripId());
        TripMember tripMember = tripMemberService.findByTripIdAndUserId(request.getTripId(), userId);
        if (tripMember.getRole().equals(RoleMember.GUEST.toString())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("schedule.error.do_not_has_permission"));
        }
        Schedule schedule = scheduleRepository.findByIdAndIsDeleted(request.getScheduleId(), false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("schedule.error.schedule_not_found")));

        schedule.setTripId(request.getTripId());
        schedule.setTitle(request.getTitle());
        schedule.setDescription(request.getDescription());
        schedule.setStartTime(request.getStartTime());
        schedule.setEndTime(request.getEndTime());
        schedule.setLocation(request.getLocation());
        schedule.setUpdatedBy(user.getUsername());

        scheduleRepository.save(schedule);
    }

    @Override
    public void deleteSchedule(Long scheduleId, Long userId) {
        Schedule schedule = scheduleRepository.findByIdAndIsDeleted(scheduleId, false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("schedule.error.schedule_not_found")));
        schedule.setDeleted(true);
        scheduleRepository.save(schedule);

    }

    @Override
    public List<ScheduleDto> findScheduleByTripId(Long tripId, Long userId) {
        tripMemberService.findByTripIdAndUserId(tripId, userId);

        List<Schedule> schedules = scheduleRepository.findAllByTripIdAndIsDeleted(tripId, false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("schedule.error.trip_not_have_schedule")));

        return schedules.stream().map(
                s -> ScheduleDto.builder()
                        .id(s.getId())
                        .title(s.getTitle())
                        .description(s.getDescription())
                        .startTime(s.getStartTime())
                        .endTime(s.getEndTime())
                        .location(s.getLocation())
                        .build()).toList();

    }
}
