package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.dto.request.user.LoginRequest;
import com.quangcd.tripmate.dto.response.TokenResponse;
import com.quangcd.tripmate.service.security.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tags;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Slf4j(topic = "AUTH-CONTROLLER")
@RequiredArgsConstructor

public class AuthController {

    private final AuthenticationService authenticationService;

    @Operation(summary = "Get access token", description = "This endpoint is used to get an access token for authenticated users.")
    @PostMapping("access-token")
    public TokenResponse getAccessToken(@RequestBody LoginRequest loginRequest) {
        log.info("Access token request");
        return authenticationService.getAccessToken(loginRequest);
    }

    @Operation(summary = "Get refresh token", description = "This endpoint is used to get an refresh token for authenticated users.")
    @PostMapping("refresh-token")
    public TokenResponse getRefreshToken(@RequestParam String refreshToken) {
        log.info("refresh token request");
        return TokenResponse.builder()
                .accessToken("DUMMY-ACCESS-TOKEN")
                .refreshToken("DUMMY-REFRESH-TOKEN")
                .build();

    }
}
