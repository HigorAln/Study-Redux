import { useSelector } from 'react-redux';
import { IState } from '../store';
import { ICartItem } from '../store/modules/cart/types';

function Cart() {
	// useSelector e usado para ter acesso ao estado do redux. podendo passar como tipagem generica primeiro o tipo geral do stado e em segundo oque vai retornar na sua chamada
	const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

	return (
		<table>
			<thead>
				<tr>
					<th>Produto</th>
					<th>preco</th>
					<th>Quantidade</th>
					<th>Subtotal</th>
				</tr>
			</thead>
			<tbody>
				{cart.map(item => (
					<tr key={item.product.id}>
						<td>{item.product.title}</td>
						<td>{item.product.price}</td>
						<td>{item.quantity}</td>
						<td>{(item.product.price * item.quantity).toFixed(2)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default Cart;
