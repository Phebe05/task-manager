package com.example.demo.taskmanager;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TaskService {
    private final TaskRepository repo;

    public TaskService(TaskRepository repo){
        this.repo = repo;
    }

    //Get all Tasks
    public List<Task> getAllTasks(){
        return repo.findAll();
    }

    //Get one task by its id
    public Task getTaskById(Long id){
        return repo.findById(id).orElseThrow(()-> new TaskNotFoundException(id));
    }

    // Apply task information from a request
    private void apply(Task task, TaskRequest req) {
        task.setTitle(req.title().trim());
        task.setDescription(req.description());
        task.setStatus(req.status() != null ? req.status() : Status.PENDING);
        task.setPriority(req.priority() != null ? req.priority() : Priority.MEDIUM);
        task.setDueDate(req.dueDate());
    }

    // create a new task
    public Task createTask(TaskRequest req){
        Task task = new Task();
        apply(task, req);
        return repo.save(task);
    }

    //updating an existing task
    public Task updateTask(Long id, TaskRequest req){
        Task task = getTaskById(id);
        apply(task, req);
        return repo.save(task);
    }

    // Delete a task
    public void deleteTask(Long id) {
        if (!repo.existsById(id)) {
            throw new TaskNotFoundException(id);
        }

        repo.deleteById(id);
    }

    // Partially update a task
    public Task patchTask(Long id, TaskPatchRequest req) {
        Task task = getTaskById(id);

        if (req.title() != null) task.setTitle(req.title().trim());
        if (req.description() != null) task.setDescription(req.description());
        if (req.status() != null) task.setStatus(req.status());
        if (req.priority() != null) task.setPriority(req.priority());
        if (req.dueDate() != null) task.setDueDate(req.dueDate());

        return repo.save(task);
    }
}
