// from filters reducer

export type OrgListOSKType = {
  oid: any
  name: string
  parent: any
  zno: number
  children: Array<OrgListOSKType>
};
export type OrgListRZDType = {
  oid: any
  name: string
  children: Array<OrgListRZDType>
};
export type PeriodListType = {
  name: string
  oid: string
  children: Array<object>
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

export type GraphLineType = {
  id?: number
  title: string
  data: Array<GraphLineElementsType>
};
type GraphLineElementsType = {
  d: string
  v1: number
  v2: number
  p: number
};

export type RawGraphAreaType = {
  title: string
  data: Array<RawGraphAreaElementsType>
};
type RawGraphAreaElementsType = {
  d: string
  p1: number
  p2: number
  p3: number
};

export type GraphAreaType = {
  title: string
  percents: { p1: string, p2: string, p3: string }
  data: Array<GraphAreaTypeElements>
}
type GraphAreaTypeElements = {
  d: string
  p1: Array<number>
  p2: Array<number>
  p3: Array<number>
}

export type TodaysType = { title: string, v1: number, p: number, err: boolean };
