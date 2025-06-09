package com.quangcd.tripmate.dto.request.user;

import lombok.Getter;

import java.io.Serializable;

@Getter
public class LoginRequest implements Serializable {
    private String username;
    private String password;
    private String platform;
    private String deviceToken;
    private String version;
}
