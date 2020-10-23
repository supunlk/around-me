import {WeightedLatLng} from "react-native-maps";

export interface District {
  latitude: number;
  longitude: number;
  cases: number;
  district: string;
}

interface IDistrictData extends District, WeightedLatLng {}

export class DistrictData implements IDistrictData {
  latitude: number;
  longitude: number;
  weight: number;
  cases: number;
  district: string


  constructor(d: District) {
    this.latitude = d.latitude;
    this.longitude = d.longitude;
    this.weight = d.cases;
    this.cases = d.cases;
    this.district = d.district;
  }
}
