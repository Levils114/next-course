import React, { useCallback } from 'react';

import Prismic from 'prismic-javascript';
import { Document } from 'prismic-javascript/types/documents';

import { client } from './../lib/prismic';

import SEO from '@/components/SEO';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

import { Title } from './../styles/pages/Home';

interface IRecommendedProducts{
    id: number;
    title: string;
    price: number;
    category_id: string;
    slug: string;
}

interface IHome{
    recommendedProducts: Document[];
}

export default function Home({ recommendedProducts }: IHome) {
    const handleSum = useCallback(async() => {
        const math = (await import('./../lib/math')).default;

        alert(math.sum(3,2));
    }, []);

    return (
    	<>
        <SEO 
            title="eaeman" 
            description="the best site forever (I think kkk)"
            image="https://cdn.discordapp.com/avatars/325362346761519117/6c847bca7f4dcb16c4005788962622ae.png?size=512"
        />

        {recommendedProducts.map(product => (
            <div key={product.id}>
                <Link href={`/catalog/products/${product.uid}`}>
                    <a>
                        <Title>{product.data.title[0].text}</Title>
                    </a>
                </Link>
                <Title>R$ {product.data.price}</Title>
            </div>
        ))}

        <button onClick={handleSum}>Soma</button>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<IHome> = async () => {
    const recommendedProducts = await client().query([
        Prismic.Predicates.at('document.type', 'product')
    ]);

    return({
        props: {
            recommendedProducts: recommendedProducts.results
        }
    });
}
