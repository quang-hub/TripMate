package com.quangcd.tripmate.service.security;

import com.quangcd.tripmate.dto.request.user.LoginRequest;
import com.quangcd.tripmate.dto.response.TokenResponse;
import org.springframework.security.core.Authentication;

public interface AuthenticationService {

    TokenResponse getAccessToken(LoginRequest request);
    TokenResponse getRefreshToken(String request);

    Long extractUserId(Authentication authentication);
}
