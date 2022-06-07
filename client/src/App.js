import { useEffect } from 'react';
function App() {
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/products');
			const json = await response.json();
			console.log(json);
		};
		fetchData();
	}, []);
	return (
		<section>
			<h1>Hello</h1>
		</section>
	);
}

export default App;
