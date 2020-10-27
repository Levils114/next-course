import React from 'react';

import Prismic from 'prismic-javascript';
import Link from 'next/link';

import { client } from '@/lib/prismic';

import { Document } from 'prismic-javascript/types/documents';

import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

interface ICategories{
	category: Document;
	products: Document[];
}

const Categories: React.FC<ICategories> = ({ category, products }: ICategories) => {
	const router = useRouter();

	return(
		<div>
			{router.isFallback ? (
				<div>
					<p>Loading...</p>
				</div>
			) : (
				<>
					<h1>A categoria é {category.data.title[0].text}</h1>

					{products.map(product => (
						<Link href={`/catalog/products/${product.uid}`}>
							<a>
								<p key={product.id}>{product.data.title[0].text}</p>
							</a>
						</Link>
					))}
				</>
			)}
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async() => {
	const categories = await client().query([
		Prismic.Predicates.at('document.type', 'category')
	]);

	const paths = categories.results.map(response => {
		return({
			params: {
				slug: response.uid
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

	const category = await client().getByUID('category', String(slug), {});

	const products = await client().query([
		Prismic.Predicates.at('document.type', 'product'),
		Prismic.Predicates.at('my.product.category', category.id)
	]);

	return({
		props: {
			category,
			products: products.results
		},
		revalidate: 60
	});
};

export default Categories;