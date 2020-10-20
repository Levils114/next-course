import React from 'react';

import { GetStaticProps } from 'next';

interface IProducts{
	id: number;
	title: string;
}

interface ITop10{
	products: IProducts[];
}

const Top10: React.FC = ({ products }: ITop10) => {
	return(
		<>
		<h1>Top 10 products</h1>

		{products.map(product => (
			<p key={product.id}>{product.title}</p>
		))}
		</>
	);
};

export const getStaticProps: GetStaticProps<ITop10> = async(context) => {
	const response = await fetch('http://localhost:3333/products');
	const responseFormatted = await response.json();

	return({
		props: {
			products: responseFormatted
		},

		revaldate: 5
	});
};

export default Top10;