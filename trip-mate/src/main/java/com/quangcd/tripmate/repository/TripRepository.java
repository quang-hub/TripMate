package com.quangcd.tripmate.repository;

import com.quangcd.tripmate.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
    Optional<Trip> findByIdAndIsDeleted(Long id, boolean isDeleted);
}
