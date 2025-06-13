package com.quangcd.tripmate.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DocumentResponse {
    private Long id;
    private String name;
    private String url;
    private Long referId;
    private Long userId;
    private String type;
    private String userNickname;
}
