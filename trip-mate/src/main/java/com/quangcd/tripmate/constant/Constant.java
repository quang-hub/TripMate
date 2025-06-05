package com.quangcd.tripmate.constant;

import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

public class Constant {

    public static final String DEFAULT_AVATAR_USER = "default-avatar.png";

    public static final String USER = "user";

    public static final Map<String, String> ROLE_IN_TRIP = Map.of(
        "LEADER", "LEADER",
        "GUEST", "GUEST",
        "MEMBER", "MEMBER"
    );
}
