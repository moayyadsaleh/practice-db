import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (CSS, JS)

app.set('view engine', 'ejs');

const tasks = []; // Empty array to store tasks

app.get('/', (req, res) => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString(undefined, options);

  res.render('index.ejs', { tasks, formattedDate });
});

app.post('/add-task', (req, res) => {
  const taskText = req.body.taskInput;
  if (taskText) {
    const newTask = {
      title: taskText,
      completed: false,
      time: new Date().toLocaleTimeString(),
    };
    tasks.push(newTask);
    console.log('Task added:', newTask);
  }
  res.redirect('/');
});

app.post('/update-task', (req, res) => {
  const taskId = req.body.taskId;
  const task = tasks.find(task => task._id === taskId);
  if (task) {
    task.completed = !task.completed;
    task.time = new Date().toLocaleTimeString();
    console.log('Task updated:', task);
  }
  res.redirect('/');
});

app.post('/delete-task', (req, res) => {
    const taskId = parseInt(req.body.taskId); // Convert taskId to an integer
    if (!isNaN(taskId) && taskId >= 0 && taskId < tasks.length) {
      tasks.splice(taskId, 1); // Remove the task at the specified index
      console.log('Task deleted:', taskId);
    }
    res.redirect('/');
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});