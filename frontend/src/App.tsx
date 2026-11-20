import { useMemo, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Toolbar } from "./components/Toolbar";
import { TaskList } from "./components/TaskList";
import { NewTaskForm } from "./components/NewTaskForm";
import { useTasks } from "./hooks/useTasks";
import { applyFilters } from "./utils/taskFilters";
import type { TaskFilters } from "./types/task";
import { Modal } from "./components/Modal";

export default function App() {
  const {
    tasks,
    loading,
    error,
    actionError,
    toggleDone,
    addTask,
    removeTask,
  } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<TaskFilters>({
    status: "",
    search: "",
    sort: "due_date",
  });

  const visibleTasks = useMemo(
    () => applyFilters(tasks, filters),
    [tasks, filters],
  );

  return (
    <div className="app">
      <Sidebar
        activeStatus={filters.status}
        onChange={(status) => setFilters((f) => ({ ...f, status }))}
      />
      <main>
        <Toolbar
          search={filters.search}
          sort={filters.sort}
          onSearchChange={(search) => setFilters((f) => ({ ...f, search }))}
          onSortChange={(sort) => setFilters((f) => ({ ...f, sort }))}
          onNewTask={() => setShowForm(true)}
        />

        <Modal open={showForm} onClose={() => setShowForm(false)}>
          <NewTaskForm onSubmit={addTask} onCancel={() => setShowForm(false)} />
        </Modal>

        {actionError && (
          <p className="status-message error" role="alert">
            {actionError}
          </p>
        )}

        <TaskList
          tasks={visibleTasks}
          loading={loading}
          error={error}
          onToggle={toggleDone}
          onDelete={removeTask}
        />
      </main>
    </div>
  );
}
