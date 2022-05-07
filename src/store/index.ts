import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import rootReducer from './modules/rootReducer';
import { ICartState } from './modules/cart/types';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './modules/rootSaga';

export interface IState {
	cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
