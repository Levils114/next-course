import React, { useState, useCallback, FormEvent } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import { Document } from 'prismic-javascript/types/documents';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';

interface ISearchProps{
	searchResults: Document[];
}

const Search: React.FC<ISearchProps>  = ({ searchResults }: ISearchProps) => {
	const router = useRouter();

	const [searchInput, setSearchInput] = useState('');

	const handleSearch = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		router.push(`/search?q=${encodeURIComponent(searchInput)}`);

		setSearchInput('');
	}, [searchInput]);

	console.log(searchInput);

	return(
		<div>
			<form onSubmit={handleSearch}>
				<input 
					value={searchInput} 
					onChange={(e) => setSearchInput(e.target.value)} 
					placeholder="pesquisa aí"
				/>

				<button type="submit">só bora</button>
			</form>

			{searchResults.length >= 1 && searchResults.map(result => (
				<Link href={`/catalog/products/${result.uid}`}>
					<a>
						<p>{result.data.title[0].text}</p>
					</a>
				</Link>
			))}
		</div>
	);
};

export const getServerSideProps: GetServerSideProps<ISearchProps> = async(context) => {
	const { q } = context.query;

	if(!q){
		return({
			props: { searchResults: [] }
		});
	}

	const searchResults = await client().query([
		Prismic.Predicates.at('document.type', 'product'),
		Prismic.Predicates.fulltext('my.product.title', String(q))
	]);

	return({
		props: {
			searchResults: searchResults.results
		}
	});
};

export default Search;