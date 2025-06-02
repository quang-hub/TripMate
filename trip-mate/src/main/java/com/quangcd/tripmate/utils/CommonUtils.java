package com.quangcd.tripmate.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CommonUtils {
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";

    public static boolean isvalidEmail( String email) {
        Pattern pattern = Pattern.compile(EMAIL_REGEX);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }

    public static boolean isvalidPassword(String password) {
        return password != null && password.length() >= 6;
    }
}
