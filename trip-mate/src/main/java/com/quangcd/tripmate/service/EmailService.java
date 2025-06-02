package com.quangcd.tripmate.service;


import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRegisterAccount(String to, String username) {
        new Thread(() -> {
            try {
                MimeMessage message = mailSender.createMimeMessage();

                message.setFrom(new InternetAddress(fromEmail));
                message.setRecipients(MimeMessage.RecipientType.TO, to);
                message.setSubject("Trip Mate - Account Registration Successful");

                String htmlTemplate = IOUtils.toString(new ClassPathResource("template/send-email-thank_you.html").getInputStream(), StandardCharsets.UTF_8);
                htmlTemplate = htmlTemplate.replace("{{username}}", username);
//                htmlTemplate = htmlTemplate.replace("{{home-url}}", BASE_FRONT_END_DOMAIN + "/home");

                message.setContent(htmlTemplate, "text/html; charset=utf-8");
                mailSender.send(message);
                log.info("Send mail to: {} >>> Success", to);
            } catch (IOException | MessagingException e) {
                log.error("Send mail >>> Error", e);
                throw new ResourceNotFoundException(
                        Translator.toLocale("common.error.invalid_email_format"));
            }
        }).start();

    }
}
