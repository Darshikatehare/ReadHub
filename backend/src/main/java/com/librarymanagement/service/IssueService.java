package com.librarymanagement.service;

import com.librarymanagement.model.Book;
import com.librarymanagement.model.IssueRecord;
import com.librarymanagement.model.User;
import com.librarymanagement.repository.BookRepository;
import com.librarymanagement.repository.IssueRecordRepository;
import com.librarymanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class IssueService {
    @Autowired
    private IssueRecordRepository issueRecordRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;

    public IssueRecord issueBook(Long bookId, Long userId) {
        Book book = bookRepository.findById(bookId).orElse(null);
        User user = userRepository.findById(userId).orElse(null);

        if (book != null && user != null && book.getAvailable() > 0) {
            book.setAvailable(book.getAvailable() - 1);
            bookRepository.save(book);

            IssueRecord record = IssueRecord.builder()
                    .book(book)
                    .user(user)
                    .issueDate(LocalDate.now())
                    .status("ISSUED")
                    .build();
            return issueRecordRepository.save(record);
        }
        return null;
    }

    public IssueRecord returnBook(Long recordId) {
        IssueRecord record = issueRecordRepository.findById(recordId).orElse(null);
        if (record != null && "ISSUED".equals(record.getStatus())) {
            record.setReturnDate(LocalDate.now());
            record.setStatus("RETURNED");
            
            Book book = record.getBook();
            book.setAvailable(book.getAvailable() + 1);
            bookRepository.save(book);

            return issueRecordRepository.save(record);
        }
        return null;
    }

    public List<IssueRecord> getIssuedBooks() {
        return issueRecordRepository.findAll();
    }
}
