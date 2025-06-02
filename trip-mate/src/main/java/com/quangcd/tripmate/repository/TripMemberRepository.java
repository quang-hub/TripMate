package com.quangcd.tripmate.repository;

import com.quangcd.tripmate.entity.TripMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TripMemberRepository extends JpaRepository<TripMember, Long> {
    List<TripMember> findAllTripMembersByUserIdAndIsDeleted(Long userId,boolean isDeleted);

    int countByTripIdAndIsDeleted(Long tripId,boolean isDeleted);
}
