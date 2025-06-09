package com.quangcd.tripmate.service.user;

import com.quangcd.tripmate.dto.UserDto;
import com.quangcd.tripmate.dto.request.user.CreateUserRequest;
import com.quangcd.tripmate.dto.request.user.UpdateUserProfile;
import com.quangcd.tripmate.dto.response.LoginResponse;
import com.quangcd.tripmate.dto.response.UserSearchResponse;
import com.quangcd.tripmate.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    User findByUsername(String username);

    User findById(Long id);

    void saveUser(CreateUserRequest user) throws IOException;

    void updateUserProfile(UpdateUserProfile userProfile, MultipartFile file) throws IOException;

    List<UserSearchResponse> findExceptUsername(String nickname, Long userId);
}
