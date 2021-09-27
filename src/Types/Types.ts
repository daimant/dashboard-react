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
  staff?: OrgOwnerType
};

export type KPKType = {
  cols: string[]
  rows: KPKRowsType[]
  orgOwner?: OrgOwnerType
};

export type OrgOwnerType = {
  'fio': string
  'link_card': string
  'ico': string
  'avatar': string
}

export type KPKRowsType = { [key: string]: string | number | KPKRowsType[] };

export type GraphLineType = {
  id?: number
  title: string
  data: GraphLineElementsType[]
  sumVal?: any
  avrProc?: number
};

export type GraphLineElementsType = {
  d: string
  v1: number
  v2: number | string
  v3?: number
  p: number
  sumV1V2?: number
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
  selectedKTL?: SelectedKTLType
  selectedWorkers?: SelectedWorkersType
  numDetailsSHK?: number[]
  numDetailsZNO?: number[]
};

export type RequestWidgetsType = {
  orgOid: string
  period: string
  periodType: string
  serviceOid?: string
  numSC?: number[]
  numTodays?: number[]
  numTops?: number[]
  selectedKTL?: SelectedKTLType
  selectedWorkers?: SelectedWorkersType
  numDetailsSHK?: number[]
  numDetailsZNO?: number[]
};

export type RequestWidgetsFromFiltersType = {
  orgOid: string
  period: string
  periodType: string
  selectedKTL: SelectedKTLType
  selectedWorkers: SelectedWorkersType
};

export type SelectedKTLType = string[];
export type SelectedWorkersType = number[];

export type RawListType = {
  key: string
  name_col: string[]
  data: [string | number][]
};

export type MapListType = Map<string, string>;
