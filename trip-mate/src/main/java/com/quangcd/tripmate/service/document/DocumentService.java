package com.quangcd.tripmate.service.document;

import com.quangcd.tripmate.dto.response.DocumentResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface DocumentService {
    List<DocumentResponse> findDocumentByReferId(Long tripId,String type, Long userId);

    void uploadDocument(MultipartFile file, String type, Long referId, Long userId) throws IOException;

    void deleteDocument(Long documentId);
}
