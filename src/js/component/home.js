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
	const borrarArray = id => {
		for (let i = 0; i < arrayTareas.length; i++) {
			if (arrayTareas[i].id === id) {
				arrayTareas.splice(i, 1);
				//console.log(arrayTareas);
				setArrayTareas([...arrayTareas]);
			}
		}
	};

	return (
		<div className="container">
			<h1 className="text-center">ToDoList</h1>
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
								<button
									type="button"
									className="ml-2 mb-1 close"
									data-dismiss="toast"
									aria-label="Close"
									onClick={() => {
										borrarArray(item.id);
									}}>
									<i className="fas fa-skull"></i>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
