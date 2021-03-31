import { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import About from './components/About';

function App() {
	const [showAddTask, setShowAddTask] = useState(false);

	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			const tasksFromServer = await fetchTasks();
			setTasks(tasksFromServer);
		};

		getTasks();
	}, []);

	const fetchTask = async (id) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`);
		const data = await res.json();

		return data;
	};

	const fetchTasks = async () => {
		const res = await fetch('http://localhost:5000/tasks');
		const data = await res.json();
		return data;
	};

	const addTask = async (task) => {
		const res = await fetch('http://localhost:5000/tasks', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(task),
		});

		const data = await res.json();

		setTasks([...tasks, data]);

		// const id = Math.floor(Math.random() * 1000) + 1;
		// const newTask = { id, ...task };
		// setTasks([...tasks, newTask]);
	};

	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'DELETE',
		});

		setTasks(tasks.filter((task) => task.id !== id));
	};

	const toggleReminder = async (id) => {
		const taskToToggle = await fetchTask(id);
		const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(updateTask),
		});

		const data = await res.json();

		setTasks(
			tasks.map((task) =>
				task.id === id ? { ...task, reminder: data.reminder } : task
			)
		);
	};

	return (
		<BrowserRouter>
			<div className="container">
				<Header
					title="Task Tracker"
					onAdd={() => setShowAddTask(!showAddTask)}
					showAddTask={showAddTask}
				/>

				<Route
					path="/"
					exact
					render={(props) => (
						<>
							{showAddTask && <AddTask onAdd={addTask} />}
							{tasks.length > 0 ? (
								<Tasks
									tasks={tasks}
									onDelete={deleteTask}
									onToggle={toggleReminder}
								/>
							) : (
								'No Tasks To Show'
							)}
							<Footer />
						</>
					)}
				/>
				<Route path="/about" component={About} />
			</div>
		</BrowserRouter>
	);
}

export default App;
