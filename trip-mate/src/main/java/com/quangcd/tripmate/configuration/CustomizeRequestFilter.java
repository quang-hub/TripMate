package com.quangcd.tripmate.configuration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.quangcd.tripmate.common.TokenType;
import com.quangcd.tripmate.service.auth.UserServiceDetail;
import com.quangcd.tripmate.service.security.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import com.quangcd.tripmate.dto.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;

@Component
@RequiredArgsConstructor
@Slf4j(topic = "CUSTOMIZE-REQUEST-FILTER")
public class CustomizeRequestFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserServiceDetail userServiceDetail;

    @Override
    protected void doFilterInternal(HttpServletRequest request,@NonNull  HttpServletResponse response,@NonNull  FilterChain filterChain) throws ServletException, IOException {
        log.info("Request URI: {}", request.getRequestURI());
        //TODO: verify token here
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            log.info("Token: {}", token.substring(0, 20));
            String username;
            try {
                username = jwtService.extractUsername(token, TokenType.ACCESS_TOKEN);
                log.info("Username: {}", username);
            } catch (Exception e) {
                log.info("Access denied: {}", e.getMessage());
                response.setStatus(HttpServletResponse.SC_OK);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write(errorResponse(e.getMessage()));
                return;
            }

            UserDetails userDetails = userServiceDetail.userServiceDetail().loadUserByUsername(username);
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            securityContext.setAuthentication(authentication);
            SecurityContextHolder.setContext(securityContext);
            return;

        } else {
            log.warn("No valid Authorization header found");
        }

        filterChain.doFilter(request, response);
    }

    private String errorResponse(String message) {
        try {
            ErrorResponse error = new ErrorResponse();
            error.setTimestamp(new Date());
            error.setError("Forbidden");
            error.setStatus(HttpServletResponse.SC_FORBIDDEN);
            error.setMessage(message);

            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            return gson.toJson(error);
        } catch (Exception e) {
            return ""; // Return an empty string if serialization fails
        }
    }

}
