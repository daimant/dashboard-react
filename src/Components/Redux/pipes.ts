import {GraphType, RawKPKType, TodaysType} from "./widgets-reducer";

// Widgets
export const PipeKPK = (kpk: RawKPKType) => {
  const parsedKPK = [];
  // идем по строкам сервисов
  for (let i = 0; i < kpk.data.length; i++) {
    const currObj: any = {};

    // идем по элеентам в строках
    for (let j = 0; j < kpk.name_col.length; j++) {
      //пропускаем оид в каждой строке
      if (j === 0)
        currObj[kpk.name_col[j]] = kpk.data[i][j];
      else {
        //конвертируем в стринг значения для построения таблицы кпк
        if (typeof kpk.data[i][j] === 'number')
          kpk.data[i][j] += '';

        let currVal = kpk.data[i][j].replace(/,/, ".");

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
export const PipeGraph = (graphs: GraphType[]) => {
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
export const PipeTodays = (todays: Array<TodaysType>) => {
  for (let i in todays) {
    if (todays.hasOwnProperty(i) && (todays[i].v1 === null || todays[i].p === null))
      todays[i] = {title: "Ошибка при загрузке", v1: 0, p: 0, err: true};
    else if (todays[i].p <= 1)
      todays[i].p = +(todays[i].p * 100).toFixed(1);
  }
  return todays;
};

// filters
