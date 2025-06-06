package com.quangcd.tripmate.service.security;

import com.quangcd.tripmate.dto.request.user.LoginRequest;
import com.quangcd.tripmate.dto.response.TokenResponse;

public interface AuthenticationService {

    TokenResponse getAccessToken(LoginRequest request);
    TokenResponse getRefreshToken(String request);

}
