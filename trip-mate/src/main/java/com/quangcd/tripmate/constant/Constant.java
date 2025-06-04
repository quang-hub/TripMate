package com.quangcd.tripmate.constant;

import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

public class Constant {
    @Value("${application.domain-name}")
    public static String BASE_DOMAIN_NAME;
    @Value("${application.domain-image}")
    public static String BASE_DOMAIN_IMAGE;
    @Value("${application.domain-upload-user}")
    public static String BASE_UPLOAD_PATH_USER;

    public static final String DEFAULT_AVATAR_USER = BASE_DOMAIN_NAME +"/upload/user/default-avatar.png";

    public static final Map<String, String> ROLE_IN_TRIP = Map.of(
        "LEADER", "LEADER",
        "GUEST", "GUEST",
        "MEMBER", "MEMBER"
    );
}
