package com.quangcd.tripmate.service.message;
import com.quangcd.tripmate.dto.request.message.MessageRequest;
import com.quangcd.tripmate.dto.response.MessageResponse;

import java.util.List;

public interface MessageService {

    MessageResponse sendMessage(MessageRequest request, Long userId);

    List<MessageResponse> getMessagesByTrip(Long tripId);

}
