package com.quangcd.tripmate.repository;

import com.quangcd.tripmate.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findAllByReferIdAndTypeAndIsDeletedFalse(Long referId, String type);

}
