import React,{Component} from 'react';
import { Text, View, FlatList, StyleSheet, Easing, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-native-motion';
import ListItem  from './TestItem';
import data from './TestData';
import Toolbar from '../src/screens/List/Toolbar';

export default class TestList extends Component {

  constructor(props) {
    super(props);

    this.state = { opacityOfSelectedItem: 1, selectedItem: null };
    this.sharedElementRefs = {};
  }
  onListItemPressed = item => {
    const { onItemPress } = this.props;
    this.setState({ selectedItem: item });

    onItemPress(item);

    this.sharedElementRefs[item.flower].moveToDestination();
  };
  onMoveToDestinationWillStart = () => {
    this.setState({ opacityOfSelectedItem: 0 });
  };
  onMoveToSourceDidFinish = () => {
    this.setState({ opacityOfSelectedItem: 1 });
  };
  getSharedNode = props => {
    const { item } = props;

    return (
      <View style={{ backgroundColor: 'transparent' }}>
        <ListItem item={item} animateOnDidMount={false} isHidden={false} />
      </View>
    );
  };

  renderItem = ({ item }) => {
    const { opacityOfSelectedItem } = this.state;
    const { selectedItem } = this.props;

    const isHidden = selectedItem && selectedItem.flower !== item.flower;
    const isSelected = selectedItem && selectedItem.flower === item.flower;
    const id = item.flower;
    return (
      <SharedElement
        easing={Easing.in(Easing.back())}
        ref={node => (this.sharedElementRefs[id] = node)}
        id={id}
        onMoveToDestinationWillStart={this.onMoveToDestinationWillStart}
        onMoveToSourceDidFinish={this.onMoveToSourceDidFinish}
        getNode={this.getSharedNode}
        item={item}
      >
        <View
          style={{
            opacity: opacityOfSelectedItem,
            backgroundColor: 'transparent',
          }}
        >
          <ListItem
            item={item}
            onPress={this.onListItemPressed}
            isHidden={isHidden}
          />
        </View>
      </SharedElement>
    )
  }
    render() {
      const { opacityOfSelectedItem } = this.state;
      const { selectedItem, phase } = this.props;
      return (
          <View style={styles.container}>
            <Toolbar
              isHidden={phase !== 'phase-0'}
              onBackPress={this.onBackPressed}
            />
            <FlatList
              data={data}
              dataExtra={{ phase, opacityOfSelectedItem }}
              keyExtractor={item => item.flower}
              renderItem={this.renderItem}
            />
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'blue'
  },
});
