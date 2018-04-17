import React, { PureComponent } from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'native-base';

import { Row } from '../../components';
// import translateAndOpacity from '../../animations/translateAndOpacity';

class Toolbar extends PureComponent {

  renderDetail() {
    const { opacityValue, translateY } = this.state;
    const { onBackPress } = this.props;

    return (
      <View style={styles.container}>
        {/*<View style={styles.statusBar} />*/}
        <TouchableWithoutFeedback onPress={onBackPress}>
          <Animated.View style={animationStyle}>
            <Row style={styles.toolbarContainer}>
              <Row style={styles.backContainer}>
                <Icon name="ios-arrow-back" />
                <Text style={styles.titleBackText}>Back</Text>
              </Row>
              <View style={styles.menuIconContainer}>
                <Icon name='home' />
              </View>
            </Row>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        {/*<View style={styles.statusBar} />*/}
        <View>
          <Row style={styles.toolbarContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>My Checks</Text>
            </View>
            <View style={styles.menuIconContainer}>
              <Icon name="md-menu" size={24} color="#008dff" />
            </View>
            <View style={styles.menuIconContainer}>
              <Icon name='home'/>
            </View>
          </Row>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  toolbarContainer: {
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#F3B93B'
  },
  titleContainer: {
    flex: 1,
  },
  // toolbarBackground: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: 150,
  //   backgroundColor: 'red',
  // },
  statusBar: {
    // height: 24,
    // backgroundColor: 'red',
  },
  titleBackText: {
    color: 'white',
    marginLeft: 8,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
  },
  backContainer: {
    flex: 1,
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Toolbar;
// export default translateAndOpacity(Toolbar);
