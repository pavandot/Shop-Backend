import { useEffect, useState } from 'react';
function App() {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/products');
			const json = await response.json();
			setProducts(json.products);
			console.log(json);
		};
		fetchData();
	}, []);
	return (
		<section>
			<h1>Hello</h1>
			{products && products.map((product) => <p>{product.name}</p>)}
		</section>
	);
}

export default App;
