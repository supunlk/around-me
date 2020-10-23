import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store/configureStore";
import {StyleSheet, Text, View} from "react-native";
import MapComponent from "../components/MapComponent";
import InfoAlertIcon from "../components/InfoAlertIcon";
import SafetyInfoScreen from "./SafetyInfoScreen";
import React, {useCallback, useEffect, useState} from "react";


const MapScreen = () => {

  const districtData = useSelector((state: AppState) => state.mapData.districtData);

  const [isUserInDangerArea, setIsUserInDangerArea] = useState(false);
  const [showSafetyInfo, setShowSafetyInfo] = useState(false);

  const showSafetyInfoHandler = () => {
    setShowSafetyInfo(true)
  }

  const hideSafetyInfoHandler = () => {
    setShowSafetyInfo(false)
  }
  return (
    <View style={styles.container}>
      <MapComponent showSafetyInfo={showSafetyInfoHandler}
                    hideSafetyInfo={hideSafetyInfoHandler}
                    districtData={districtData}
                    isUserInDangerArea={(isInDanger: boolean) => setIsUserInDangerArea(isInDanger)}/>
      {isUserInDangerArea &&
      <InfoAlertIcon pressAlert={showSafetyInfoHandler}/>
      }
      <SafetyInfoScreen modalVisible={showSafetyInfo}
                        closeSafetyInfo={hideSafetyInfoHandler}/>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  map: {
    height: '100%',
  },
});

export default MapScreen;
