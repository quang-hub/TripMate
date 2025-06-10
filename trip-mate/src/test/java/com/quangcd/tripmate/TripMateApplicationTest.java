package com.quangcd.tripmate;

import com.quangcd.tripmate.controller.TripMemberController;
import com.quangcd.tripmate.controller.UserController;
import com.quangcd.tripmate.controller.AuthController;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TripMateApplicationTest {

    @InjectMocks
    private AuthController authenticationController;

    @InjectMocks
    private UserController userController;

    @InjectMocks
    private TripMemberController tripMemberController;

    @InjectMocks
    private UserController TripController;

    @Test
    void contextLoads() {
        Assertions.assertNotNull(authenticationController);
        Assertions.assertNotNull(userController);
        Assertions.assertNotNull(tripMemberController);
        Assertions.assertNotNull(TripController);

    }
}