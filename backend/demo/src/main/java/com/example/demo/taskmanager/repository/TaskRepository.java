package com.example.demo.taskmanager.repository;

import com.example.demo.taskmanager.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long>{

}

