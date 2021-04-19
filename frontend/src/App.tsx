import './App.scss';
import {useState} from "react";
import {getTodos, postTodo, TodoResponse} from "./api/api";
import {RequestState} from "./api/request-state";


function App() {
	const [dataFromApi, setDataFromApi] = useState<{state: RequestState, data: TodoResponse[]}>({state: RequestState.NoData, data: []});
	const [dataFromInput, setDataFromInput] = useState("");

	const refreshData = () => {
		setDataFromApi({state: RequestState.Loading, data: []})
		getTodos().then(
			e => setDataFromApi({state: RequestState.Finished, data: e.data})
		);
	}

	return (
		<div className="App">
			<main className="App-main">
				<form onSubmit={(i) => {
					i.preventDefault()
					postTodo({name: dataFromInput}).then(() => refreshData())
				}}>
					<label>
						Name:
						<input type="text" name="name" onChange={(i) => setDataFromInput(i.target.value)}/>
					</label>
					<input type="submit" value="Submit"/>
				</form>
					<button onClick={refreshData}>
						Click me !
					</button>
					<DisplayData data={dataFromApi.data} state={dataFromApi.state}/>
			</main>

		</div>
	);


}

export default App;

const DisplayData = ({state, data}: { state: RequestState, data: TodoResponse[] }) => {
	switch (state) {
		case RequestState.Finished:
			return <div>
				<ul>
					{data.map(e => (<li>{e.name}</li>))}
				</ul>
			</div>
		case RequestState.Loading:
			return <div className="lds-ellipsis">
				<div/>
				<div/>
				<div/>
				<div/>
			</div>
		case RequestState.NoData:
			return <div>No data loaded !</div>
		default:
			return <div>Err</div>

	}
}
