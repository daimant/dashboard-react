import {RootState} from "../Common/Types";

export const selectKPK = (state: any) => {
  const {kpk} = state.widgets;

  if (!kpk.data) return {};

  const parsedKPK = [];
  for (let i = 0; i < kpk.data.length; i++) {
    const currObj: any = {};

    for (let j = 0; j < kpk.name_col.length; j++) {
      let currVal = kpk.data[i][j].replace(/,/, ".");

      currObj[kpk.name_col[j]] = +currVal
        ? Math.trunc(+currVal)
        : currVal;
    }
    parsedKPK.push(currObj);
  }

  return {cols: state.widgets.kpk.name_col, data: parsedKPK};
};
export const selectSC = (state: RootState) => {
  if (!state.widgets.sc) return {};

  for (let point of state.widgets.sc) {
    let min = Infinity;
    let max = -Infinity;

    for (let {v} of point.data) {
      if (v > max)
        max = v;
      if (v < min)
        min = v;
    }
    point.max = max;
    point.min = min;
  }

  return state.widgets.sc
};
export const selectInf = (state: any) => {
  const {inf} = state.widgets;
  const parsedInf: object[] = [];

  if (!inf) return {};

  for (let i = 0; i < inf.length; i++) {
    parsedInf.push({name: inf[i][0], value: inf[i][1]})
  }
  return parsedInf;
};
