import {createBrowserRouter} from "react-router-dom";

// import ERROR_PAGE from '../Components/Error-page/Error-page';
import LOGIN from '../Components/Page/Login/Login';
import ROOT from '../Components/Root/Root';
import STATUS_CALL from '../Components/Page/Order-list/Status-call';
import STATUS_PROCESS from '../Components/Page/Order-list/Status-process';
import STATUS_COMPLETED from '../Components/Page/Order-list/Status-completed';
import STATUS_DELIVERY from '../Components/Page/Order-list/Status-delivery';

import SCAN from '../Components/Page/Scan/Scan';
import REPORT from '../Components/Page/Report/Report';

import { INDEX_PAGE, HOME_PAGE_LOCAL } from "../Components/API/API";

export const router = createBrowserRouter([

  {
    path: `${INDEX_PAGE}`,
    element: <LOGIN />
  },
  {
    path: `${HOME_PAGE_LOCAL}`,
    element: <ROOT />,
    children: [
      {
        path: `${HOME_PAGE_LOCAL}/Status-Call`,
        element: <STATUS_CALL />
      },
      {
        path: `${HOME_PAGE_LOCAL}/Status-Process`,
        element: <STATUS_PROCESS />
      },
      {
        path: `${HOME_PAGE_LOCAL}/Status-Completed`,
        element: <STATUS_COMPLETED />
      },
      {
        path: `${HOME_PAGE_LOCAL}/Status-Delivery`,
        element: <STATUS_DELIVERY />
      },

      {
        path: `${HOME_PAGE_LOCAL}/Scan`,
        element: <SCAN />
      },
      {
        path: `${HOME_PAGE_LOCAL}/Report`,
        element: <REPORT />
      }
    ],
  },

  
]);