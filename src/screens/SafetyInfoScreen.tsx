import React, {Component} from 'react';
import {Button, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from "lottie-react-native";

type IProps = {
  modalVisible: boolean;
  closeSafetyInfo: () => void;
};
type IState = {
  modalVisible: boolean
};

export default class SafetyInfoScreen extends Component<IProps, IState> {

  setModalVisible = (visible: boolean) => {
    this.setState({modalVisible: visible});
  }

  constructor(props: any) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          visible={this.props.modalVisible}
          transparent={true}>
          <View style={styles.safetyInfoContainer}>
            <View style={styles.titleContainer}>
              <View style={styles.titleIcon}>
                <LottieView loop
                            style={{height: 60}}
                            autoPlay
                            source={require('../../assets/lottie/covid19.json')}/>
              </View>
              <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>You entered covid 19 high risk zone. Please always make sure your safety!</Text>
              </View>
            </View>
            <ScrollView style={styles.safetyGuidesContainer}>
              <View style={styles.guide}>
                <View style={styles.guideText}>
                  <Text style={styles.guideTextTitle}>Wear a mask</Text>

                </View>
                <View style={styles.guideIcon}>
                <LottieView loop
                            style={{height: 100}}
                            autoPlay
                            source={require('../../assets/lottie/wear-your-mask-please.json')}/>
                </View>
                <Text>Wear a mask when physical distancing is not possible. Don’t touch your eyes, nose or mouth.</Text>
              </View>
              <View style={styles.guide}>
                <View style={styles.guideText}>
                  <Text style={styles.guideTextTitle}>Clean your hands</Text>

                </View>
                <View style={styles.guideIcon}>
                  <LottieView loop
                              style={{height: 100}}
                              autoPlay
                              source={require('../../assets/lottie/clean-hands.json')}/>
                </View>
                <Text>Clean your hands often. Use soap and water, or an alcohol-based hand rub.</Text>
              </View>
              <View style={styles.guide}>
                <View style={styles.guideText}>
                  <Text style={styles.guideTextTitle}>Keep a safe distance</Text>

                </View>
                <View style={styles.guideIcon}>
                  <LottieView loop
                              style={{height: 150}}
                              autoPlay
                              source={require('../../assets/lottie/social-distance.json')}/>
                </View>
                <Text>Maintain a safe distance from anyone who is coughing or sneezing.</Text>
              </View>
            </ScrollView>
            <TouchableOpacity style={styles.closeModal} onPress={this.props.closeSafetyInfo}>
              <Text style={{color: 'white', fontSize: 20}}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%'

  },
  safetyInfoContainer: {
    backgroundColor: 'white',
    flex: 1,
    margin: 20,
    borderRadius: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'yellow',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
  },
  titleIcon: {
    marginRight: 10
  },
  titleTextContainer: {
    flex: 1
  },
  titleText: {
    fontSize: 18,
    alignContent: "center"
  },
  safetyGuidesContainer: {
    flex: 1
  },
  guide: {
    padding: 10,
    alignItems: "center",
    backgroundColor: '#e5e5e5',
    margin: 10,
  },
  guideText: {
  },
  guideTextTitle: {
    fontSize: 22
  },
  guideIcon: {
  },
  closeModal: {
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    margin: 10
  }
});
