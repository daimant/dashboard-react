export type OrgListOSKType = {
  oid: any
  name: string
  parent: string
  zno: number
  children: OrgListOSKType[]
};

export type OrgListRZDType = {
  oid: any
  name: string
  children: OrgListRZDType[]
};

export type PeriodListType = {
  name: string
  oid: string
  children: object[]
};

export type RawKPKType = {
  name_col: [string, string, string, string]
  data: [number, string, any, number][]
};

export type KPKType = {
  cols: string[]
  rows: { [index: string]: string | number }[]
};

export type GraphLineType = {
  id?: number
  title: string
  data: GraphLineElementsType[]
  sumVal?: any
  avrProc?: number
};

type GraphLineElementsType = {
  d: string
  v1: number
  v2: number
  p: number
};

export type RawGraphAreaType = {
  title: string
  data: RawGraphAreaElementsType[]
};

type RawGraphAreaElementsType = {
  d: string
  p1: number
  p2: number
  p3: number
};

export type GraphAreaType = {
  title: string
  percents: {
    p1: string
    p2: string
    p3: string
  }
  data: GraphAreaTypeElements[]
};

type GraphAreaTypeElements = {
  d: string
  p1: number[]
  p2: number[]
  p3: number[]
};

export type TodaysType = {
  title: string
  v1: number
  p: number
  err: boolean
};

export type KTLType = {
  oid: string
  name: string
  children?: KTLChildType[]
};

export type KTLChildType = {
  oid: string
  name: string
  contragent: string
};

export type WorkersType = {
  oid: number
  name: string
};

export type RequestServicesChildType = {
  orgOid: string
  period: string
  periodType: string
  serviceOid: string
  numSC?: number[]
  numTodays?: number[]
  numTops?: number[]
  selectedKTL?: number[]
  selectedWorkers?: number[]
};

export type RequestWidgetsType = {
  orgOid: string
  period: string
  periodType: string
  serviceOid?: string
  numSC?: number[]
  numTodays?: number[]
  numTops?: number[]
  selectedKTL?: number[]
  selectedWorkers?: number[]
};

export type RequestWidgetsFromFiltersType = {
  orgOid: string
  period: string
  periodType: string
  selectedKTL: number[]
  selectedWorkers: number[]
}
