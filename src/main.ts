const { TaskScheduler } = require('./classes/TaskScheduler'); 

const scheduler = new TaskScheduler();
scheduler.addTask("A");
scheduler.addTask("B", ["A"]);
scheduler.addTask("C", ["A"]);
scheduler.addTask("D", ["B", "C"]);
scheduler.addTask("E", ["D"]);

// Adding a task with a circular dependency (uncomment to test)
// scheduler.addTask("F", ["F"]);

const scheduledTasks = scheduler.scheduleTasks();
console.log("Scheduled Tasks:", scheduledTasks);
