import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    PAGE_KEY : '',
    USER_KITCHEN : '',
    KITCHEN_COD : [],
    KITCHEN_NAME : [],

    BILL_QTY : 0,
    BILL_LIST : [],
    BILL_DETAIL : [],
    AMOUNT_BILL_INF : [],

    BILL_LIST_PRINT : [],
    BILL_DETAIL_PRINT : []
}


export const counterSlice = createSlice(
    {
        name: 'PageDetail',
        initialState,
        reducers: {

            PageKey : (state, actions) => {
                state.PAGE_KEY = actions.payload.PAGE_KEY;
            },
            KitchenCod : (state, actions) => {
                state.KITCHEN_COD = actions.payload.KITCHEN_COD;
                state.KITCHEN_NAME = actions.payload.KITCHEN_NAME;
            },
            UserKitchen : (state, actions) => {
                state.USER_KITCHEN = actions.payload.USER_KITCHEN;
            },
            Count_order_by_bill : (state, actions) => {
                state.BILL_QTY = actions.payload.BILL_QTY;
            },

            Amount_bill_inf : (state, actions) => {
                state.AMOUNT_BILL_INF = actions.payload.AMOUNT_BILL_INF;
            },


            Bill_list : (state, actions) => {
                state.BILL_LIST = actions.payload.BILL_ID_LIST;
            },
            Bill_detail : (state, actions) => {
                state.BILL_DETAIL = actions.payload.BILL_DETAIL;
            },


            Bill_list_pritnt : (state, actions) => {
                state.BILL_LIST_PRINT = actions.payload.BILL_LIST_PRINT;
            },
            Bill_detail_pritnt : (state, actions) => {
                state.BILL_DETAIL_PRINT = actions.payload.BILL_DETAIL_PRINT;
            }

        },
    }
)

export const { 
                PageKey,
                UserKitchen,
                KitchenCod,
                Amount_bill_inf,

                Count_order_by_bill,
                Bill_list, 
                Bill_detail,

                Bill_list_pritnt,
                Bill_detail_pritnt
            } = counterSlice.actions;

export default counterSlice.reducer;