import { Link, useLocation, useRouteError} from "react-router-dom";

import ERROR_404 from '../../img/error-404.jpg';
import './Style/Style.css';


export default function ErrorPage() {

  const { pathname, search, state } = useLocation();

  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <div> 

        <div className="BOX-ICON">
          <img src={ERROR_404} className="ICON-ERROR"/>
        </div>  

        <div className="ERROR-DETAIL">
          <p>ขออภัย เกิดข้อผิดพลาดที่ไม่คาดคิด</p>
          {/* <p>Sorry, an unexpected error has occurred.</p> */}
          {/* <i>{error.statusText || error.message}</i> */}
        </div>
        <Link to={`/Home${search}`} type="button" className="btn btn-secondary">กลับ</Link>
      </div>
    </div>
  );
}