import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { addInvoice } from '../features/InvoiceSlice';

function InvoiceUpdate() {

  const invoices = useSelector(state=>state.invoices);
   console.log('in form');
   console.log(invoices);

  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState('$');
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState('');
  const [billTo, setBillTo] = useState('');
  const [billToEmail, setBillToEmail] = useState('');
  const [billToAddress, setBillToAddress] = useState('');
  const [billFrom, setBillFrom] = useState('');
  const [billFromEmail, setBillFromEmail] = useState('');
  const [billFromAddress, setBillFromAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [total, setTotal] = useState('0.00');
  const [subTotal, setSubTotal] = useState('0.00');
  const [taxRate, setTaxRate] = useState('');
  const [taxAmount, setTaxAmount] = useState('0.00');
  const [discountRate, setDiscountRate] = useState('');
  const [discountAmount, setDiscountAmount] = useState('0.00');
  const [items, setItems] = useState([
    {
      id: 0,
      name: '',
      description: '',
      price: '1.00',
      quantity: 1
    }
  ]);

  useEffect(() => {
    handleCalculateTotal();
  },[]);
  useEffect(()=>{
    setCurrency(localStorage.getItem('currency'))
    setDateOfIssue(localStorage.getItem('dateOfIssue'))
    setBillTo(localStorage.getItem('billTo'))
    setBillToEmail(localStorage.getItem('billToEmail'))
    setBillToAddress(localStorage.getItem('billToAddress'))
    setBillFrom(localStorage.getItem('billFrom'))
    setBillFromEmail(localStorage.getItem('billFromEmail'))
    setBillFromAddress(localStorage.getItem('billFromAddress'))
    setNotes(localStorage.getItem('notes'))
    setTotal(localStorage.getItem('total'))
    setSubTotal(localStorage.getItem('subTotal'))
    setTaxRate(localStorage.getItem('taxRate'))
    setTaxAmount(localStorage.getItem('taxAmount'))
    setDiscountRate(localStorage.getItem('discountRate'))
    setDiscountAmount(localStorage.getItem('discountAmount'))
    setNotes(localStorage.getItem('itemsId'))
    setNotes(localStorage.getItem('itemName'))
    setNotes(localStorage.getItem('itemsDescription'))
    setNotes(localStorage.getItem('itemPrice'))
    setNotes(localStorage.getItem('itemsQuantity'))
  },[]);
  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1
    };
    setItems([...items, newItem]);
  };

  const handleCalculateTotal = () => {
    let subTotal = 0;

    items.forEach((item) => {
      subTotal += parseFloat((parseFloat(item.price) * parseInt(item.quantity)).toFixed(2));
    });

    setSubTotal(subTotal.toFixed(2));
    setTaxAmount((subTotal * (taxRate / 100)).toFixed(2));
    setDiscountAmount((subTotal * (discountRate / 100)).toFixed(2));
    setTotal((subTotal - discountAmount + parseFloat(taxAmount)).toFixed(2));
  };

  const onItemizedItemEdit = (event) => {
    const { id, name, value } = event.target;
    const updatedItems = items.map((item) => {
      if (item.id == id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const editField = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'currency':
        setCurrency(value);
        break;
      case 'dateOfIssue':
        setDateOfIssue(value);
        break;
      case 'invoiceNumber':
        setInvoiceNumber(value);
        break;
      case 'billTo':
        setBillTo(value);
        break;
      case 'billToEmail':
        setBillToEmail(value);
        break;
      case 'billToAddress':
        setBillToAddress(value);
        break;
      case 'billFrom':
        setBillFrom(value);
        break;
      case 'billFromEmail':
        setBillFromEmail(value);
        break;
      case 'billFromAddress':
        setBillFromAddress(value);
        break;
      case 'notes':
        setNotes(value);
        break;
      case 'taxRate':
        setTaxRate(value);
        break;
      case 'discountRate':
        setDiscountRate(value);
        break;
      default:
        break;
    }
    handleCalculateTotal();
  };

  const onCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.currency);
  };
  const dispatch = useDispatch();
  const openModal = (event) => {
    event.preventDefault();
    dispatch(addInvoice(
                {
                "currency":currency,
                "dateOfIssue":dateOfIssue,  
                "billTo":billTo,
                "billToEmail":billToEmail,
                "billToAddress": billToAddress,
                "billFrom":billFrom,
                "billFromEmail":billFromEmail,
                "billFromAddress":billFromAddress,
                "notes":notes,
                "total":total,
                "subTotal":subTotal,
                "taxRate":taxRate,
                "taxAmount":taxAmount,
                "discountRate":discountRate,
                "discountAmount":discountAmount,
                "items":items
              }
    ));
    handleCalculateTotal();
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCurrency('$');
    setDateOfIssue('');
    setBillTo('');
    setBillToEmail('');
    setBillToAddress('');
    setBillFrom('');
    setBillFromEmail('');
    setBillFromAddress('');
    setNotes('');
    setTotal('0.00');
    setSubTotal('0.00');
    setTaxRate('');
    setTaxAmount('0.00');
    setDiscountRate('');
    setDiscountAmount('0.00');
    setItems([
      {
        id: 0,
        name: '',
        description: '',
        price: '1.00',
        quantity: 1
      }
    ]);
  };
  const navigate = useNavigate();
  const clickHandler = () => {
          navigate('/', {replace: true});
    } 
  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current Date: </span>
                    <span className="current-date">{currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={(event) => editField(event)}
                    style={{ maxWidth: '150px' }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice Number:</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={(event) => editField(event)}
                  min="1"
                  style={{ maxWidth: '70px' }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder="Who is this invoice to?"
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Email address"
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder="Billing address"
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder="Who is this invoice from?"
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder="Email address"
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder="Billing address"
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-start justify-content-between" style={{ fontSize: '1.125rem' }}>
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={notes}
              onChange={(event) => editField(event)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">
              Review Invoice update
            </Button>
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                isOpen,
                currency,
                currentDate,
                invoiceNumber,
                dateOfIssue,
                billTo,
                billToEmail,
                billToAddress,
                billFrom,
                billFromEmail,
                billFromAddress,
                notes,
                total,
                subTotal,
                taxRate,
                taxAmount,
                discountRate,
                discountAmount,
                items
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
              total={total}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) => onCurrencyChange({ currency: event.target.value })}
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Singapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={(event) => editField(event)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={(event) => editField(event)}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">%</InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>

      <Button onClick={clickHandler} className="mb-2 
      fw-bold">Back to home</Button>
    </Form>
  );
}

export default InvoiceUpdate;