package com.quangcd.tripmate.repository;

import com.quangcd.tripmate.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    List<Message> findAllByTripIdAndIsDeletedFalseOrderByCreatedAtAsc(Long tripId);

}


