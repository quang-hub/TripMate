package com.quangcd.tripmate.dto.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class LoginResponse {
    private Long userId;
}
