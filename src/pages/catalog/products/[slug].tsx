import React, { useCallback, useState } from 'react';

import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const AddToCardModal = dynamic(
	() => import('@/components/AddToCardModal'), 
	{
		loading: () => (<p>loading...</p>),
		ssr: false
	}
);

const Product: React.FC = () => {
	const router = useRouter();

	const [showModalAddToCard, setShowModalAddToCard] = useState(false);

	const handleAddToCard = useCallback(() => {
		setShowModalAddToCard(true);
	}, []);

	return(
		<div>
			<h1>O produto é {router.query.slug}</h1>

			<button onClick={handleAddToCard}>Add to card</button>

			{!!showModalAddToCard && (
				<AddToCardModal />
			)}
		</div>
	);
}

export default Product;