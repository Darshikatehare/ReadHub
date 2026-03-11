package com.librarymanagement.controller;

import com.librarymanagement.dto.IssueRequest;
import com.librarymanagement.model.IssueRecord;
import com.librarymanagement.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "http://localhost:5173")
public class IssueController {
    @Autowired
    private IssueService issueService;

    @PostMapping("/issue")
    public IssueRecord issueBook(@RequestBody IssueRequest request) {
        return issueService.issueBook(request.getBookId(), request.getUserId());
    }

    @PostMapping("/return/{id}")
    public IssueRecord returnBook(@PathVariable Long id) {
        return issueService.returnBook(id);
    }

    @GetMapping
    public List<IssueRecord> getIssuedBooks() {
        return issueService.getIssuedBooks();
    }
}
