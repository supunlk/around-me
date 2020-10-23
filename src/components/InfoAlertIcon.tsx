import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';
import AnimatedLottieView from "lottie-react-native";

type IProps = {
  pressAlert: () => void;
};
type IState = {};

export default class InfoAlertIcon extends Component<IProps, IState> {


  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  testPress() {
    console.log('aaaa')
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.pressAlert}>
          <LottieView loop
                      style={{height: 100}}
                      autoPlay
                      source={require('../../assets/lottie/alert.json')}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    position: "absolute",
    width: 100,
    right: '35%',
    top: 10
  },
});
