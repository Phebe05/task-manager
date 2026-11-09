package com.example.demo.taskmanager;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record TaskRequest(
    @NotBlank @Size(max = 150) String title,
    String description,
    @Pattern(regexp = "pending|in_progress|done") String status,
    @Pattern(regexp = "low|medium|high") String priority,
    LocalDate dueDate
) {}
