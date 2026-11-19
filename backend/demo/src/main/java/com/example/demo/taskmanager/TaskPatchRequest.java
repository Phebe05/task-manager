package com.example.demo.taskmanager;

import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record TaskPatchRequest(
        @jakarta.validation.constraints.Pattern(
                regexp = ".*\\S.*",
                message = "must not be blank"
        )
        @Size(max = 150) String title,
        String description,
        Status status,
        Priority priority,
        LocalDate dueDate
) {}