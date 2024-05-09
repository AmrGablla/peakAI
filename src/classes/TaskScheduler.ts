export class TaskScheduler {
  private tasks: Map<string, Task>;

  constructor() {
    this.tasks = new Map<string, Task>();
  }

  addTask(
    name: string,
    dependencies: string[] = [],
    duration: number = 1
  ): void {
    if (!this.tasks.has(name)) {
      const task = new Task(name, duration, dependencies);
      this.tasks.set(name, task);
    }
  }

  scheduleTasks(): string[] {
    const sortedTasks: string[] = [];
    const visited: Set<string> = new Set();

    const dfs = (taskName: string) => {
      if (visited.has(taskName)) return;
      visited.add(taskName);
      const task = this.tasks.get(taskName);
      if (!task) return;
      task.dependencies.forEach((dep) => dfs(dep));
      sortedTasks.push(taskName);
    };

    this.tasks.forEach((task, name) => {
      dfs(name);
    });

    sortedTasks.reverse();

    const executTask = (task: Task): void => {
      console.log(`running task: ${task.name} with duration ${task.duration} `);
    };
    
    sortedTasks.forEach((taskName) => {
      const task = this.tasks.get(taskName);
      if (!task) return;
      executTask(task);
    });
    return sortedTasks;
  }
}

class Task {
  constructor(
    public name: string,
    public duration: number,
    public dependencies: string[] = []
  ) {}
}
