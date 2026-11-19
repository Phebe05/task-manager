package com.example.demo.taskmanager;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class PriorityConverter implements AttributeConverter<Priority, String> {

    @Override
    public String convertToDatabaseColumn(Priority priority) {
        return priority == null ? null : priority.getValue();
    }

    @Override
    public Priority convertToEntityAttribute(String value) {
        return value == null ? null : Priority.fromValue(value);
    }
}