import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './routes/Home';
import store from './store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home/>} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
