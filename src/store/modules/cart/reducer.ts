import { Reducer } from 'redux';
import { ICartState } from './types';
import produce from 'immer';

// initial state e preciso ser setado por que em primeiro momento de chamada do redux, ele sempre vem como vazio
const INITIAL_STATE: ICartState = {
	items: [],
	failedStockCheck: [],
};

//
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
	// esse return so esta aqui por que estamos usando o immer para constrola a escrita ta imutabilidade quando for retornar o state
	return produce(state, draft => {
		switch (action.type) {
			case 'ADD_PRODUCT_TO_CART_SUCCESS': {
				const { product } = action.payload;

				const productInCartIndex = draft.items.findIndex(
					item => item.product.id === product.id,
				);

				if (productInCartIndex >= 0) {
					draft.items[productInCartIndex].quantity++;
				} else {
					draft.items.push({
						product,
						quantity: 1,
					});
				}
				break;
			}
			case 'ADD_PRODUCT_TO_CART_FAILURE': {
				draft.failedStockCheck.push(action.payload.productId);
			}
			default: {
				return draft;
			}
		}
	});
};

export default cart;
