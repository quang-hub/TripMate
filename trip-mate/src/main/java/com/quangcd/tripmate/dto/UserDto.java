package com.quangcd.tripmate.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    @NotBlank(message = "field.required")
    private String username;
    @NotBlank(message = "field.required")
    private String password;
}
