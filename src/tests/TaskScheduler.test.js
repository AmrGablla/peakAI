import { describe, expect, test } from "@jest/globals";
import { TaskScheduler } from "../classes/TaskScheduler";

describe("TaskScheduler", () => {
  test("forward submttion", () => {
    const scheduler = new TaskScheduler();
    scheduler.addTask("A");
    scheduler.addTask("B", ["A"]);
    scheduler.addTask("C", ["A"]);
    scheduler.addTask("D", ["B", "C"]);
    scheduler.addTask("E", ["D"]);

    // Adding a task with a circular dependency (uncomment to test)
    // scheduler.addTask("F", ["F"]);

    const scheduledTasks = scheduler.scheduleTasks();
    expect(scheduledTasks).toBe(["F", "E", "D", "C", "B", "A"]);
  });
});
