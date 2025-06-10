package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.service.security.AuthenticationService;
import com.quangcd.tripmate.service.user.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserService userService;

    @MockitoBean
    private AuthenticationService authenticationService;

    @Test
    @WithMockUser
    void testRegisterUser() throws Exception {
        String requestJson = """
            {
              "username": "testuser",
              "email": "testuser@gmail.com",
              "password": "123456",
              "nickname": "tester"
            }
            """;

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200));
    }

    @Test
    @WithMockUser
    void testUpdateProfile() throws Exception {
        // Tạo multipart file giả
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "avatar.png",
                MediaType.IMAGE_PNG_VALUE,
                "dummy image content".getBytes()
        );

        // JSON dạng string cho request part
        MockMultipartFile request = new MockMultipartFile(
                "request",
                "",
                "application/json",
                """
                {
                  "id": 1,
                  "nickname": "updatedNickname",
                  "email": "updated@gmail.com"
                }
                """.getBytes()
        );

        mockMvc.perform(multipart("/api/user/update-profile")
                        .file(request)
                        .file(file)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200));
    }

    @Test
    @WithMockUser
    void testSearchAnotherUser() throws Exception {
        Mockito.when(authenticationService.extractUserId(Mockito.any()))
                .thenReturn(1L);

        mockMvc.perform(get("/api/user/search")
                        .param("nickname", "test")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200));
    }
}
