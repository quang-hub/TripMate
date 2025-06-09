package com.quangcd.tripmate.service.security;

import com.quangcd.tripmate.dto.request.user.LoginRequest;
import com.quangcd.tripmate.dto.response.TokenResponse;
import com.quangcd.tripmate.entity.User;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import com.quangcd.tripmate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static com.quangcd.tripmate.common.TokenType.REFRESH_TOKEN;

@Service
@RequiredArgsConstructor
@Slf4j(topic = "AUTHENTICATION-SERVICE")
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    @Override
    public TokenResponse getAccessToken(LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (AuthenticationException e) {
            log.error("Login failed >>> {}",e.getMessage());
            throw new AccessDeniedException(e.getMessage());
        }

        var user = userRepository.findByUsernameEqualsAndIsDeletedIsFalse(request.getUsername());

        if (user == null) {
            log.error("User not found with username: {}", request.getUsername());
            throw new AccessDeniedException("User not found");
        }

        String accessToken = jwtService.generateAccessToken(user.getId(), request.getUsername(), user.getAuthorities());
        String refreshToken = jwtService.generateRefreshToken(user.getId(), request.getUsername(), user.getAuthorities());

        return TokenResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Override
    public TokenResponse getRefreshToken(String refreshToken) {
        log.info("Get refresh token");

        if (!StringUtils.hasLength(refreshToken)) {
            throw new ResourceNotFoundException("Token must be not blank");
        }

        try {
            // Verify token
            String userName = jwtService.extractUsername(refreshToken, REFRESH_TOKEN);

            // check user is active or inactivated
            User user = userRepository.findByUsernameEqualsAndIsDeletedIsFalse(userName);

            // generate new access token
            String accessToken = jwtService.generateAccessToken(user.getId(), user.getUsername(), user.getAuthorities());

            return TokenResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
        } catch (Exception e) {
            log.error("Access denied! errorMessage: {}", e.getMessage());
            throw new AccessDeniedException(e.getMessage());
        }
    }
}
