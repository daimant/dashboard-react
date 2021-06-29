// from filters reducer

export type OrgListType = {
  oid: any
  name: string
  parent: any
  zno: number
  children?: Array<OrgListType>
};
export type PeriodListType = {
  name: string
  oid: string
  children?: Array<object>
};

// from widgets reducer

export type RawKPKType = {
  name_col: [string, string, string, string]
  data: Array<[number, string, any, number]>
}
export type KPKType = {
  cols: [string, string, string, string] | Array<string>
  rows: Array<KPKRowsType>
}
type KPKRowsType = {
  Период: string
  Сегодня: string
  Сервис_oid: number
  Услуга: string
}
export type GraphType = {
  id?: number
  title: string
  data: Array<GraphElementsType>
};
type GraphElementsType = {
  d: string
  v1: number
  v2: number
  p: number
};
export type TodaysType = { title: string, v1: number, p: number, err: boolean };
