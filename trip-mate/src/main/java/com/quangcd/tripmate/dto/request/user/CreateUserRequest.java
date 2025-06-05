package com.quangcd.tripmate.dto.request.user;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequest {
    @NotBlank(message = "field.required")
    private String username;
    @NotBlank(message = "field.required")
    private String password;
    @NotBlank(message = "field.required")
    private String email;
    @NotBlank(message = "field.required")
    private String nickname;

}
