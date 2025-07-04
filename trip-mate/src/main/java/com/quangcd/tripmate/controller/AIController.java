package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.dto.request.message.MessageRequest;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.service.ai.AIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
@Slf4j(topic = "AI-CONTROLLER")
@RequiredArgsConstructor
@Validated

public class AIController {

	private final AIService aiService;

	@PostMapping("chat")
	public ResponseEntity<Object> chat(@RequestBody String request, Authentication authentication) {
		try {
			String aiResponse = aiService.chat(request);
			return ResponseEntity.ok(BaseResponse.builder()
					.code(200)
					.message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
					.data(aiResponse)
					.build());
		} catch (Exception e) {
			log.error("sendMessage errMessage={}", e.getMessage(), e.getCause());
			return ResponseEntity.badRequest().body(BaseResponse.builder()
					.code(400)
					.message(e.getMessage())
					.build());
		}
	}
}
