package com.quangcd.tripmate.utils;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import java.security.SecureRandom;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class CommonUtils {
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";

    public static boolean validEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        return !matcher.matches();
    }

    public static boolean validPassword(String password) {
        return password == null || password.length() < 6;
    }

    public static String saveImageFile(MultipartFile image, String baseUpload, String baseFolder, String target) throws IOException {
        if (ObjectUtils.isEmpty(image)) {
            log.error("Image file is null or empty save image default avatar");
            return baseUpload + File.separator + target + File.separator + Constant.DEFAULT_AVATAR_USER;
        }
        File uploadImagePath = new File(baseFolder + File.separator + target);
        if (!uploadImagePath.exists()) {
            log.error("Upload path does not exist: {}", baseFolder + File.separator + target);
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.error"));
        }
        String fileName = "user_" + new Date().getTime() + getRandomNumber(4)
                + "." + FilenameUtils.getExtension(image.getOriginalFilename());
        File newFile = new File(baseFolder + File.separator + target + File.separator + fileName);
        image.transferTo(newFile);
        return baseUpload + File.separator + target + File.separator + fileName;
    }

    public static String getRandomNumber(int numberOfDigits) {
        SecureRandom random = new SecureRandom();
        StringBuilder randomNum = new StringBuilder();
        for (int i = 0; i < numberOfDigits; i++) {
            randomNum.append(random.nextInt(10));
        }
        log.info("Generated random number: {}", randomNum);
        return randomNum.toString();
    }

}
