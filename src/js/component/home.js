import React, { useEffect } from "react";
import shortid from "shortid";

//fetch para crear mi user

export function Home() {
	const [tarea, setTarea] = React.useState(""); //useState actualiza las tareas que vamos ingresando
	const [arrayTareas, setArrayTareas] = React.useState([]); //useState agrega las tareas que ingresamos por medio del input al arrayTareas y la actualiza con el setTareas
	const agregarTarea = e => {
		//el form llama esta funcion para agregar la tarea al array
		e.preventDefault(); //evita que el form mande todo sin confirmacion
		setArrayTareas([
			//el array de las tareas
			...arrayTareas, //va guardando las tarea de forma que apenas se ingresa una la otra pasa a estar debajo

			{
				id: shortid.generate(), //se usa npm shortid para generar un id aleatorio con el metodo generate()
				nombreTarea: tarea
			}
		]);
		setTarea(""); //poniendo esto afuera hace que se reinicia el input luego de ingresar algo y se ve mas bonito
	};

	const borrarArray = id => {
		for (let i = 0; i < arrayTareas.length; i++) {
			//recorre el arrayTareas para encontrar la tarea con el id que estamos buscando
			if (arrayTareas[i].id === id) {
				//chequea que la tarea tenga el mismo id
				arrayTareas.splice(i, 1); //el metodo splice() elimina elementos de un array recibiendo como parametros el index del elemento que quiero eliminar y la cantidad de elementos que quiero eliminar

				setArrayTareas([...arrayTareas]);
			}
		}
	};

	const url = "https://assets.breatheco.de/apis/fake/todos/user/daemonium";
	fetch(url)
		.then(res => res.json())
		.then(data => {
			setArrayTareas(data);
		});

	//aqui abajo hay un map que me devuelve los items o tareas ingresadas acomodadas de forma vertical bien bonito
	//el map tambien recorre el arrayTareas y le pasamos el index por medio de item, luego con un punto le agregamos el id que queremos encontrar en ese elemento
	//el boton contiene una funcion flecha que se encarga de llamar a la funcion borrar y por medio de item.id la identifica y la elimina del array
	return (
		<div className="container ">
			<h1 className="text-center ">ToDoList</h1>
			<div className="row">
				<div className="col-12 justify-content-center ">
					<form onSubmit={agregarTarea} className="form1">
						<input
							type="text"
							className="form-control mb-2 rounded border border-dark"
							placeholder="Do Something.."
							onChange={e => setTarea(e.target.value)}
							value={tarea}></input>
					</form>
					<ul className="list-group">
						{arrayTareas.map(item => (
							<li className="list-group-item" key={item.id}>
								<span className="lead">{item.label}</span>
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
