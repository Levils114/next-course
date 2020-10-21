import React, { useCallback } from 'react';

import SEO from '@/components/SEO';

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
                <Title>{product.title}</Title>
                <Title>R$ {product.price}</Title>
            </div>
        ))}

        <button onClick={handleSum}>Soma</button>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<IHome> = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recommended`);
    const responseFormatted = await response.json();

    return({
        props: {
            recommendedProducts: responseFormatted
        }
    });
}
