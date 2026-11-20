package com.example.demo.taskmanager.dto;

import com.example.demo.taskmanager.Priority;
import com.example.demo.taskmanager.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record TaskRequest(
        @NotBlank @Size(max = 150) String title,
        String description,
        Status status,
        Priority priority,
        LocalDate dueDate
) {}