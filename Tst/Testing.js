import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, InteractionManager } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import { SharedElementRenderer } from 'react-native-motion';
import TestList from './TestList';
import TestDetail from './TestDetail';
import ToolbarBackground from '../src/screens/Detail/ToolbarBackground';

class Testing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      onSelectedItem: null,
      phase: 'phase-0'
    };
  }

  onItemPressed = item => {
    this.setState({
      phase: 'phase-1',
      selectedItem: item,
    });
  };

  onBackPressed = () => {
    this.setState({
      phase: 'phase-3',
    });
  };

  onSharedElementMovedToDestination = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        phase: 'phase-2',
      });
    });
  };
  onSharedElementMovedToSource = () => {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        selectedItem: null,
        phase: 'phase-0',
      });
    });
  };

  renderPage() {
    const { selectedItem, position, detailItem, phase } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <TestList
          selectedItem={selectedItem}
          onItemPress={this.onItemPressed}
          phase={phase}
        />
        <TestDetail
          phase={phase}
          selectedItem={selectedItem}
          onBackPress={this.onBackPressed}
          onSharedElementMovedToDestination={
            this.onSharedElementMovedToDestination
          }
          onSharedElementMovedToSource={this.onSharedElementMovedToSource}
        />
      </View>
    );
  }
  render() {
    const {
      selectedItem,
      goToDetail,
      position,
      detailItem,
      goBackRequested,
      phase,
    } = this.state;
    return (
      <SharedElementRenderer>
        <View style={styles.container}>
          <ToolbarBackground
            isHidden={phase !== 'phase-1' && phase !== 'phase-2'}
          />
          {this.renderPage()}
        </View>
      </SharedElementRenderer>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'tomato'
  },
});

export default Testing;
