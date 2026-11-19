package com.example.demo.taskmanager;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAll() {
        return taskService.getAllTasks();
    }

    // Get a task by its ID
    @GetMapping("/{id}")
    public Task getOne(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    // Create a new task
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task create(@Valid @RequestBody TaskRequest req) {
        return taskService.createTask(req);
    }

    // Update an existing task
    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @Valid @RequestBody TaskRequest req) {
        return taskService.updateTask(id, req);
    }

    // Delete a task
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        taskService.deleteTask(id);
    }

    // Partially update a task
    @PatchMapping("/{id}")
    public Task patch(@PathVariable Long id, @Valid @RequestBody TaskPatchRequest req) {
        return taskService.patchTask(id, req);
    }
}