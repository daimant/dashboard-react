import {RootState} from "../Common/Types";

export const getKPK = (state: any) => {
  //console.log('selector',JSON.stringify(state.widgets.api.kpk))
  //console.log('selector',state.widgets.api.kpk)
  const {kpk} = state.widgets.data;
  const parsedKPK = [];
  for (let i = 0; i < kpk.data.length; i++) {
    const curr: any = {};

    for (let j = 0; j < kpk.name_col.length; j++) {
      curr[kpk.name_col[j]] = kpk.data[i][j];
    }
    parsedKPK.push(curr);
  }

  // console.log('selector', {cols: state.widgets.data.kpk.name_col, kpk: parsedKPK});
  return {cols: state.widgets.data.kpk.name_col, kpk: parsedKPK};
};
export const getSC = (state: RootState) => {

  for (let point of state.widgets.data.sc) {
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

  return state.widgets.data.sc
};
export const getInf = (state: any) => {
  const {inf} = state.widgets.data;
  const parsedInf: object[] = [];

  for (let i = 0; i < inf.length; i++) {
    parsedInf.push({name: inf[i][0], value: inf[i][1]})
  }
  return parsedInf;
};
