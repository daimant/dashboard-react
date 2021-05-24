// widgets container

export interface WidgetsStateProps {
  kpk: WidgetsKPKElements,
  sc: WidgetsGraphElements[],
  inf: InfTableElements[],
  isFetchingWidgets: boolean,
  srv_oid: number,
}

export interface RootState {
  widgets: WidgetsStateProps,
  filters: {
    isFetchingFilters: boolean,
    data: [],
  }
}

// widgets

export interface WidgetsPropsElements {
  kpk: WidgetsKPKElements,
  sc: WidgetsGraphElements[],
  inf: InfTableElements[],
  isFetchingWidgets: boolean,
}

interface WidgetsKPKElements {
  data: object[];
  cols: [
    string,
    string,
    string
  ],
  kpk: KPKTableElements[]
}

export interface WidgetsGraphElements {
  id?: number,
  title: string,
  max: number,
  min: number,
  data: GraphElements[]
}

// inf table

export interface InfTableProps {
  inf: InfTableElements[]
}

export interface InfTableElements {
  name: string;
  value: string;
}

// kpk table

export interface KPKTablePropsElements {
  kpk: WidgetsKPKElements
}

export interface KPKTableElements {
  КПК: string;
  Период: string;
  Сегодня: string;
}

// graph

export interface GraphProps {
  key: number,
  sc: WidgetsGraphElements
}

export interface GraphElements {
  d: string,
  v: number,
}

//filters
export interface RenderTree {
  oid: string;
  name: string;
  children?: RenderTree[];
}
