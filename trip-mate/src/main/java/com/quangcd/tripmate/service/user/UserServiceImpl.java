package com.quangcd.tripmate.service.user;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.dto.UserDto;
import com.quangcd.tripmate.dto.request.user.CreateUserRequest;
import com.quangcd.tripmate.dto.request.user.UpdateUserProfile;
import com.quangcd.tripmate.dto.response.LoginResponse;
import com.quangcd.tripmate.dto.response.UserSearchResponse;
import com.quangcd.tripmate.entity.User;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import com.quangcd.tripmate.repository.UserRepository;
import com.quangcd.tripmate.service.EmailService;
import com.quangcd.tripmate.utils.CommonUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Value("${application.domain-image}")
    private String BASE_DOMAIN_IMAGE;
    @Value("${application.domain-upload}")
    private String BASE_UPLOAD_PATH;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsernameAndIsDeleted(username, false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("common.resource.not.found", "for user " + username)));
    }

    @Override
    public User findById(Long id) {
        return userRepository.findByIdAndIsDeleted(id, false)
                .orElseThrow(() -> new ResourceNotFoundException(
                        Translator.toLocale("common.resource.not.found", "for user " + id)));
    }

    @Override
    @Transactional
    public void saveUser(CreateUserRequest user) throws IOException {

        if (CommonUtils.validPassword(user.getPassword())) {
            log.error("Invalid password format: {}", user.getPassword());
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.error.invalid_password_format"));
        }

        if (CommonUtils.validEmail(user.getEmail())) {
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
                .avatarUrl(CommonUtils.saveImageFile(null, BASE_DOMAIN_IMAGE, BASE_UPLOAD_PATH, Constant.USER))
                .build());

        emailService.sendRegisterAccount(registerUser.getEmail(), registerUser.getUsername());
    }

    @Override
    public LoginResponse login(UserDto user) {
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
        return LoginResponse.builder()
                .userId(user1.getId())
                .build();

    }

    @Override
    public void updateUserProfile(UpdateUserProfile userProfile, MultipartFile image) throws IOException {
        User user = userRepository.findByUsernameAndIsDeleted(userProfile.getUsername(), false)
                .orElseThrow(() -> {
                    log.error("User not found: {}", userProfile.getUsername());
                    return new ResourceNotFoundException(
                            Translator.toLocale("user.error.user_or_password_incorrect"));
                });
        if (userProfile.getEmail() != null && !userProfile.getEmail().isEmpty()) {
            if (CommonUtils.validEmail(userProfile.getEmail())) {
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
        if (CommonUtils.validPassword(userProfile.getNewPassword())) {
            log.error("Invalid password format: {}", userProfile.getNewPassword());
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.error.invalid_password_format"));
        }

        if (!passwordEncoder.matches(userProfile.getOldPassword(), user.getPasswordHash())) {
            throw new ResourceNotFoundException(
                    Translator.toLocale("user.error.password_incorrect"));
        }

        user.setPasswordHash(passwordEncoder.encode(userProfile.getNewPassword()));
        user.setNickname(userProfile.getNickname());
        if (!ObjectUtils.isEmpty(image)) {
            String fileUrl = CommonUtils.saveImageFile(image, BASE_DOMAIN_IMAGE, BASE_UPLOAD_PATH, Constant.USER);
            user.setAvatarUrl(fileUrl);
        }
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
