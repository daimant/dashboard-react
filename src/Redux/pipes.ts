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

  const parsedKPK = kpk.data.map((row) => {
    const newRow: { [index: string]: string | number } = {};

    kpk.name_col.forEach((colName, i) => {
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
export const PipeGraphLine = (graphs: GraphLineType[]) => {
  return !graphs ? [] : graphs.map(graph => {
    if (!graph) {
      graph = {title: 'Ошибка при загрузке', data: []};
      return graph;
    }

    graph.data = graph.data.map(day => {
      day['p'] = (Number(day['p']) * 100).toFixed(2);
      return day;
    });

    return graph;
  });
};

const dictForPipeGraphArea: { [key: string]: Array<string> } = {
  'Назначение заявок': ['Назначено сотрудником', 'Назначено ботом', 'Переназначено за ботом'],
  'Установка ПО': ['Выполнено сотрудником УПП', 'Выполнено ботом', 'Ошибки бота'],
  default: ['', '', '']
};
const getNamesForPipeGraphArea = (key: string) => dictForPipeGraphArea[key] || dictForPipeGraphArea.default;

export const PipeGraphArea = (graphs: RawGraphAreaType[]) => {
  if (!graphs) return [];

  return graphs.map((curGraph) => {
    const [p1Name, p2Name, p3Name] = getNamesForPipeGraphArea(curGraph.title);

    if (!curGraph) {
      return {
        title: 'Ошибка при загрузке',
        percents: {
          p1: p1Name,
          p2: p2Name,
          p3: p3Name,
        },
        data: [],
      }
    }

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
export const PipeTodays = (todays: Array<TodaysType>) => todays.map(today => {
  if (today.v1 === null || today.p === null)
    today = {title: 'Ошибка при загрузке', v1: 0, p: 0, err: true};
  else if (today.p <= 1)
    today.p = +(today.p * 100).toFixed(1);
  return today;
});

// filters
export const PipeOrgListOSK = (orgListOSK: Array<OrgListOSKType>) => {
  if (!orgListOSK || !orgListOSK[0] || orgListOSK[0]?.oid !== 281586771165316) return {};

  const orgPosition = new Map(orgListOSK.map((org: OrgListOSKType, i: any) => {
    org.oid = `${org.oid}`;
    return[`${org.oid}`, i];
  }));
  const orgMapListOSK = new Map([['281586771165316', 'ООО ОСК ИнфоТранс']]);

  orgListOSK = orgListOSK.map(org => {
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
  altOrgListOSK.children = altOrgListOSK.children.filter((el: {zno: number}) => el.zno);

  return {orgListOSK: orgListOSK[0], altOrgListOSK, orgMapListOSK};
};
export const PipeOrgListRZD = (orgListRZD: Array<OrgListRZDType>) => ({
  orgListRZD: {
    oid: '0',
    name: 'ОАО РЖД',
    children: orgListRZD.map(org => ({name: org.name, oid: `${org.oid}`, children: []}))
  },
  orgMapListRZD: new Map(orgListRZD.map(org => [`${org.oid}`, org.name])).set('0', 'ОАО РЖД')
});

