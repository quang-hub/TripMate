package com.quangcd.tripmate.service.user;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.dto.UserDto;
import com.quangcd.tripmate.dto.request.user.CreateUserRequest;
import com.quangcd.tripmate.dto.request.user.UpdateUserProfile;
import com.quangcd.tripmate.dto.response.UserSearchResponse;
import com.quangcd.tripmate.entity.User;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import com.quangcd.tripmate.repository.UserRepository;
import com.quangcd.tripmate.service.EmailService;
import com.quangcd.tripmate.utils.CommonUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    @Transactional
    public void saveUser(CreateUserRequest user) {

        if (!CommonUtils.isvalidPassword(user.getPassword())) {
            log.error("Invalid password format: {}", user.getPassword());
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.error.invalid_password_format"));
        }

        if (!CommonUtils.isvalidEmail(user.getEmail())) {
            log.error("Invalid email format: {}", user.getEmail());
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.error.invalid_email_format"));
        }

        if (userRepository.existsByUsernameAndIsDeleted(user.getUsername(), false)) {
            log.error("Username already exists: {}", user.getUsername());
            throw new ResourceNotFoundException(
                    Translator.toLocale("user.error.username_already_exists"));
        }

        if (userRepository.existsByEmailAndIsDeleted(user.getEmail(), false)) {
            log.error("Email already exists: {}", user.getEmail());
            throw new ResourceNotFoundException(
                    Translator.toLocale("user.error.email_already_exists"));
        }

        String passwordHash = passwordEncoder.encode(user.getPassword());

        User registerUser = userRepository.save(User.builder()
                .username(user.getUsername())
                .passwordHash(passwordHash)
                .email(user.getEmail())
                .nickname(user.getNickname())
                .avatarUrl(user.getAvatarUrl())
                .build());

        emailService.sendRegisterAccount(registerUser.getEmail(), registerUser.getUsername());
    }

    @Override
    public void login(UserDto user) {
        User user1 = userRepository.findByUsernameAndIsDeleted(user.getUsername(), false)
                .orElseThrow(() -> {
                    log.error("User not found: {}", user.getUsername());
                    return new ResourceNotFoundException(
                            Translator.toLocale("user.error.user_or_password_incorrect"));
                });

        if (!passwordEncoder.matches(user.getPassword(), user1.getPasswordHash())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("user.error.user_or_password_incorrect"));
        }

    }

    @Override
    public void updateUserProfile(UpdateUserProfile userProfile) {
        User user = userRepository.findByUsernameAndIsDeleted(userProfile.getUsername(), false)
                .orElseThrow(() -> {
                    log.error("User not found: {}", userProfile.getUsername());
                    return new ResourceNotFoundException(
                            Translator.toLocale("user.error.user_or_password_incorrect"));
                });
        if (userProfile.getEmail() != null && !userProfile.getEmail().isEmpty()) {
            if (!CommonUtils.isvalidEmail(userProfile.getEmail())) {
                log.error("Invalid email format: {}", userProfile.getEmail());
                throw new ResourceNotFoundException(
                        Translator.toLocale("common.error.invalid_email_format"));
            }
            if (userRepository.existsByEmailAndIsDeleted(userProfile.getEmail(), false)
                    && !user.getEmail().equals(userProfile.getEmail())) {
                log.error("Email already exists: {}", userProfile.getEmail());
                throw new ResourceNotFoundException(
                        Translator.toLocale("user.error.email_already_exists"));
            }
            user.setEmail(userProfile.getEmail());
        }
        if (!CommonUtils.isvalidPassword(userProfile.getNewPassword())) {
            log.error("Invalid password format: {}", userProfile.getNewPassword());
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.error.invalid_password_format"));
        }

        if (!userProfile.getOldPassword().equals(user.getPasswordHash())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("user.error.password_incorrect"));
        }

        user.setPasswordHash(passwordEncoder.encode(userProfile.getNewPassword()));
        user.setNickname(userProfile.getNickname());
        user.setAvatarUrl(userProfile.getAvatarUrl());
        userRepository.save(user);
    }

    @Override
    public List<UserSearchResponse> findExceptUsername(String nickname, String username) {
        List<User> userList = userRepository.findAllByIsDeleted(false);

        return userList.stream()
                .filter(user -> !user.getUsername().equals(username))
                .filter(user -> nickname == null || user.getNickname().toLowerCase().contains(nickname.toLowerCase()))
                .map(user -> UserSearchResponse.builder()
                        .id(user.getId())
                        .nickname(user.getNickname())
                        .avatarUrl(user.getAvatarUrl())
                        .build())
                .collect(Collectors.toList());
    }
}
