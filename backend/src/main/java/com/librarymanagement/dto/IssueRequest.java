package com.librarymanagement.dto;

import lombok.Data;

@Data
public class IssueRequest {
    private Long bookId;
    private Long userId;
}
