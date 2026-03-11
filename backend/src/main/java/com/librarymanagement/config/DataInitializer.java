package com.librarymanagement.config;

import com.librarymanagement.model.Book;
import com.librarymanagement.model.User;
import com.librarymanagement.repository.BookRepository;
import com.librarymanagement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(BookRepository bookRepository, UserRepository userRepository) {
        return args -> {
            if (bookRepository.count() == 0) {
                bookRepository.saveAll(List.of(
                    Book.builder().title("The Great Gatsby").author("F. Scott Fitzgerald").category("Fiction").quantity(5).available(5).build(),
                    Book.builder().title("To Kill a Mockingbird").author("Harper Lee").category("Fiction").quantity(3).available(3).build(),
                    Book.builder().title("A Brief History of Time").author("Stephen Hawking").category("Science").quantity(2).available(2).build(),
                    Book.builder().title("Clean Code").author("Robert C. Martin").category("Technology").quantity(10).available(10).build()
                ));
            }

            if (userRepository.count() == 0) {
                userRepository.saveAll(List.of(
                    User.builder().name("John Doe").email("john@example.com").phone("1234567890").build(),
                    User.builder().name("Jane Smith").email("jane@example.com").phone("0987654321").build()
                ));
            }
        };
    }
}
