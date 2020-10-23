import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';

import InfoAlertIcon from "../components/InfoAlertIcon";
import SafetyInfoScreen from "./SafetyInfoScreen";
import MapComponent from "../components/MapComponent";
import {DistrictData} from "../models/districtData";


type IProps = {
  mapData: DistrictData[]
};
type IState = {
  showSafetyInfo: boolean;
  isUserInDangerArea: boolean;
};

export default class MapScreen12 extends Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      showSafetyInfo: false,
      isUserInDangerArea: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapComponent showSafetyInfo={this.showSafetyInfo.bind(this)}
                      hideSafetyInfo={this.hideSafetyInfo.bind(this)}
                      isUserInDangerArea={(isInDanger: boolean) => this.setState({isUserInDangerArea: isInDanger})}/>
        {this.state.isUserInDangerArea &&
        <InfoAlertIcon pressAlert={this.showSafetyInfo.bind(this)}/>
        }
        <SafetyInfoScreen modalVisible={this.state.showSafetyInfo}
                          closeSafetyInfo={this.hideSafetyInfo.bind(this)}/>
      </View>
    );
  }

  showSafetyInfo() {
    this.setState({showSafetyInfo: true})
  }

  hideSafetyInfo() {
    this.setState({showSafetyInfo: false})
  }

  componentDidMount() {
    console.log(this.props.mapData);
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
