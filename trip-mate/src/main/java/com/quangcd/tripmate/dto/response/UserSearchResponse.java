package com.quangcd.tripmate.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserSearchResponse {
    private Long id;
    private String nickname;
    private String avatarUrl;

}
