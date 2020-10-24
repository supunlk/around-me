import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store/configureStore";
import {StyleSheet, Text, View} from "react-native";
import MapComponent from "../components/MapComponent";
import InfoAlertIcon from "../components/InfoAlertIcon";
import SafetyInfoScreen from "./SafetyInfoScreen";
import React, {useCallback, useEffect, useState} from "react";


const MapScreen = () => {

  const districtData = useSelector((state: AppState) => state.mapData.districtData);
  const internetStatus = useSelector((state: AppState) => state.mapData.internetStatus);

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
      {!internetStatus && (
        <View style={styles.noInternet}>
          <Text style={{color: 'white'}}>No Internet. App is running on Offline mode.</Text>
        </View>
      )}
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
  noInternet: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: 'red',
  }
});

export default MapScreen;
