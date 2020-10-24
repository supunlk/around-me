import {
  GET_MAP_DATA,
  GET_MAP_DATA_FAILURE,
  GET_MAP_DATA_SUCCESS,
  INTERNET_STATUS,
  MapActionTypes
} from "./mapActionTypes";
import {Dispatch} from "redux";
import firestore from '@react-native-firebase/firestore';
import {District, DistrictData} from "../../models/districtData";
import {fetchDistricts, insertDistrict} from "../../helpers/db";

const insertDistrictsToDb = async (id: string, d: DistrictData) => {

  try {
    const res = await insertDistrict(id, d.latitude, d.longitude, d.weight, d.cases, d.district);
    console.log('district successfully added to database');
  } catch (err) {
  }
}

export const GetMapData = () => async (dispatch: Dispatch<MapActionTypes>) => {

  dispatch({
    type: INTERNET_STATUS,
    payload: true
  })

  try {
    dispatch({
      type: GET_MAP_DATA
    })

    const districtsDocumentSnapshot = await firestore()
      .collection('Districts')
      .get()

    const districtDataArray: DistrictData[] = [];

    districtsDocumentSnapshot.forEach(documentSnapshot => {
      const d = (documentSnapshot.data() as District);
      if ((d.longitude !== 0 && d.latitude !== 0 && d.cases !== 0)) {
        const dis = new DistrictData(d);
        districtDataArray.push(dis);
        insertDistrictsToDb(documentSnapshot.id, dis);
      }
    })

    dispatch({
      type: GET_MAP_DATA_SUCCESS,
      payload: districtDataArray
    });

  } catch (e) {
    console.log(e)
    dispatch({
      type: GET_MAP_DATA_FAILURE,
      payload: e
    })
  }
}

export const GetMapDataFromLocalDb = () => async (dispatch: Dispatch<MapActionTypes>) => {

  dispatch({
    type: INTERNET_STATUS,
    payload: false
  })

  try {
    dispatch({
      type: GET_MAP_DATA
    })

    const districts = await fetchDistricts();

    console.log(districts, typeof districts)

    dispatch({
      type: GET_MAP_DATA_SUCCESS,
      payload: districts
    });

  } catch (e) {
    console.log(e)
    dispatch({
      type: GET_MAP_DATA_FAILURE,
      payload: e
    })
  }
}
