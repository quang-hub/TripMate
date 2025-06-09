package com.quangcd.tripmate.service.auth;

import com.quangcd.tripmate.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public record UserServiceDetail(UserRepository userRepository) {

    public UserDetailsService userServiceDetail() {

        return userRepository::findByUsernameEqualsAndIsDeletedIsFalse;
    }
}
