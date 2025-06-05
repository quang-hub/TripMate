package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.dto.UserDto;
import com.quangcd.tripmate.dto.request.user.CreateUserRequest;
import com.quangcd.tripmate.dto.request.user.UpdateUserProfile;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.dto.response.LoginResponse;
import com.quangcd.tripmate.dto.response.UserSearchResponse;
import com.quangcd.tripmate.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@Slf4j
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;
//    private final HttpSession session;

    @PostMapping("/register")
    @Operation(summary = "register user", description = "")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CreateUserRequest user) {
        try {
            userService.saveUser(user);
            log.info(" Add genre successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale("common.success.notification"))
                    .build());
        } catch (Exception e) {
            log.error("errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDto user, HttpSession session) {
        try {
            LoginResponse loginResp = userService.login(user);

            session.setAttribute("username", user.getUsername());
            session.setAttribute("userId", loginResp.getUserId());
            log.info("login object >>> {}",loginResp);
            log.info("login successful >>> {}", loginResp.getUserId().toString());
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale("common.success.notification"))
                    .data(loginResp)
                    .build());
        } catch (Exception e) {
            log.error("errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestPart("request") UpdateUserProfile userProfile,
                                           @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            userService.updateUserProfile(userProfile, file);
            log.info("update successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale("common.success.notification"))
                    .build());
        } catch (Exception e) {
            log.error("errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @GetMapping("/search")
    @ApiResponse(
            responseCode = "200",
            description = "OK",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = UserSearchResponse.class))
    )
    public ResponseEntity<?> searchAnotherUser(@RequestParam(required = false) String nickname, HttpSession session) {
        try {
            String username = (String) session.getAttribute("username");
            List<UserSearchResponse> userSerchlist = userService.findExceptUsername(nickname, username);
            log.info("update successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale("common.success.notification"))
                    .data(userSerchlist)
                    .build());
        } catch (Exception e) {
            log.error("errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();

        return ResponseEntity.ok(BaseResponse.builder()
                .code(200)
                .message("Logout success")
                .build());
    }

}
