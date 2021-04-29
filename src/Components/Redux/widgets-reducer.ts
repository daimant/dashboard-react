import {widgetsAPI} from "../../API/API";

interface ActionElements {
  type: string,
  data?: [],
}

const SET_WIDGETS = "SET_WIDGETS";

let initialState: object = {
  isFetchingWidgets: false,
  // data: {
  //   kpk: widgetsAPI.getLeftTable(),
  //   sc1: widgetsAPI.getGraph(1),
  //   sc2: widgetsAPI.getGraph(2),
  //   sc3: widgetsAPI.getGraph(3),
  //   inf: widgetsAPI.getRightTable(),
  // },
  data: {
    "kpk": {
      "name_col": [
        "КПК",
        "Период",
        "Сегодня"
      ],
      "data": [
        [
          "ОСК-14-01 ТЕХНИЧЕСКАЯ ПОДДЕРЖКА РАБОЧЕГО МЕСТА (БТО-1)",
          "99%",
          "99%"
        ],
        [
          "ОСК-21-01 ПЕРИФЕРИЯ_БТО-2",
          "99%",
          "99%"
        ],
        [
          "ОСК-23-01 СОПРОВОЖДЕНИЕ ПЕРИФЕРИЙНЫХ УСТРОЙСТВ (КТО-2)",
          "99%",
          "99%"
        ],
        [
          "ОСК-09-01 ЛВС-СПД",
          "99%",
          "99%"
        ],
        [
          "ОСК-08-01 ТЕХНИЧЕСКАЯ ПОДДЕРЖКА ЭТСО (КТО-1)",
          "99%",
          "99%"
        ],
        [
          "ОСК-18-01 ТЕХНИЧЕСКАЯ ПОДДЕРЖКА РАБОЧЕГО МЕСТА CIP (БТО-1)",
          "99%",
          "99%"
        ],
        [
          "ОСК-04-01 БКО_БТО-1",
          "99%",
          "99%"
        ],
        [
          "ОСК-20-01 ПЕРИФЕРИЯ_БТО-1",
          "99%",
          "99%"
        ],
        [
          "ОСК-25-01 СЕРВИСНОЕ ПОКОПИЙНОЕ ОБСЛУЖИВАНИЕ (СПО)",
          "99%",
          "99%"
        ],
        [
          "ОСК-15-01 ТЕХНИЧЕСКАЯ ПОДДЕРЖКА РАБОЧЕГО МЕСТА (КТО-1)",
          "99%",
          "99%"
        ],
        [
          "ОСК-33-02 ВНУТРЕННИЕ РАБОТЫ РМ",
          "99%",
          "99%"
        ],
        [
          "ОСК-16-01 ТЕХНИЧЕСКАЯ ПОДДЕРЖКА РАБОЧЕГО МЕСТА VIP (БТО-1)",
          "99%",
          "99%"
        ],
        [
          "ОСК-33-01 ВНУТРЕННИЕ РАБОТЫ ПЕРИФЕРИЯ",
          "99%",
          "99%"
        ],
        [
          "ОСК-17-01 ТЕХНИЧЕСКАЯ ПОДДЕРЖКА РАБОЧЕГО МЕСТА VIP (КТО-1)",
          "99%",
          "99%"
        ],
        [
          "ОСК-25-01 ПОКОПИЙНАЯ ПЕЧАТЬ",
          "99%",
          "99%"
        ],
        [
          "ОСК-34-01 СОПРОВОЖДЕНИЕ КОМПЛЕКСОВ АКХ",
          "99%",
          "99%"
        ],
        [
          "ОСК-07-01 ЭТСО_БТО-1",
          "99%",
          "99%"
        ],
        [
          "ОСК-14-04 ОРГАНИЗАЦИЯ НОВОГО РАБОЧЕГО МЕСТА (БТО-1)_ВНЕШ",
          "99%",
          "99%"
        ],
        [
          "ОСК-43-03 ПЕРИФЕРИЯ_КТО-2_ПВД",
          "99%",
          "99%"
        ],
        [
          "ОСК-14-03 ТЕХНИЧЕСКАЯ ПОДДЕРЖКА РАБОЧЕГО МЕСТА (БТО-1)_ВНЕШ",
          "99%",
          "99%"
        ]
      ]
    },
    "sc": [
      {
        "id": 1,
        "title": "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E \u0417\u041D\u041E, \u0448\u0442",
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
        "title": "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0439, \u0448\u0442",
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
            "v": 86
          }
        ]
      }
    ],
    "inf": [
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
    ]
  }
};

const widgetsReducer = (state = initialState, action: ActionElements) => {
  // switch (action.type) {
  //   case SET_SERVICES:
  //     if (action.sort) {
  //       return {
  //         ...state,
  //         data: [...action.services.data],
  //         current_page: action.services.current_page,
  //         countSort: state.countSort + 1,
  //         sortType: action.sortType,
  //         sortDirect: action.countSort % 2 ? "asc" : "desc",
  //         ...state.favorites,
  //       };
  //     } else if (state.data.length) {
  //       return {
  //         ...state,
  //         data: [...state.data, ...action.services.data],
  //         current_page: action.services.current_page,
  //       };
  //     } else return {...state, ...action.services};

  // default:
  return state;
  // }
};

// export const setNextPage = (data) => ({type: SET_NEXT_PAGE, data});
// export const removeFromFavorites = (id) => ({
//   type: REMOVE_FROM_FAVORITES,
//   id,
// });
// export const addToFavorites = (id) => ({type: ADD_TO_FAVORITES, id});
// export const setServices = (
//   services,
//   sort = false,
//   sortType = "partners_count",
//   countSort = "desc"
// ) => ({
//   type: SET_SERVICES,
//   services,
//   sort,
//   sortType,
//   countSort,
// });
// export const requestServices = (page) => async (dispatch) => {
//   const response = await servicesAPI.getServices(page);
//   dispatch(setServices(response));
// };
// export const requestNextServicesList = (
//   currentPage,
//   sortDirection,
//   sortType
// ) => async (dispatch) => {
//   const response = await servicesAPI.getNextPage(
//     currentPage,
//     sortType,
//     sortDirection
//   );
//   dispatch(setNextPage(response));
// };
// export const sort = (sortType, countSort) => async (dispatch) => {
//   const response = await servicesAPI.getSortServices(sortType, countSort);
//   dispatch(setServices(response, true, sortType, countSort));
// };

export default widgetsReducer;
