import React from 'react';

import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

interface IProducts{
	id: number;
	title: string;
}

interface ICategories{
	products: IProducts[];
}

const Categories: React.FC<ICategories> = ({ products }: ICategories) => {
	const router = useRouter();

	return(
		<div>
			{router.isFallback ? (
				<div>
					<p>Loading...</p>
				</div>
			) : (
				<>
					<h1>O produto é {router.query.slug}</h1>

					{products.map(product => (
						<p key={product.id}>{product.title}</p>
					))}
				</>
			)}
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async() => {
	const response = await fetch('http://localhost:3333/categories');
	const responseFormatted = await response.json();

	const paths = responseFormatted.map(response => {
		return({
			params: {
				slug: response.id
			}
		})
	});

	return({
		paths,
		fallback: true
	});
};

export const getStaticProps: GetStaticProps<ICategories> = async(context) => {
	const { slug } = context.params;

	const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
	const responseFormatted = await response.json();

	return({
		props: {
			products: responseFormatted
		},
		revalidate: 60
	});
};

export default Categories;