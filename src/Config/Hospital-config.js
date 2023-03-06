// import RAM_LOGO from '../img/Icon-hospital/RAM/RAM-LOGO3.png';
// import CMR_LOGO from '../img/Icon-hospital/CMR/CMR-LOGO3.png';

let RAM_LOGO = '';
let CMR_LOGO = '';

// HOSPITAL NAME
let RAM = 'RAM';
let RAM_STT = false;

let CMR = 'CMR';
let CMR_STT = false;

let TTH = 'TTH';
let TTH_STT = false;

let HOSPITAL_NAME = RAM; // แก้ไขเมื่อเปลี่ยน รพ. <<<
let DEV_MORD = 'ON'; // HOW TO KEY ON, OFF


let GET_DATA_PATH = '';
let FOOD_PHOTO_PATH = '';
let HOSPITAL_LOGO = '';

if(DEV_MORD === 'ON'){

    //------------------------------------//
    //            FOR DEV MORD            //
    //------------------------------------//
    if(HOSPITAL_NAME === 'RAM'){

        RAM_STT = true;
        HOSPITAL_LOGO = RAM_LOGO;

    }

    if(HOSPITAL_NAME === 'CMR'){

        CMR_STT = true;
        HOSPITAL_LOGO = CMR_LOGO;
 
    }

    GET_DATA_PATH = 'http://localhost/Patientin-room/Kitchen/src/Database';
    FOOD_PHOTO_PATH = 'http://43.133.96.67/Patientin-room/Database/Food-photo';

}else{

    //------------------------------------//
    //           FOR PRODUCTION           //
    //------------------------------------//
    if(HOSPITAL_NAME === 'RAM'){

        RAM_STT = true;
        HOSPITAL_LOGO = RAM_LOGO;
        GET_DATA_PATH = 'http://43.133.96.67/Patientin-room/Database/Query';
        FOOD_PHOTO_PATH = 'http://43.133.96.67/Patientin-room/Database/Food-photo';

    }

    
    if(HOSPITAL_NAME === 'CMR'){

        CMR_STT = true;
        HOSPITAL_LOGO = CMR_LOGO;
        GET_DATA_PATH = 'http://localhost/New-patientin-room/Patientin-room/my-app/src/Database/Query';
        FOOD_PHOTO_PATH = 'http://localhost/New-patientin-room/Patientin-room/my-app/src/Database/Food-photo';

    }

}

export let HOSPITAL_STT = {
    RAM_STT : RAM_STT,
    CMR_STT : CMR_STT,
    TTH : TTH_STT
} 

export let GET_HOSPITAL_DETAIL = {
    HOSPITAL_NAME : HOSPITAL_NAME,
    DEV_MORD : DEV_MORD,
    HOSPITAL_LOGO : HOSPITAL_LOGO,
    FOOD_PHOTO_PATH : FOOD_PHOTO_PATH,
    GET_DATA_PATH : GET_DATA_PATH
};