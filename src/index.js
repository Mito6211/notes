import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

// Remember to remove <React.StrictMode> in production
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);