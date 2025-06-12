package com.quangcd.tripmate.repository;

import com.quangcd.tripmate.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {

    Optional<Schedule> findByIdAndIsDeleted(Long id, boolean isDeleted);

    Optional<List<Schedule>> findAllByTripIdAndIsDeleted(Long tripId, boolean isDeleted);


}
