package com.example.demo.taskmanager;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record TaskPatchRequest(
        @Pattern(regexp = ".*\\S.*", message = "must not be blank")
        @Size(max = 150) String title,
        String description,
        @Pattern(regexp = "pending|in_progress|done") String status,
        @Pattern(regexp = "low|medium|high") String priority,
        LocalDate dueDate
) {}
