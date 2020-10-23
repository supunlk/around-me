import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Heatmap, WeightedLatLng, Circle} from 'react-native-maps'
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';
import {PERMISSIONS, request} from 'react-native-permissions';
import isPointWithinRadius from "geolib/es/isPointWithinRadius";
import findNearest from "geolib/es/findNearest";

import {DistrictData} from "../models/districtData";
import {MapState} from "../store/reducers/mapReducer";

type IProps = {
  showSafetyInfo: () => void;
  hideSafetyInfo: () => void
  isUserInDangerArea: (isInDanger: boolean) => void;
  districtData: DistrictData[]
};
type IState = {
  initialPosition: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  },
  heatMapData: WeightedLatLng[];
  showSafetyInfo: boolean;
  isUserInDangerArea: boolean;
  mapState?: MapState
};

export default class MapComponent extends Component<IProps, IState> {

  private _map: any;
  private wid: any


  constructor(props: any) {
    super(props);

    this.state = {
      initialPosition: {
        latitude: 7.8,
        longitude: 80.80,
        latitudeDelta: 2.6,
        longitudeDelta: 2.6,
      },
      heatMapData: [],
      showSafetyInfo: false,
      isUserInDangerArea: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
                 provider={PROVIDER_GOOGLE}
                 showsUserLocation={true}

                 initialRegion={this.state.initialPosition}
                 ref={map => this._map = map}>
          <Heatmap points={this.state.heatMapData}
                   opacity={0.8}
                   gradient={{
                     colors: [
                       'green',
                       'yellow',
                       'red'
                     ],
                     startPoints: [
                       0.01,
                       0.05,
                       0.3
                     ],
                     colorMapSize: 5000,
                   }}
                   radius={40}/>
          {this.state.heatMapData.map((p, index) => (
            <Circle center={{longitude: p.longitude, latitude: p.latitude}} radius={(p.weight as number) * 10}
                    key={index}/>
          ))}
        </MapView>
      </View>
    );
  }

  componentDidMount() {
    this._requestLocationPermission();
    this.setState({heatMapData: this.props.districtData})
  }

  componentWillUnmount() {
    console.log('[unmount]');
    Geolocation.clearWatch(this.wid)
  }

  /**
   * Request location permission
   * @private
   */
  private async _requestLocationPermission() {
    if (Platform.OS === 'android') {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)

      console.log('android', response)
      if (response === "granted") {
        this._locateCurrentPosition()
      }
    }
  }

  /**
   * locate/track current location
   * @private
   */
  private _locateCurrentPosition() {

    Geolocation.getCurrentPosition(
      (position) => {
        this._updateCamara(position.coords, (position.coords.heading as number));
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    );

    this.wid = Geolocation.watchPosition(
      (position) => {
        const nearestGeoFence = (findNearest(position.coords, this.state.heatMapData) as WeightedLatLng)
        this._checkCurrentLocationIsWithinTheRadius(position.coords, nearestGeoFence);
        this._updateCamara(position.coords, (position.coords.heading as number));
      },
      (error) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, interval: 5000}
    );
  }

  /**
   *
   * @param coords
   * @param nearestGeoFence
   * @private
   * void
   */
  private _checkCurrentLocationIsWithinTheRadius(coords: GeoCoordinates, nearestGeoFence: WeightedLatLng): void {
    const isUserInDangerArea = isPointWithinRadius(
      coords,
      {
        latitude: nearestGeoFence.latitude,
        longitude: nearestGeoFence.longitude,
      }, ((nearestGeoFence.weight as number) * 10))

    console.log('isUserInDangerArea', isUserInDangerArea)

    if (!this.state.isUserInDangerArea && isUserInDangerArea) {
      this.setState({isUserInDangerArea});
      this.props.showSafetyInfo()
      this.props.isUserInDangerArea(true)
    } else if (this.state.isUserInDangerArea && !isUserInDangerArea) {
      this.setState({isUserInDangerArea: false});
      this.props.hideSafetyInfo()
      this.props.isUserInDangerArea(false)
    }
  }

  private _updateCamara(coords: GeoCoordinates, heading: number) {
    if(this._map && this._map.animateCamera) {
      this._map.animateCamera({
        center: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
        pitch: 70,
        altitude: 5,
        heading: heading,
        zoom: 16.5,
      }, {
        duration: 1000
      })
    }

  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  map: {
    height: '100%',
  },
});
