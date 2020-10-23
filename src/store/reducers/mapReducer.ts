import {DistrictData} from '../../models/districtData'
import {GET_MAP_DATA, GET_MAP_DATA_SUCCESS, MapActionTypes} from "../actions/mapActionTypes";

export interface MapState {
  districtData: DistrictData[];
  loading: boolean;
}

const initialState: MapState = {
  districtData: [],
  loading: true
}


const mapReducer = (state: MapState = initialState, action: MapActionTypes): MapState => {

  switch (action.type) {
    case GET_MAP_DATA:
      return {
        ...state,
      }

    case GET_MAP_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        districtData: action.payload
      }
  }

  return state
}

export default mapReducer
