import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { Title } from './../styles/pages/Home';

interface IRecommendedProducts{
    id: number;
    title: string;
    price: number;
    category_id: string;
    slug: string;
}

interface IHome{
    recommendedProducts: IRecommendedProducts[];
}

export default function Home({ recommendedProducts }: IHome) {
    return (
    	<>
    	<Head>
    		<title>Next Course</title>
    	</Head>

        {recommendedProducts.map(product => (
            <div key={product.id}>
                <Title>{product.title}</Title>
                <Title>R$ {product.price}</Title>
            </div>
        ))}
        </>
    )
}

export const getServerSideProps: GetServerSideProps<IHome> = async () => {
    const response = await fetch('http://localhost:3333/recommended');
    const responseFormatted = await response.json();

    return({
        props: {
            recommendedProducts: responseFormatted
        }
    });
}
