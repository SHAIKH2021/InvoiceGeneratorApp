import React from "react";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import InvoiceList from "./InvoiceList";
const HomePage = (props) => {
        const navigate = useNavigate();
        const clickHandler = () => {
            navigate('/CreateInvoice', {replace: true});
        }
        
      return (
        <>
         <h1 className="text-center mb-4">List of Invoice</h1>
         <InvoiceList/>
         <Button onClick={clickHandler} variant="primary" type="submit" className="d-block w-100">Create New Invoice</Button>
        </>
      );
}

export default HomePage; 