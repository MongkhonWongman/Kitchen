import { GET_HOSPITAL_DETAIL } from "../../Config/Hospital-config";

let HOSPITAL_NAME = GET_HOSPITAL_DETAIL.HOSPITAL_NAME;
let HOSPITAL_LOGO = GET_HOSPITAL_DETAIL.HOSPITAL_LOGO;
let GET_DATA_PATH = GET_HOSPITAL_DETAIL.GET_DATA_PATH;

export let FOOD_PHOTO_PATH = GET_HOSPITAL_DETAIL.FOOD_PHOTO_PATH;
export let DEV_MORD = GET_HOSPITAL_DETAIL.DEV_MORD;
export let DATA_MOCK = 'OFF'; // HOW TO ON, OFF

export let INDEX_PAGE = '/Kitchen';
export let HOME_PAGE_LOCAL = '/Kitchen/Process';


export let LOGIN = {
    GET_LOGIN : `${GET_DATA_PATH}/Login/Login.php`,
}

export  let ORDER_LIST = {
    BILL_ID : `${GET_DATA_PATH}/Order-list/Bill-id.php`,
    COUNT_ORDER : `${GET_DATA_PATH}/Order-list/Count-order-by-bill.php`,
    BILL_DETAIL : `${GET_DATA_PATH}/Order-list/Bill-detail.php`,
    UPDATE_ORDER_STATUS : `${GET_DATA_PATH}/Order-list/Update-order-status.php`,
    AMOUNT_BILL_ING : `${GET_DATA_PATH}/Order-list/Bill-amount-inf.php`
};

export let REPORT = {
    BILL_LIST : `${GET_DATA_PATH}/Report/Bill-id.php`,
    BILL_DETAIL : `${GET_DATA_PATH}/Report/Bill-detail.php`,
}