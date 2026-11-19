package com.example.demo.taskmanager;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StatusConverter implements AttributeConverter<Status, String> {

    @Override
    public String convertToDatabaseColumn(Status status) {
        return status == null ? null : status.getValue();
    }

    @Override
    public Status convertToEntityAttribute(String value) {
        return value == null ? null : Status.fromValue(value);
    }
}