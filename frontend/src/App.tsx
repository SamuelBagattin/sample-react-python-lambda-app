import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import {client} from "./api/api";


function App() {
	const [data, setData] = useState({state: "nodata", data: undefined});

	return (
		<div className="App">
			<main className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<p>
					<button onClick={() => {
						setData({state: "loading", data : undefined})
						console.log(data)
						client.get("/").then(
							e => setData({state: "finished", data: e.data})
						);
					}}>
						Click me !
					</button>

					<DisplayData data={data.data} state={data.state}/>
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</main>

		</div>
	);


}

export default App;

const DisplayData = ({state, data}: { state: string, data: any }) => {
	console.log(state)
	switch (state) {
		case "finished":
			return <div>{data}</div>
		case "loading":
			return <div>Loading...</div>
		case "nodata":
			return <div>No data loaded !</div>
		default:
			return <div>Err</div>

	}
}
