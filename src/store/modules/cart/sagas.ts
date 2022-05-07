import { AxiosResponse } from 'axios';
import { all, call, select, takeLatest, put } from 'redux-saga/effects';
import { IState } from '../..';
import api from '../../../services/api';
import {
	addProductToCartRequest,
	addProductToCartSuccess,
	addProductToCartFailure,
} from './actions';

/*
  takeLatest => se a acao ainda nao finalizou, ele cancela as anteriores e pega somente a ultima
      caso o usuario click varias vezes ele cancela as outras e pega somente a ultima
  
  takeLeading => ao contrario da takeLatest ele pega somente a primeira e discarta as outras... ele espera
      ela terminar

  takeEvery => se clickar 5 vezes, ele manda as 5 vezes
*/

type CheckProductsStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
	id: number;
	quantity: number;
}

function* checkProductStock({ payload }: CheckProductsStockRequest) {
	const { product } = payload;

	const currentQuantity: number = yield select((state: IState) => {
		return (
			state.cart.items.find(item => item.product.id === product.id)?.quantity ??
			0
		);
	});
	// Para realizar uma chamada asyncrona dentro dessa funcao generica
	// e necessario usar a funcao `call` do proprio saga
	const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
		api.get,
		`stock/${product.id}`,
	);

	// verificando se existe stoque
	if (availableStockResponse.data.quantity > currentQuantity) {
		yield put(addProductToCartSuccess(product));
	} else {
		yield put(addProductToCartFailure(product.id));
	}
}

// determinando qual funcao vai ser chamada a partir da action ser ativa
export default all([
	takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock),
]);
