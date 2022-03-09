import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  { counterSlice, decrement, increment } from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: counterSlice.reducer,
})

const render = () => ReactDOM.render(
  <React.StrictMode>
    <App
      value={store.getState().value}
      onIncrement={() => store.dispatch(increment())}
      onDecrement={() => store.dispatch(decrement())}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

render()
store.subscribe(render)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
