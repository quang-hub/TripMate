package com.quangcd.tripmate.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserProfile {

    @NotBlank(message = "field.required")
    private String username;

    private String oldPassword;

    private String newPassword;

    private String email;

    private String nickname;

}
