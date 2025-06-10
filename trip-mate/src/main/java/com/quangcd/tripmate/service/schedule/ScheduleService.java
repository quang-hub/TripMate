package com.quangcd.tripmate.service.schedule;

import com.quangcd.tripmate.dto.request.schedule.CreateScheduleRequest;
import com.quangcd.tripmate.dto.request.schedule.UpdateScheduleRequest;

public interface ScheduleService {

    void createSchedule(CreateScheduleRequest request, Long userId);

    void updateSchedule(UpdateScheduleRequest request, Long userId);

    void deleteSchedule(Long scheduleId, Long userId);
}
