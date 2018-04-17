import React,{Component} from 'react';
import { Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ScaleAndOpacity } from 'react-native-motion';
import { getPlatformElevation } from '../src/utils';
import Content from './Content';

export default class TestItem extends Component {

  onPressed = event => {
    const { onPress, item } = this.props;
    onPress(item, event.nativeEvent);
  };

    render() {
        const { item, isSelected, style, isHidden, animateOnDidMount } = this.props;
        const { flower } = item;
        return (
          <ScaleAndOpacity
            isHidden={isHidden}
            animateOnDidMount={animateOnDidMount}
          >
            <TouchableWithoutFeedback onPress={this.onPressed}>
              <View style={[styles.container, style]} pointerEvents="box-only">
                <Content flower={flower} />
              </View>
            </TouchableWithoutFeedback>
          </ScaleAndOpacity>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3ff18b',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    ...getPlatformElevation(2),
  },
});
