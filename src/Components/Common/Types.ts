// widgets container

export interface WidgetsStateProps {
  kpk: WidgetsKPKElements
  sc: WidgetsGraphElements[]
  inf: InfTableElements[]
  isFetchingWidgets: boolean
  widgetsTitle: string
  heightDisplay: number
  orgOid: string
  period: string
  periodType: string
}

export interface RootState {
  widgets: WidgetsStateProps
  filters: {
    isFetchingFilters: boolean
    data: []
  }
}

// widgets

export interface WidgetsPropsElements {
  kpk: WidgetsKPKElements
  sc: WidgetsGraphElements[]
  inf: InfTableElements[]
  isFetchingWidgets: boolean
  widgetsTitle: string
  heightDisplay: number
}

interface WidgetsKPKElements {
  data: object[]
  cols: [
    number,
    string,
    string,
    string
  ]
  kpk: KPKTableElements[]
}

export interface WidgetsGraphElements {
  id?: number
  title: string
  max: number
  min: number
  data: GraphElements[]
}

// inf table

export interface InfTableProps {
  inf: InfTableElements[]
  widgetsTitle: string
}

export interface InfTableElements {
  name: string
  value: string
}

// kpk table

export interface KPKTablePropsElements {
  kpk: WidgetsKPKElements
  widgetsTitle: string
}

export interface KPKTableElements {
  Сервис_oid: number
  Сервис: string
  Период: string
  Сегодня: string
}

// graph

export interface GraphProps {
  key: number
  sc: WidgetsGraphElements
  heightDisplay: number
  widgetsTitle: string
}

export interface GraphElements {
  d: string
  v: number
}

//filters
export interface RenderTree {
  oid: string
  name: string
  children?: RenderTree[]
}
