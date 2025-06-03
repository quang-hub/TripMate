package com.quangcd.tripmate.repository;

import com.quangcd.tripmate.entity.TripMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripMemberRepository extends JpaRepository<TripMember, Long> {
    List<TripMember> findAllTripMembersByUserIdAndIsDeleted(Long userId,boolean isDeleted);

    int countByTripIdAndIsDeleted(Long tripId,boolean isDeleted);

    Optional<TripMember> findByTripIdAndUserIdAndIsDeleted(Long tripId, Long userId, boolean isDeleted);

    List<TripMember> findAllByTripIdAndIsDeleted(Long tripId, boolean isDeleted);
}
