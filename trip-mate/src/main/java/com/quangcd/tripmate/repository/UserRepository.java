package com.quangcd.tripmate.repository;

import com.quangcd.tripmate.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public abstract class UserRepository implements JpaRepository<User, Long> {

}
