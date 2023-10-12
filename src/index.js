import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './components/HomePage';
import InvoiceForm from './components/InvoiceForm';
import { Provider } from 'react-redux';
import {store} from "./app/store";
import InvoiceUpdate from './components/InvoiceUpdate';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {path:'' , element:<HomePage/>},
      {path:'/CreateInvoice' , element:<InvoiceForm/>},
      {path:'/UpdateInvoice' , element:<InvoiceUpdate/>},
    ]
  }
])

ReactDOM.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();

