package com.example.demo.taskmanager;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("api/tasks")

public class TaskController{

    private final TaskRepository repo;

    public TaskController(TaskRepository repo){
        this.repo = repo;
    }

    //get all tasks
    @GetMapping
    public List<Task> getAll(){
        return repo.findAll();
    }

    //get a task by its id
    @GetMapping("/{id}")
    public Task getOne(@PathVariable Long id){
        return repo.findById(id).orElseThrow(()-> new TaskNotFoundException(id));
    }

    //apply method to be used below
    private void apply(Task task, TaskRequest req) {
        task.setTitle(req.title().trim());
        task.setDescription(req.description());
        task.setStatus(req.status() != null ? req.status() : "pending");
        task.setPriority(req.priority() != null ? req.priority() : "medium");
        task.setDueDate(req.dueDate());
    }

    //creating new tasks
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task create(@Valid @RequestBody TaskRequest req){
        Task task = new Task();
        apply(task, req);
        return repo.save(task);
    }

    //updating tasks(funny how putting means updating...initially thought it meant posting lol)
    @PutMapping("/{id}")
    public Task update(@PathVariable Long id,@Valid @RequestBody TaskRequest req){
        Task task = repo.findById(id).orElseThrow(()-> new TaskNotFoundException(id));
        apply(task, req);
        return repo.save(task);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        if(!repo.existsById(id)){
            throw new TaskNotFoundException(id);
        }
        repo.deleteById(id);
    }

    //- PUT: Replace the task's information.
    //- PATCH: Update only the information you specify.
    @PatchMapping("/{id}")
    public Task patch(@PathVariable Long id, @Valid @RequestBody TaskPatchRequest req) {
        Task task = repo.findById(id).orElseThrow(() -> new TaskNotFoundException(id));

        // Only change the fields that were actually sent
        if (req.title() != null) task.setTitle(req.title().trim());
        if (req.description() != null) task.setDescription(req.description());
        if (req.status() != null) task.setStatus(req.status());
        if (req.priority() != null) task.setPriority(req.priority());
        if (req.dueDate() != null) task.setDueDate(req.dueDate());

        return repo.save(task);
    }

}