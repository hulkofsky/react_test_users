import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import { Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers'

const store = createStore(reducer, applyMiddleware(thunk));


fetch('./db.json').then(res => res.json()).then(res => {
    store.dispatch({ type: "RECEIVE_USERS", payload: res.users});
})

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
