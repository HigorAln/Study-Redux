import { useCallback } from 'react';
import { addProductToCartRequest } from '../store/modules/cart/actions';
import { IProduct } from '../store/modules/cart/types';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../store';

interface ICatalogItem {
	product: IProduct;
}

function CatalogItem({ product }: ICatalogItem) {
	const dispatch = useDispatch();

	const hasFailedStockCheck = useSelector<IState, boolean>(state => {
		return state.cart.failedStockCheck.includes(product.id);
	});

	const handleAddProductToCart = useCallback(() => {
		dispatch(addProductToCartRequest(product));
	}, [dispatch]);

	return (
		<article key={product.id}>
			<strong>{product.title}</strong> {' - '}
			<span>{product.price}</span>{' '}
			<button type="button" onClick={handleAddProductToCart}>
				Comprar
			</button>
			{hasFailedStockCheck && (
				<span style={{ color: 'red' }}>Falta de stock</span>
			)}
		</article>
	);
}

export default CatalogItem;
