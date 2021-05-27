import React from 'react';
import ReactDOM from 'react-dom';
import { Connect } from './containers';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { ApolloProvider } from '@apollo/client';
import client from './api';
ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Connect />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
