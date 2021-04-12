import React from "react";
import "./Widgets.module.scss";
import TableLeft from "./TableLeft/TableLeft";
import Graph from "./Graph/Graph";
import TableRight from "./TableRight/TableRight";

// const dataGraph1 = [
//   {
//     name: 'Page A',
//     uv: 4000,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//   },
// ];
const sc1 = {
  "title": "Зарегистрировано обращений, шт",
  "x": [
    "21.01",
    "23.01",
    "25.01",
    "27.01",
    "29.01",
    "31.01",
    "02.02",
    "04.02",
    "06.02",
    "08.02",
    "10.02",
    "12.02",
    "14.02",
    "16.02",
    "18.02",
    "20.02"
  ],
  "y": [
    96,
    96,
    97,
    99,
    98,
    91,
    92,
    99,
    97,
    96,
    98,
    99,
    96,
    97,
    99,
    99
  ]
};
const sc2 = {
  "title": "Выполнено ЗНО, шт",
  "x": [
    "21.01",
    "23.01",
    "25.01",
    "27.01",
    "29.01",
    "31.01",
    "02.02",
    "04.02",
    "06.02",
    "08.02",
    "10.02",
    "12.02",
    "14.02",
    "16.02",
    "18.02",
    "20.02"
  ],
  "y": [
    99,
    98,
    98,
    94,
    97,
    95,
    90,
    97,
    96,
    90,
    90,
    91,
    98,
    90,
    92,
    90
  ]
}
const sc3 = {
  "title": "SLA, %",
  "x": [
    "21.01",
    "23.01",
    "25.01",
    "27.01",
    "29.01",
    "31.01",
    "02.02",
    "04.02",
    "06.02",
    "08.02",
    "10.02",
    "12.02",
    "14.02",
    "16.02",
    "18.02",
    "20.02"
  ],
  "y": [
    98,
    96,
    94,
    94,
    96,
    93,
    94,
    92,
    97,
    96,
    92,
    95,
    92,
    97,
    91,
    96
  ]
}


const Widgets: React.FC = () => {
  return (
    <main>
      <TableLeft/>
      <div>
        <Graph data={sc1}/>
        <Graph data={sc2}/>
        <Graph data={sc3}/>
      </div>
      <TableRight/>
    </main>
  )
};

export default Widgets;
