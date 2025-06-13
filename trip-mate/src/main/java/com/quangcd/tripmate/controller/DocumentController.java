package com.quangcd.tripmate.controller;

import com.quangcd.tripmate.configuration.Translator;
import com.quangcd.tripmate.constant.Constant;
import com.quangcd.tripmate.dto.request.document.UploadRequest;
import com.quangcd.tripmate.dto.response.BaseResponse;
import com.quangcd.tripmate.dto.response.DocumentResponse;
import com.quangcd.tripmate.service.document.DocumentService;
import com.quangcd.tripmate.service.security.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/document")
@Slf4j(topic = "DOCUMENT-CONTROLLER")
@RequiredArgsConstructor
@Validated

public class DocumentController {

    private final AuthenticationService authenticationService;
    private final DocumentService documentService;

    @GetMapping("/list")
    @Operation(summary = "listDocument for trip", description = "listDocument ")
    public ResponseEntity<Object> listDocument(@RequestParam Long referId, @RequestParam String type, Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            List<DocumentResponse> response = documentService.findDocumentByReferId(referId, type, userId);
            log.info("listDocument successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .data(response)
                    .build());
        } catch (Exception e) {
            log.error("listDocument errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<Object> uploadFile(@Valid @RequestPart(value = "request") UploadRequest data,
                                                @RequestPart(value = "file") MultipartFile file,
                                                Authentication authentication) {
        try {
            Long userId = authenticationService.extractUserId(authentication);
            documentService.uploadDocument(file, data.getType(), data.getReferId(), userId);
            log.info("uploadFile successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("uploadFile errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

    @PostMapping("/delete/{documentId}")
    public ResponseEntity<Object> deleteFile(@PathVariable Long documentId) {
        try {
            documentService.deleteDocument(documentId);
            log.info("deleteFile successful");
            return ResponseEntity.ok(BaseResponse.builder()
                    .code(200)
                    .message(Translator.toLocale(Constant.COMMON_SUCCESS_MESSAGE))
                    .build());
        } catch (Exception e) {
            log.error("deleteFile errMessage={}", e.getMessage(), e.getCause());
            return ResponseEntity.badRequest().body(BaseResponse.builder()
                    .code(400)
                    .message(e.getMessage())
                    .build());
        }
    }

}
