import React,{Component} from 'react';
import {
  Easing,
  InteractionManager,
  Animated,
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { SharedElement, TranslateYAndOpacity } from 'react-native-motion';

import data from './TestData';
import TestItem from './TestItem';
import TestBackDetail from './TestBackDetail';

export default class TestDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacityOfDestinationItem: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.phase === 'phase-2' && nextProps.phase === 'phase-3') {
      this.sharedElementRef.moveToSource();
    }
  }
  onMoveToDestinationDidFinish = () => {
    this.setState({ opacityOfDestinationItem: 1 });
    this.props.onSharedElementMovedToDestination();
  };
  onMoveToSourceWillStart = () => {
    this.setState({ opacityOfDestinationItem: 0 });
  };
  renderItem = ({ item, index }) => {
    const { phase, selectedItem } = this.props;

    let delay = index;
    // we need it to go from the end
    if (phase === 'phase-3') {
      delay = selectedItem.items.length - index;
    }
    return(
      <TranslateYAndOpacity isHidden={phase !== 'phase-2'} delay={56 * delay}>
        <View style={{flex: 1}}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.name}</Text>
          </View>
          <Text style={styles.vatText}>{item.suami}</Text>
        </View>
      </TranslateYAndOpacity>
    )
  }
  render() {
      const {
        selectedItem,
        startPosition,
        phase,
        onBackPress,
        onSharedElementMovedToSource,
      } = this.props;
      const { opacityOfDestinationItem } = this.state;

      const { items = [] } = selectedItem || {};

      if (!selectedItem) {
        return null;
      }
      return (
          <View style={styles.container}>
            <TestBackDetail isHidden={phase === 'phase-3'} onBackPress={onBackPress}/>
            <SharedElement
              ref={node => (this.sharedElementRef = node)}
              sourceId={selectedItem.name}
              easing={Easing.in(Easing.back())}
              onMoveToDestinationDidFinish={this.onMoveToDestinationDidFinish}
              onMoveToSourceWillStart={this.onMoveToSourceWillStart}
              onMoveToSourceDidFinish={onSharedElementMovedToSource}
            >
              <View
                style={{
                  opacity: opacityOfDestinationItem,
                  backgroundColor: 'transparent',
                }}
              >
                <TestItem
                  item={selectedItem}
                  onPress={() => {}}
                  animateOnDidMount={false}
                  isHidden={false}
                />
              </View>
            </SharedElement>
            <FlatList
              data={items}
              dataExtra={phase}
              keyExtractor={item => item.suami}
              renderItem={this.renderItem}
            />
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
  },
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  rowContainer: {
    alignItems: 'center',
  },
  titleText: {},
  amountText: {
    fontSize: 18,
    fontWeight: '900',
    color: 'black'
  },
  vatText: {
    fontSize: 10,
    color: 'black',
  },
});
