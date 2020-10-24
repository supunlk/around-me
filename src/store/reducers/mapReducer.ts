import {DistrictData} from '../../models/districtData'
import {GET_MAP_DATA, GET_MAP_DATA_SUCCESS, INTERNET_STATUS, MapActionTypes} from "../actions/mapActionTypes";

export interface MapState {
  districtData: DistrictData[];
  loading: boolean;
  internetStatus: boolean;
}

const initialState: MapState = {
  districtData: [],
  loading: true,
  internetStatus: true
}


const mapReducer = (state: MapState = initialState, action: MapActionTypes): MapState => {

  switch (action.type) {
    case GET_MAP_DATA:
      return {
        ...state,
      }

    case INTERNET_STATUS:
      return {
        ...state,
        internetStatus: action.payload
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
