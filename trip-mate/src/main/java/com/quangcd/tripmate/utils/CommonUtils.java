package com.quangcd.tripmate.utils;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
public class CommonUtils {
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";

    public static boolean isvalidEmail(String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isvalidPassword(String password) {
        return password != null && password.length() >= 6;
    }

    public static String saveImageFile(MultipartFile image, String baseUpload, String baseFolder, String target) throws IOException {
        if (ObjectUtils.isEmpty(image) || image == null) {
            log.error("Image file is null or empty save image default avatar");
            return baseUpload + File.separator + target + File.separator + Constant.DEFAULT_AVATAR_USER;
        }
        File uploadImagePath = new File(baseFolder + File.separator + target);
        if (!uploadImagePath.exists()) {
            log.error("Upload path does not exist: {}", baseFolder + File.separator + target);
            throw new ResourceNotFoundException(
                    Translator.toLocale("common.error"));
        }
        String fileName = "user_" + new Date().getTime() + RandomStringUtils.random(4, false, true)
                + "." + FilenameUtils.getExtension(image.getOriginalFilename());
        File newFile = new File(baseFolder + File.separator + target + File.separator + fileName);
        image.transferTo(newFile);
        return baseUpload + File.separator + target + File.separator + fileName;
    }
}
