import {DistrictData} from "../../models/districtData";

export const GET_MAP_DATA = 'GET_MAP_DATA';
export const GET_MAP_DATA_SUCCESS = 'GET_MAP_DATA_SUCCESS';
export const GET_MAP_DATA_FAILURE = 'GET_MAP_DATA_FAILURE';

export interface GetMapData {
  type: typeof GET_MAP_DATA;
}

export interface GetMapDataSuccess {
  type: typeof GET_MAP_DATA_SUCCESS;
  payload: DistrictData[]
}

export interface GetMapDataFailure {
  type: typeof GET_MAP_DATA_FAILURE;
  payload: DistrictData[]
}

export type MapActionTypes = GetMapData | GetMapDataSuccess | GetMapDataFailure;
