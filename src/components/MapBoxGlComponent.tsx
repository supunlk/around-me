import React, {Component} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import MapboxGL, {CameraProps} from "@react-native-mapbox-gl/maps";
import {DistrictData} from "../models/districtData";
import {WeightedLatLng} from "react-native-maps";
import {MapState} from "../store/reducers/mapReducer";

MapboxGL.setAccessToken("pk.eyJ1Ijoic3VwdW5sayIsImEiOiJja2dubnIzcGIwMm1qMzNudms4OGdka28xIn0.r2lEmPpXn052APo9iVH-bw");

type IProps = {};
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
  mapState?: MapState;
  currentPosition: {
    latitude: number;
    longitude: number;
    heading: number;
  }
};

export default class MapBoxGlComponent extends Component<IProps, IState> {

  private _map: any;
  private wid: any
  private _location = {
    coords: {
      heading: 0
    }
  };

  private _heading = 0;

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
      currentPosition: {
        latitude: 0,
        longitude: 0,
        heading: 0
      }
    };
  }

  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  private _onUpdateMapLocation(e: any) {
    this._heading = e.coords.heading
    this.setState({
      currentPosition: {
        heading: e.coords.heading,
        latitude: e.coords.latitude,
        longitude: e.coords.longitude
      }
    })
    console.log(e, this._heading)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} compassEnabled={true}>
          <MapboxGL.UserLocation onUpdate={this._onUpdateMapLocation.bind(this)}
                                 showsUserHeadingIndicator={true}
                                 minDisplacement={10}/>
          <MapboxGL.HeatmapLayer id={'123'}/>
          <MapboxGL.Camera followUserLocation={true}
                           heading={200}
                           followUserMode={"normal"}
                           animationDuration={1000}/>
        </MapboxGL.MapView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  map: {
    flex: 1
  },
});
