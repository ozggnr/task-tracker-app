import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import CalendarApp from './App';
import { store } from './store/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <CalendarApp />
        </Provider>
    </React.StrictMode>
);
