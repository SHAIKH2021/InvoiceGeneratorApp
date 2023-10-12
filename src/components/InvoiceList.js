import { useDispatch, useSelector } from "react-redux";
import { removeInvoice } from "../features/InvoiceSlice";
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
const InvoiceList =()=>{
    const invoices=useSelector(state=>state.invoices);
    const dispatch = useDispatch();
    const clickHandler = (e) => {
      console.log('in list');
      console.log(e);
      console.log(e.text);
      localStorage.setItem('currency',e.text.currency);
      localStorage.setItem('dateOfIssue',e.text.dateOfIssue);
      localStorage.setItem('billTo',e.text.billTo);
      localStorage.setItem('billToEmail',e.text.billToEmail);
      localStorage.setItem('billToAddress',e.text.billToAddress);
      localStorage.setItem('billFrom',e.text.billFrom);
      localStorage.setItem('billFromEmail',e.text.billFromEmail);
      localStorage.setItem('billFromAddress',e.text.billFromAddress);
      localStorage.setItem('notes',e.text.notes);
      localStorage.setItem('total',e.text.total);
      localStorage.setItem('subTotal',e.text.subTotal);
      localStorage.setItem('taxRate',e.text.taxRate);
      localStorage.setItem('taxAmount',e.text.taxAmount);
      localStorage.setItem('discountRate',e.text.discountRate);
      localStorage.setItem('discountAmount',e.text.discountAmount);
      localStorage.setItem('itemsId',e.text.items.id);
      localStorage.setItem('itemsName',e.text.items.name);
      localStorage.setItem('itemsDescription',e.text.items.description);
      localStorage.setItem('itemsPrice',e.text.items.price);
      localStorage.setItem('itemsQuantity',e.text.items.quantity);
    }
    return (
        <>
        <ul className="list-none">
        { invoices && invoices.length > 0 ? 
          invoices.map((todo,index) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <div className='text-dark'>id: {index+1}</div>
            <div className='text-dark'>billFrom: {todo.text.billFrom}</div>
            <div className='text-dark'>billTo: {todo.text.billTo}</div>
            <div className='text-dark'>Total Price: {todo.text.total}</div>
            <Link to={'/UpdateInvoice'}>
            <Button onClick={clickHandler(todo)}  className="fw-bold ">
              Update
            </Button>
            </Link>
            <Button onClick={() => dispatch(removeInvoice(todo.id))} className="fw-bold" > Remove </Button>
          </li>)) 
          : <h3> Invoice list is empty</h3>
        }
      </ul>
        </>
    );
}
export default InvoiceList;