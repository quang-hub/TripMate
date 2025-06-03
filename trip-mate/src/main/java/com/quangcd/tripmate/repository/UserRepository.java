package com.quangcd.tripmate.repository;

import com.quangcd.tripmate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsernameAndIsDeleted(String username, boolean isDeleted);

    boolean existsByEmailAndIsDeleted(String email, boolean isDeleted);

    Optional<User> findByUsernameAndIsDeleted(String username, boolean isDeleted);

    Optional<User> findByIdAndIsDeleted(Long id, boolean isDeleted);

    List<User> findAllByIsDeleted(boolean isDeleted);
}
