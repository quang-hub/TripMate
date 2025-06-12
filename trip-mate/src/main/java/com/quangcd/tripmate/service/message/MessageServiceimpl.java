package com.quangcd.tripmate.service.message;

import com.quangcd.tripmate.dto.request.message.MessageRequest;
import com.quangcd.tripmate.dto.response.MessageResponse;
import com.quangcd.tripmate.entity.Message;
import com.quangcd.tripmate.entity.User;
import com.quangcd.tripmate.repository.MessageRepository;
import com.quangcd.tripmate.service.tripmember.TripMemberService;
import com.quangcd.tripmate.service.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j(topic = "MESSAGE-SERVICE")
@RequiredArgsConstructor

public class MessageServiceimpl implements MessageService {

    private final MessageRepository messageRepository;
    private final UserService userService;
    private final TripMemberService tripMemberService;

    @Override
    public MessageResponse sendMessage(MessageRequest request, Long userId) {
        tripMemberService.findByTripIdAndUserId(request.getTripId(), userId);

        Message message = Message.builder()
                .tripId(request.getTripId())
                .senderId(userId)
                .content(request.getContent())
                .build();
        messageRepository.save(message);
        log.info("Message save to db with userId: {} {}", message.getContent(), userId);
        return MessageResponse.builder()
                .id(message.getId())
                .tripId(message.getTripId())
                .senderId(message.getSenderId())
                .content(message.getContent())
                .createdAt(message.getCreatedAt())
                .build();
    }

    @Override
    public List<MessageResponse> getMessagesByTrip(Long tripId) {
        List<MessageResponse> messageResponseList = messageRepository.findAllByTripIdAndIsDeletedFalseOrderByCreatedAtAsc(tripId)
                .stream()
                .map(message ->
                        {
                            User user = userService.findById(message.getSenderId());
                            return MessageResponse.builder()
                                    .id(message.getId())
                                    .tripId(message.getTripId())
                                    .senderId(message.getSenderId())
                                    .content(message.getContent())
                                    .senderAvatarUrl(user.getAvatarUrl())
                                    .nickname(user.getNickname())
                                    .createdAt(message.getCreatedAt())
                                    .build();
                        }
                ).toList();
        return messageResponseList;
    }
}
