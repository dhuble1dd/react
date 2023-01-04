import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import App1 from './App1'
import App2 from './App2'

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


const loader = ({params})=>{

    return params?.page;

}


const router = createBrowserRouter([
{
    path: "/:page",
    element:  <App/>,
    loader
},

]);
  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);


 
