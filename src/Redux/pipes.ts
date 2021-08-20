import {
  GraphLineType,
  RawKPKType,
  TodaysType,
  OrgListOSKType,
  RawGraphAreaType,
  OrgListRZDType,
} from '../Types/Types';

// Widgets
export const PipeKPK = (kpk: RawKPKType) => {
  if (!kpk) return kpk;

  const parsedKPK = kpk.data?.map((row) => {
    const newRow: { [index: string]: string | number } = {};

    kpk.name_col?.forEach((colName, i) => {
      let currColVal = row[i];

      if ((colName === 'Значение' || colName[0] === 'k') && currColVal !== '-') {
        if (currColVal === null)
          currColVal = '-';
        else {
          currColVal *= 100;
          if (currColVal % 1) {
            currColVal = currColVal.toFixed(2);
          }
        }
      }

      newRow[colName] = `${currColVal}`
    });

    return newRow;
  });

  return {cols: kpk.name_col, rows: parsedKPK};
};

const CompressGraph = (graph: GraphLineType) => {
  if (graph.data.length < 28) return graph;

  const currCompressType = graph.data.length < 6 * 30 ? 'week' : 'month';

  let stPeriod = null;
  let numberOfPeriod = null;

  for (let iOfDays = graph.data.length - 1; iOfDays >= 0; iOfDays--) {
    const currDate = graph.data[iOfDays];
    const currFullDate = new Date(
      Number(currDate.d.slice(6, 8)),
      Number(currDate.d.slice(3, 5)) - 1,
      Number(currDate.d.slice(0, 2))
    );
    const firstDayOfPeriod = currCompressType === 'week' ? currFullDate.getDay() : Number(currDate.d.slice(0, 2));

    if (!stPeriod) {
      stPeriod = currDate.d;
      numberOfPeriod = iOfDays;
    }

    if (iOfDays === 0 || firstDayOfPeriod === 1) {
      currDate.d += ` - ${stPeriod}`;

      if (numberOfPeriod) {
        currDate.p /= numberOfPeriod - iOfDays + 1;
      }

      stPeriod = null;
      numberOfPeriod = null;
    } else {
      graph.data[iOfDays - 1].p += currDate.p;
      graph.data[iOfDays - 1].v1 += currDate.v1;
      graph.data.splice(iOfDays, 1);
    }
  }

  return graph;
};

export const PipeGraphLine = (graphs: GraphLineType[]) => {
  return !graphs ? [] : graphs.map(graph => {
    if (!graph || !graph.data?.length) {
      graph = {title: `${graph?.title ? `${graph?.title} - ` : ''}Ошибка при загрузке`, data: []};
      return graph;
    }

    CompressGraph(graph);

    let sumVal = 0;
    let countProc = 0;
    let sumProc = 0;

    graph.data = graph.data.map(day => {
      sumVal += day.v1;
      sumProc += day.p;
      countProc++;

      day.p = Number((Number(day.p) * 100).toFixed(2));
      return day;
    });

    graph.sumVal = sumVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    graph.avrProc = Number((Number(sumProc / countProc) * 100).toFixed(2));

    return graph;
  });
};

const dictForPipeGraphArea: { [key: string]: string[] } = {
  'Назначение заявок': ['Назначено сотрудником', 'Назначено ботом', 'Переназначено за ботом'],
  'Установка ПО': ['Выполнено сотрудником УПП', 'Выполнено ботом', 'Ошибки бота'],
  default: ['', '', '']
};

const getNamesForPipeGraphArea = (key: string) => dictForPipeGraphArea[key] || dictForPipeGraphArea.default;

export const PipeGraphArea = (graphs: RawGraphAreaType[]) => {
  if (!graphs) return [];

  return graphs.map((curGraph) => {
    if (!curGraph) {
      return {
        title: 'Ошибка при загрузке',
        percents: {
          p1: '',
          p2: '',
          p3: '',
        },
        data: [],
      }
    }

    const [p1Name, p2Name, p3Name] = getNamesForPipeGraphArea(curGraph.title);

    return {
      title: curGraph.title,
      percents: {
        p1: p1Name,
        p2: p2Name,
        p3: p3Name,
      },
      data: curGraph.data.map((day) => ({
        d: day.d,
        p1: [day.p2 + day.p3, 1, day.p1],
        p2: [day.p3, day.p3 + day.p2, day.p2],
        p3: [0, day.p3, day.p3],
      })),
    }
  })
};

export const PipeTodays = (todays: TodaysType[]) => todays.map(today => {
  if (!today || today.v1 === null || today.p === null)
    today = {title: '', v1: 0, p: 0, err: true};
  else if (today.p <= 1)
    today.p = +(today.p * 100).toFixed(1);
  return today;
});

// filters
export const PipeOrgListOSK = (orgListOSK: OrgListOSKType[]) => {
  if (!orgListOSK || !orgListOSK[0] || orgListOSK[0]?.oid !== 281586771165316) return {};

  const orgPosition = new Map(orgListOSK.map((org: OrgListOSKType, i: any) => {
    org.oid = `${org.oid}`;
    return [`${org.oid}`, i];
  }));
  const orgMapListOSK = new Map([['281586771165316', 'ООО ОСК ИнфоТранс']]);

  orgListOSK = orgListOSK.map(org => {
    if (!org.parent) {
      org.parent = '0';
    }

    org.parent = `${org.parent}`;

    orgMapListOSK.set(org.oid, org.name);

    return {...org, children: []}
  });

  orgListOSK.forEach(org => {
    const parentInList = orgPosition.get(org.parent);
    if (org.parent !== '0') {
      orgListOSK[parentInList].children = [...orgListOSK[parentInList].children, org];
    }
  });

  orgListOSK.forEach(org => {
    if (org.children.length) {
      org.children.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
    }
  });

  const altOrgListOSK = JSON.parse(JSON.stringify(orgListOSK[0]));
  altOrgListOSK.children = altOrgListOSK.children.filter((el: { zno: number }) => el.zno);

  return {orgListOSK: orgListOSK[0], altOrgListOSK, orgMapListOSK};
};

export const PipeOrgListRZD = (orgListRZD: OrgListRZDType[]) => ({
  orgListRZD: {
    oid: '0',
    name: 'ОАО РЖД',
    children: orgListRZD ? orgListRZD.map(org => ({name: org.name, oid: `${org.oid}`, children: []})) : []
  },
  orgMapListRZD: new Map(orgListRZD ? orgListRZD.map(org => [`${org.oid}`, org.name]) : []).set('0', 'ОАО РЖД')
});

