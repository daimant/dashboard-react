import {widgetsAPI} from "../../API/API";

interface ActionElements {
  type: string,
  data?: [],
}

const SET_KPK = "SET_KPK";

let initialState: object = {
  isFetchingWidgets: true,
  kpk: {},
  sc: [
    {
      "id": 1,
      "title": "Выполнено ЗНО, шт",
      "data": [
        {
          "d": "10.04",
          "v": 83
        },
        {
          "d": "11.04",
          "v": 86
        },
        {
          "d": "12.04",
          "v": 84
        },
        {
          "d": "13.04",
          "v": 79
        },
        {
          "d": "14.04",
          "v": 90
        },
        {
          "d": "15.04",
          "v": 86
        },
        {
          "d": "16.04",
          "v": 98
        },
        {
          "d": "17.04",
          "v": 87
        },
        {
          "d": "18.04",
          "v": 81
        },
        {
          "d": "19.04",
          "v": 79
        },
        {
          "d": "20.04",
          "v": 77
        },
        {
          "d": "21.04",
          "v": 81
        },
        {
          "d": "22.04",
          "v": 98
        },
        {
          "d": "23.04",
          "v": 90
        },
        {
          "d": "24.04",
          "v": 85
        },
        {
          "d": "25.04",
          "v": 95
        },
        {
          "d": "26.04",
          "v": 94
        }
      ]
    },
    {
      "id": 2,
      "title": "Зарегистрировано обращений, шт",
      "data": [
        {
          "d": "10.04",
          "v": 99
        },
        {
          "d": "11.04",
          "v": 88
        },
        {
          "d": "12.04",
          "v": 80
        },
        {
          "d": "13.04",
          "v": 88
        },
        {
          "d": "14.04",
          "v": 90
        },
        {
          "d": "15.04",
          "v": 75
        },
        {
          "d": "16.04",
          "v": 86
        },
        {
          "d": "17.04",
          "v": 88
        },
        {
          "d": "18.04",
          "v": 81
        },
        {
          "d": "19.04",
          "v": 88
        },
        {
          "d": "20.04",
          "v": 87
        },
        {
          "d": "21.04",
          "v": 91
        },
        {
          "d": "22.04",
          "v": 86
        },
        {
          "d": "23.04",
          "v": 92
        },
        {
          "d": "24.04",
          "v": 84
        },
        {
          "d": "25.04",
          "v": 94
        },
        {
          "d": "26.04",
          "v": 87
        }
      ]
    },
    {
      "id": 3,
      "title": "SLA, %",
      "data": [
        {
          "d": "10.04",
          "v": 82
        },
        {
          "d": "11.04",
          "v": 80
        },
        {
          "d": "12.04",
          "v": 85
        },
        {
          "d": "13.04",
          "v": 75
        },
        {
          "d": "14.04",
          "v": 89
        },
        {
          "d": "15.04",
          "v": 84
        },
        {
          "d": "16.04",
          "v": 95
        },
        {
          "d": "17.04",
          "v": 76
        },
        {
          "d": "18.04",
          "v": 88
        },
        {
          "d": "19.04",
          "v": 95
        },
        {
          "d": "20.04",
          "v": 94
        },
        {
          "d": "21.04",
          "v": 86
        },
        {
          "d": "22.04",
          "v": 84
        },
        {
          "d": "23.04",
          "v": 87
        },
        {
          "d": "24.04",
          "v": 77
        },
        {
          "d": "25.04",
          "v": 78
        },
        {
          "d": "26.04",
          "v": 100
        }
      ]
    }
  ],
  inf: [
    [
      "Чистая прибыль",
      "100М"
    ],
    [
      "EBITDA",
      "100М"
    ],
    [
      "Удовлетворенность клиентов",
      "99%"
    ],
    [
      "Рентабельность",
      "100%"
    ],
    [
      "ROIC",
      "100%"
    ],
    [
      "Производительность труда",
      "100 K|P"
    ],
    [
      "KPI",
      "100%"
    ]
  ],
};

const widgetsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_KPK: {
      return {...state, kpk: action.kpk, isFetchingWidgets: false}
    }
    default:
      return state;
  }
};

export const setKPK = (kpk: any) => ({type: SET_KPK, kpk});

export const requestWidgets = (oid: string = '281586771165316') => async (dispatch: any) => {
  const response = await widgetsAPI.getKPK(oid); // переделать
  dispatch(setKPK(response));
};


export default widgetsReducer;
