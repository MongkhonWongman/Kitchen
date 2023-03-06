export function FORMAT_BILL_ID (id1, id2) {

    let ID1_SHOW;
    let ID2_SHOW;

    if(id1.length === 1){
        ID1_SHOW = "00"+id1;
    }

    if(id1.length === 2){
        ID1_SHOW = "0"+id1;
    }
    
    if(id1.length === 3){
        ID1_SHOW = id1;
    }

    if(id2.length === 1){
        ID2_SHOW = "00000"+id2;
    }

    if(id2.length === 2){
        ID2_SHOW = "0000"+id2;
    }

    if(id2.length === 3){
        ID2_SHOW = "000"+id2;
    }

    if(id2.length === 4){
        ID2_SHOW = "00"+id2;
    }

    if(id2.length === 5){
        ID2_SHOW = "0"+id2;
    }

    if(id2.length === 6){
        ID2_SHOW = id2;
    }

    return {ID1 : id1, ID2 : id2, ID1_SHOW : ID1_SHOW, ID2_SHOW : ID2_SHOW}

}


export function DateConvert(str){
    var date = new Date(str),
                mnth = ("0" + (date.getMonth() + 1)).slice(-2),
                day = ("0" + date.getDate()).slice(-2);
    return [{
                show: [date.getFullYear(), mnth, day].join("-"), 
                server: [date.getFullYear(), mnth, day].join("")
            }];
}


export function PeriodConvert(e){
    
    let PeriodStart_server = '';
    let PeriodStart_show = '';

    let PeriodEnd_server = '';
    let PeriodEnd_show = '';

    if(e === 'All'){
        PeriodStart_server = '0000';
        PeriodEnd_server = '0000';

        PeriodStart_show = '00:00';
        PeriodEnd_show = '00:00';
    }

    if(e === 'Morning'){
        PeriodStart_server = '0600';
        PeriodEnd_server = '0959';

        PeriodStart_show = '06:00';
        PeriodEnd_show = '09:59';
    }

    if(e === 'Afternoon'){

        PeriodStart_server = '1000';
        PeriodEnd_server = '1559';

        PeriodStart_show = '10:00';
        PeriodEnd_show = '15:59';
    }

    if(e === 'Evening'){

        PeriodStart_server = '1600';
        PeriodEnd_server = '2000';

        PeriodStart_show = '16:00';
        PeriodEnd_show = '20:00';
    }

    return {
            PERIOD_START_SERVER : PeriodStart_server, 
            PERIOD_END_SERVER : PeriodEnd_server,

            PERIOD_START_SHOW : PeriodStart_show, 
            PERIOD_END_SHOW : PeriodEnd_show
        }
}