import React from "react";
import shortid from "shortid";

//create your first component
export function Home() {
	const [tarea, setTarea] = React.useState("");
	const [arrayTareas, setArrayTareas] = React.useState([]);
	const agregarTarea = e => {
		e.preventDefault();
		console.log(tarea);
		setArrayTareas([
			...arrayTareas,
			{
				id: shortid.generate(),
				nombreTarea: tarea
			}
		]);
		setTarea("");
	};

	return (
		<div className="container">
			<h1 className="text-center fs-2">ToDoList</h1>
			<div className="row">
				<div className="col-12 justify-content-center">
					<form onSubmit={agregarTarea}>
						<input
							type="text"
							className="form-control mb-2"
							placeholder="Do Something.."
							onChange={e => setTarea(e.target.value)}
							value={tarea}></input>
					</form>
					<ul className="list-group">
						{arrayTareas.map(item => (
							<li className="list-group-item" key={item.id}>
								<span className="lead">{item.nombreTarea}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
