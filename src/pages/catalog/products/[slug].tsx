import React from 'react';

import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';

import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';

interface IProducts{
	product: Document;
}

const Product: React.FC<IProducts> = ({ product }: IProducts) => {
	const router = useRouter();

	if(router.isFallback){
		return (<p>Loading</p>);
	}

	return(
		<div>
			<h1>O produto é {product.data.title[0].text}</h1>

			<img src={product.data.thubnail.list.url} width="300" alt={product.data.title[0].text}/>
			<p>R$ {product.data.price}</p>

			{product.data.description.map(descriptionFinded => (
				<h4>{descriptionFinded.text}</h4>
			))}
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return({
		paths: [],
		fallback: true
	});
};


export const getStaticProps: GetStaticProps<IProducts> = async(context) => {
	const { slug } = context.params;

	const product = await client().getByUID('product', String(slug), {});

	console.log(product);

	return({
		props: {
			product
		},
		revalidate: 5
	});
};

export default Product;