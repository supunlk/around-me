import {GET_MAP_DATA, GET_MAP_DATA_FAILURE, GET_MAP_DATA_SUCCESS, MapActionTypes} from "./mapActionTypes";
import {Dispatch} from "redux";
import axios from "axios";
import firestore, {FirebaseFirestoreTypes,} from '@react-native-firebase/firestore';
import {District, DistrictData} from "../../models/districtData";
import {fetchDistrict, insertDistrict} from "../../helpers/db";

const insertDistrictsToDb = async (id: string, d: DistrictData) => {
  const district = await fetchDistrict(id);

  console.log(district);

  if (district === null) {
    const res = await insertDistrict(id, d.latitude, d.longitude, d.weight, d.cases, d.district)
    console.log('district successfully added to database');
  }
}

export const GetMapData = () => async (dispatch: Dispatch<MapActionTypes>) => {

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
        districtDataArray.push(new DistrictData(d))
      }
    })

    insertDistrict('123', 1, 1, 1, 1, 'test')

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

