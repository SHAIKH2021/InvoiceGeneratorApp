import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState={
    invoices:[]
}

export const invoiceSlice = createSlice({
    name:'invoicelist',
    initialState,
    reducers:{
        addInvoice:(state,action)=>{
            const invoice={
                id:nanoid(),
                text:action.payload,
            }
            console.log(action.payload)
            state.invoices.push(invoice)
        },
        removeInvoice:(state,action)=>{
            state.invoices=state.invoices.filter((invoice)=>(
                invoice.id!==action.payload
            ))
        },
    }
})

export const {addInvoice,removeInvoice}=invoiceSlice.actions;

export default invoiceSlice.reducer;