package com.quangcd.tripmate.service.user;

import com.quangcd.tripmate.dto.UserDto;
import com.quangcd.tripmate.dto.request.user.CreateUserRequest;
import com.quangcd.tripmate.dto.request.user.UpdateUserProfile;
import com.quangcd.tripmate.dto.response.UserSearchResponse;

import java.util.List;

public interface UserService {
    void saveUser(CreateUserRequest user);

    void login(UserDto user);

    void updateUserProfile(UpdateUserProfile userProfile);

    List<UserSearchResponse> findExceptUsername(String nickname, String username);
}
