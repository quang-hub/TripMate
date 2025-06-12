package com.quangcd.tripmate.service.security;

import com.quangcd.tripmate.common.TokenType;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public interface JWTService {

    String generateAccessToken(long userId, String username, Collection<? extends GrantedAuthority> authorities);

    String generateRefreshToken(long userId, String username, Collection<? extends GrantedAuthority> authorities);

    String extractUsername(String token, TokenType tokenType);

    Long extractUserId(String token, TokenType type);
}
