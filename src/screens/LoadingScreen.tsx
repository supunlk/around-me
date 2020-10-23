import React, {Component} from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LottieView from 'lottie-react-native';

type IProps = {
};
type IState = {};

export default class LoadingScreen extends Component<IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <LottieView loop
                    autoPlay
                    source={require('../../assets/lottie/needs-your-location-or-gps.json')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
