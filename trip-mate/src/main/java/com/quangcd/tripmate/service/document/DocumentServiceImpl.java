package com.quangcd.tripmate.service.document;

import com.quangcd.tripmate.common.DocumentType;
import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.dto.response.DocumentResponse;
import com.quangcd.tripmate.entity.Document;
import com.quangcd.tripmate.entity.User;
import com.quangcd.tripmate.exception.ResourceNotFoundException;
import com.quangcd.tripmate.repository.DocumentRepository;
import com.quangcd.tripmate.service.tripmember.TripMemberService;
import com.quangcd.tripmate.service.user.UserService;
import com.quangcd.tripmate.utils.CommonUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@Slf4j(topic = "DOCUMENT-SERVICE")
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {

    private final DocumentRepository documentRepository;
    private final TripMemberService tripMemberService;
    private final UserService userService;

    @Value("${application.domain-image}")
    private String baseDomainImage;
    @Value("${application.domain-upload}")
    private String baseUploadPath;

    @Override
    public List<DocumentResponse> findDocumentByReferId(Long referId, String type, Long userId) {
        if (type.equals(DocumentType.TRIP.toString())) {
            tripMemberService.findByTripIdAndUserId(referId, userId);
        } else if (type.equals(DocumentType.CHAT.toString())) {

        } else {
            throw new ResourceNotFoundException(
                    Translator.toLocale("document.type.not.found" ));
        }

        return documentRepository.findAllByReferIdAndTypeAndIsDeletedFalse(referId, type)
                .stream()
                .map(document ->
                        {
                            User user = userService.findById(userId);
                            return DocumentResponse.builder()
                                    .id(document.getId())
                                    .referId(document.getReferId())
                                    .type(type)
                                    .url(document.getUrl())
                                    .userId(userId)
                                    .name(document.getName())
                                    .userNickname(user.getNickname())
                                    .build();
                        }
                ).toList();
    }

    @Override
    public void uploadDocument(MultipartFile file, String type, Long tripId, Long userId) throws IOException {
        String baseDomainUpload = baseDomainImage + File.separator + "document";
        String baseUploadPathDocument = baseUploadPath + File.separator + "document";
        if (type.equals(DocumentType.TRIP.toString())) {
            tripMemberService.findByTripIdAndUserId(tripId, userId);
        } else if (type.equals(DocumentType.CHAT.toString())) {

        } else {
            throw new ResourceNotFoundException(
                    Translator.toLocale("document.type.not.found"));
        }
        Document document = Document.builder()
                .referId(tripId)
                .type(type)
                .name(file.getOriginalFilename())
                .url(CommonUtils.saveFile(file, baseDomainUpload, baseUploadPathDocument, type.toLowerCase()))
                .userId(userId)
                .build();
        documentRepository.save(document);
    }

    @Override
    public void deleteDocument(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                Translator.toLocale("document.document.not.found")));

        document.setDeleted(true);
        documentRepository.save(document);
    }
}
