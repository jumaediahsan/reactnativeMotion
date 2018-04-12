import React,{Component} from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements'

var flowers = [
  {key: 'mawar'},
  {key: 'melati'},
  {key: 'dahlia'},
  {key: 'anggrek'}
]

export default class Testing2 extends Component {

  renderItem = ({ item }) => (
    <ListItem
      title={item.key}
    />
  )
    render() {

        return (
            <View style={{flex: 1}}>
              <FlatList
                data={flowers}
                renderItem={this.renderItem}
              />
            </View>
        );
    }
}
