import {
  GraphLineType,
  RawKPKType,
  TodaysType,
  OrgListType,
  RawGraphAreaType,
} from '../Types/Types';

// Widgets
export const PipeKPK = (kpk: RawKPKType) => {
  const parsedKPK = [];
  // идем по строкам сервисов
  for (let i = 0; i < kpk.data.length; i++) {
    const currObj: any = {};

    // идем по элеентам в строках
    for (let j = 0; j < kpk.name_col.length; j++) {
      let currVal: any = kpk.data[i][j];
      //пропускаем оид в каждой строке
      if (j === 0)
        currObj[kpk.name_col[j]] = currVal;
      else {
        //конвертируем в стринг значения для построения таблицы кпк
        if (j > 1 && j < 13) {
          if (typeof currVal === 'number') {
            currVal *= 100;
          }
          currVal += '';
          currVal = currVal.replace(/,/, '.');
        }

        if (currVal === null)
          currVal = '-';

        currObj[kpk.name_col[j]] = +currVal && +currVal % 1
          ? (+currVal).toFixed(2)
          : +currVal
            ? +currVal
            : currVal;
      }
    }
    parsedKPK.push(currObj);
  }

  return {cols: kpk.name_col, rows: parsedKPK};
};
export const PipeGraphLine = (graphs: GraphLineType[]) => {
  if (!graphs) return [];
  for (let i in graphs) {
    if (!graphs[i]) {
      graphs[i] = {title: 'Ошибка при загрузке', data: []};
      continue;
    }

    const graph = graphs[i];
    for (let i in graph.data) {
      if (graph.data.hasOwnProperty(i) && graph.data[i]['p'] <= 1)
        graph.data[i]['p'] = +(graph.data[i]['p'] * 100).toFixed(2);
    }
  }

  return graphs
};

const dictForPipeGraphArea: { [key: string]: Array<string> } = {
  'Назначение заявок': ['Назначено сотрудником', 'Назначено ботом', 'Переназначено за ботом'],
  'Установка ПО': ['Выполнено сотрудником УПП', 'Выполнено ботом', 'Ошибки бота'],
  default: ['', '', '']
};
// @ts-ignore
const getNamesForPipeGraphArea = (key: String) => dictForPipeGraphArea[key] || dictForPipeGraphArea.default;

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
export const PipeOrgList = (orgList: Array<OrgListType>) => {
  if (!orgList || !orgList[0] || orgList[0]?.oid !== 281586771165316) return {};

  const orgPosition = new Map(orgList.map((el: any, i: any) => [el['oid'], i]));
  const orgMapList = new Map([['281586771165316', 'ООО ОСК ИнфоТранс']]);

  for (let i = orgList.length - 1; i > 0; i--) {
    orgMapList.set(orgList[i].oid + '', orgList[i].name);
    const parentInList = orgPosition.get(orgList[i].parent);
    if (!orgList[parentInList]['children']) orgList[parentInList]['children'] = [];
    // @ts-ignore
    orgList[parentInList]['children'] = [...orgList[parentInList]['children'], orgList[i]]
  }

  for (let org of orgList) {
    org.oid += '';
    org.parent += '';
  }

  for (let org of orgList) {
    if (org?.children?.length)
      org.children.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
  }

  const altOrgList = JSON.parse(JSON.stringify(orgList[0]));

  for (let i = altOrgList.children.length - 1; altOrgList.name && i >= 0; i--) {
    if (!altOrgList.children[i].zno)
      altOrgList.children.splice(i, 1);
  }

  return {orgList, altOrgList, orgMapList};
};