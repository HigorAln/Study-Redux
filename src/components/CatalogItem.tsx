import React, { useCallback } from 'react';
import { addProductToCart } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';
import { useDispatch, useSelector } from 'react-redux';

interface ICatalogItem {
	product: IProduct;
}

function CatalogItem({ product }: ICatalogItem) {
	const dispatch = useDispatch();

	const handleAddProductToCart = useCallback(() => {
		dispatch(addProductToCart(product));
	}, [dispatch]);

	return (
		<article key={product.id}>
			<strong>{product.title}</strong> {' - '}
			<span>{product.price}</span>{' '}
			<button type="button" onClick={handleAddProductToCart}>
				Comprar
			</button>
		</article>
	);
}

export default CatalogItem;
