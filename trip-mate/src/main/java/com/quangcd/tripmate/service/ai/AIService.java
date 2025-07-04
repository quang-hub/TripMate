package com.quangcd.tripmate.service.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class AIService {
	private final ChatClient chatClient;

	public AIService(ChatClient.Builder builder) {
		chatClient = builder.build();
	}

	public String chat(String request) {
		return chatClient
				.prompt(request)
				.call()
				.content();
	}

}
