declare module 'redux-dataset' {
  declare export type DataSet<P: Object> = {
    data: P[] | null,
    load: boolean,
    pagesCount: number | null,
    page: number | null,
    filter: Object,
    sort: Object
  }
  declare export type SetDataSetPayload<P: Object> = {
    id: string,
    data: DataSet<P>
  }
  declare export type SetDataSetAction<P: Object> = {
    type: string,
    payload: SetDataSetPayload<P>
  }
  declare export type RemoveDataSetPayload = {
    id: string
  }
  declare export type RemoveDataSetAction = {
    type: string,
    payload: RemoveDataSetPayload
  }
  declare export type DataSetState<P: Object> = {
    [id: string]: DataSet<P>
  }
  declare export type GlobalDataSetState<P: Object> = {
    dataSet: DataSetState<P>
  }
  declare function setDataSetAction(...args: any[]): SetDataSetAction<*>
  declare function getDataSelector(...args: any[]): any
  declare var reducer: any
}
