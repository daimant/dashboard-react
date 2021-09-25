import {
  GraphLineType,
  RawKPKType,
  TodaysType,
  OrgListOSKType,
  RawGraphAreaType,
  OrgListRZDType,
  KTLType,
  KTLChildType,
  WorkersType,
  SelectedKTLType,
  SelectedWorkersType,
  RawListType,
  KPKRowsType,
} from '../Types/Types';
import {getHourNumbers} from "@material-ui/pickers/views/Clock/ClockNumbers";

// Widgets
export const PipeKPK = (kpk: RawKPKType) => {
  if (!kpk) return kpk;

  let parsedKPK = kpk.data?.map((row) => {
    const newRow: KPKRowsType = {};

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

  if (kpk.name_col[0] === 'Показатель') {
    const parents = new Map();

    parsedKPK.forEach((el, i) => {
      if (el.Показатель === 'Комплексный показатель') {
        parents.set(el.Услуга, i);
      }
    });

    parsedKPK.forEach(el => {
      if (el.Показатель !== 'Комплексный показатель') {
        const currParent = parents.get(el.Услуга);

        if (!parsedKPK[currParent].children) {
          parsedKPK[currParent].children = [];
        }

        // @ts-ignore
        parsedKPK[currParent].children = [...parsedKPK[currParent].children, el];
      }

    });
    parsedKPK = parsedKPK.filter(el => el.Показатель === 'Комплексный показатель')
  }

  return {cols: kpk.name_col, rows: parsedKPK};
};

const CompressGraph = (graph: GraphLineType) => {
  if (graph.data.length <= 31) return graph;

  const currCompressType = graph.data.length < 6 * 30 ? 'week' : 'month';
  const title = graph.title;

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

        if (title === 'Среднее время выполнения запроса') {
          // console.log(currDate.v2)
          // currDate.v2 /= numberOfPeriod - iOfDays + 1;
        }
      }

      stPeriod = null;
      numberOfPeriod = null;
    } else {
      graph.data[iOfDays - 1].p += currDate.p;
      graph.data[iOfDays - 1].v1 += currDate.v1;
      graph.data[iOfDays - 1].sumV1V2! += currDate.sumV1V2!;

      if (title === 'Среднее время выполнения запроса') {
        // @ts-ignore
        // const hour = graph.data[iOfDays - 1].v2.slice()
        // graph.data[iOfDays - 1].v2 += currDate.v2;
      } else {
        // @ts-ignore
        graph.data[iOfDays - 1].v2 += currDate.v2;
      }
      graph.data.splice(iOfDays, 1);
    }
  }

  return graph;
};

export const PipeGraphLine = (graphs: GraphLineType[]) => {
  return !graphs ? [] : graphs.map(graph => {
    if (!graph?.title) {
      graph = {
        title: 'Ошибка при загрузке',
        data: []
      };
      return graph;
    }
    if (!graph?.data) {
      graph.data = [];
    }
    if (graph.title === 'Доля ЗНО, выполненных в день обращения') {
      graph.data.forEach(day => {
        day.sumV1V2 = day.v1;
        day.v1 -= Number(day.v2);
      });
    }
    // else if (graph.title === 'Среднее время выполнения запроса') {
    //   graph.data.forEach(day => day.v2 = day.v2.slice(0,2))
    // }

    CompressGraph(graph);

    let sumVal = 0;
    let countProc = 0;
    let sumProc = 0;

    graph.data = graph.data.map(day => {
      if (typeof day.v2 === 'string' && day.v2.includes(':')) {
        const hours = day.v2.slice(0, 2);
        const minutes = day.v2.slice(3, 5);

        day.v2 = `${hours}.${minutes}`;
      }

      sumVal += graph.title === 'Доля ЗНО, выполненных в день обращения' ? day.sumV1V2! : day.v1;
      sumProc += day.p;
      countProc++;

      day.p = Number((Number(day.p) * 100).toFixed(2));
      return day;
    });

    graph.sumVal = sumVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
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

  return graphs.map((currGraph) => {
    if (!currGraph?.title) {
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

    const [p1Name, p2Name, p3Name] = getNamesForPipeGraphArea(currGraph.title);

    return {
      title: currGraph.title,
      percents: {
        p1: p1Name,
        p2: p2Name,
        p3: p3Name,
      },
      data: currGraph.data ? currGraph.data.map((day) => ({
        d: day.d,
        p1: [day.p2 + day.p3, 1, day.p1],
        p2: [day.p3, day.p3 + day.p2, day.p2],
        p3: [0, day.p3, day.p3],
      })) : [],
    }
  })
};

export const PipeTodays = (todays: TodaysType[]) => todays.map(today => {
  if (!today || today.v1 === null || today.p === null || !today.v1 || !today.p || !today.title) {
    today = {title: !today?.title ? 'Ошибка при загрузке' : 'Нет данных', v1: 0, p: 0, err: true};
  } else if (today.p <= 1) {
    today.p = +(today.p * 100).toFixed(1);
  }
  return today;
});

// filters
export const PipeLists = (lists: RawListType[]) => {
  if (!lists?.length) return {};

  const [orgListOSK, orgListRZD, ktlList, workersList] = ['org_osk', 'org_rzd', 'dogovor', 'category']
    .map(key => lists.find(el => el.key === key));

  return {
    ...PipeOrgListOSK(ParserArrayToObject(orgListOSK!)),
    ...PipeOrgListRZD(ParserArrayToObject(orgListRZD!)),
    ...PipeKTl(ParserArrayToObject(ktlList!)),
    ...PipeWorkers(ParserArrayToObject(workersList!)),
  }
};

const ParserArrayToObject = (arr: RawListType): any => {
  if (!arr || !arr.data?.length || !arr.name_col?.length) return [];

  return arr.data.map((row) => {
    const newRow: any = {};

    arr.name_col.forEach((colName, i) => {
      newRow[colName] = row[i];
    });

    return newRow;
  });
};

const PipeOrgListOSK = (orgListOSK: OrgListOSKType[]) => {
  if (!orgListOSK || !orgListOSK[0] || orgListOSK[0]?.oid !== 281586771165316) return {};

  const orgPosition = new Map(orgListOSK.map((org: OrgListOSKType, i: any) => {
    org.oid = `${org.oid}`;
    return [`${org.oid}`, i];
  }));
  const namesListOSK = new Map([['281586771165316', 'ООО ОСК ИнфоТранс']]);

  orgListOSK = orgListOSK.map(org => {
    if (!org.parent) {
      org.parent = '0';
    }

    org.parent = `${org.parent}`;

    namesListOSK.set(org.oid, org.name);

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

  return {orgListOSK: orgListOSK[0], altOrgListOSK, namesListOSK};
};

const PipeOrgListRZD = (orgListRZD: OrgListRZDType[]) => ({
  orgListRZD: {
    oid: '0',
    name: 'ОАО РЖД',
    children: orgListRZD ? orgListRZD.map(org => ({name: org.name, oid: `${org.oid}`, children: []})) : []
  },
  namesListRZD: new Map(orgListRZD ? orgListRZD.map(org => [`${org.oid}`, org.name]) : []).set('0', 'ОАО РЖД')
});

const PipeKTl = (rawKTL: KTLChildType[]): { ktl: KTLType[], selectedKTL: SelectedKTLType } => {
  if (!rawKTL || !rawKTL[0]) return {ktl: [], selectedKTL: []};

  const parentsUniq = new Set(rawKTL.map(doc => doc.contragent));
  const ktl = Array.from(parentsUniq).map((doc: string, i: number) => ({
    name: doc,
    oid: `${i}`,
    children: [] as KTLChildType[]
  }));
  const parentsPlace = new Map(ktl.map(doc => [doc.name, Number(doc.oid)]));

  rawKTL.forEach(child => {
    const parentOid = parentsPlace.get(child.contragent);

    child.oid = `${child.oid}`;
    ktl[parentOid!].children = [...ktl[parentOid!].children, child];
  });

  const selectedKTL = ktl
    .map(list => [list.oid, ...list.children.map(child => child.oid)])
    .flat(1);

  return {ktl, selectedKTL};
};

const PipeWorkers = (workers: WorkersType[]): { workers: WorkersType[], selectedWorkers: SelectedWorkersType } => ({
  workers, selectedWorkers: workers?.map(el => el.oid)
});


