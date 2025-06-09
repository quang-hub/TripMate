package com.quangcd.tripmate.exception;

import com.quangcd.tripmate.dto.response.BaseResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import com.quangcd.tripmate.dto.response.ErrorResponse;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.Date;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.util.MimeTypeUtils.APPLICATION_JSON_VALUE;

@RestControllerAdvice
public class GlobalHandleException {

    @Autowired
    private MessageSource messageSource;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex) {
        FieldError fieldError = ex.getBindingResult().getFieldErrors().get(0);

        String fieldName = fieldError.getField(); // ví dụ: "title"
        String defaultMessageKey = fieldError.getDefaultMessage(); // ví dụ: "field.required"

        // Lấy tên hiển thị cho field
        String displayName = messageSource.getMessage("field." + fieldName, null, fieldName, LocaleContextHolder.getLocale());

        // truyền tên field hiển thị vào {0}
        assert defaultMessageKey != null;
        String localizedMessage = messageSource.getMessage(defaultMessageKey, new Object[]{displayName}, LocaleContextHolder.getLocale());

        return ResponseEntity.badRequest().body(BaseResponse.builder()
                .code(400)
                .message(localizedMessage)
                .build());
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(FORBIDDEN)
    @ApiResponses(value = {
            @ApiResponse(responseCode = "403", description = "Access Dined",
                    content = {@Content(mediaType = APPLICATION_JSON_VALUE,
                            examples = @ExampleObject(
                                    name = "403 Response",
                                    summary = "Handle exception when access forbidden",
                                    value = """
                                            {
                                              "timestamp": "2023-10-19T06:07:35.321+00:00",
                                              "status": 403,
                                              "path": "/api/v1/...",
                                              "error": "Access Dined",
                                              "message": "{data} not found"
                                            }
                                            """
                            ))})
    })
    public ErrorResponse handleForBiddenException(AccessDeniedException e) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setTimestamp(new Date());
        errorResponse.setStatus(FORBIDDEN.value());
        errorResponse.setError(FORBIDDEN.getReasonPhrase());
        errorResponse.setMessage(e.getMessage());

        return errorResponse;
    }
}

