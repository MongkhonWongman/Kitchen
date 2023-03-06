import {HOME_PAGE_LOCAL, ORDER_LIST} from '../../Components/API/API';
import axios from 'axios';

import ICON_C from '../../img/Food-status-icon/Recieved Order-01.png';
import ICON_P from '../../img/Food-status-icon/Cook-01-01.png';
import ICON_F from '../../img/Food-status-icon/Serving-01-01.png';
import ICON_D from '../../img/Food-status-icon/AdobeStock_357524025 01 Artboard 4.png';
import ICON_SC from '../../img/Food-status-icon/Group 206@3x.png';
import ICON_R from '../../img/Food-status-icon/Group 205@3x.png';

export let KITCHEN = [
    {
        "KITCHEN_COD" : 'K001',
        "KITCHEN_KEY" : 'C',
        "KITCHEN_NAME" : ''
    },
    {
        "KITCHEN_COD" : 'K002',
        "KITCHEN_KEY" : 'C',
        "KITCHEN_NAME" : ''
    },
    {
        "KITCHEN_COD" : 'K003',
        "KITCHEN_KEY" : 'C',
        "KITCHEN_NAME" : ''
    }
];

export let MENU = [
    {   
        "Page_key" : 'C',
        "To_page": `${HOME_PAGE_LOCAL}/Status-Call`,
        "Path_name" : 'call',
        "BILL_ID_LIST" : '',
        "Icon" : ICON_C,
        "Tiele":"รับออเดอร์"
    },
    {   
        "Page_key" : 'P',
        "To_page": `${HOME_PAGE_LOCAL}/Status-Process`,
        "Path_name" : 'process',
        "Icon" : ICON_P,
        "Tiele":"กำลังปรุง"
    },
    {   
        "Page_key" : 'F',
        "To_page": `${HOME_PAGE_LOCAL}/Status-Completed`,
        "Path_name" : 'completed',
        "Icon" : ICON_F,
        "Tiele":"ปรุงเสร็จ"
    },
    {   
        "Page_key" : 'D',
        "To_page": `${HOME_PAGE_LOCAL}/Status-Delivery`,
        "Path_name" : 'Delivery',
        "Icon" : ICON_D,
        "Tiele":"จัดส่ง"
    },
    {   
        "Page_key" : 'SC',
        "To_page": `${HOME_PAGE_LOCAL}/Scan`,
        "Path_name" : 'Call',
        "Icon" : ICON_SC,
        "Tiele":"SCAN"
    },
    {   
        "Page_key" : 'R',
        "To_page": `${HOME_PAGE_LOCAL}/Report`,
        "Path_name" : 'Call',
        "Icon" : ICON_R,
        "Tiele":"Report"
    },
];