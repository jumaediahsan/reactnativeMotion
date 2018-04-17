import React,{Component} from 'react';
import { View, Text } from 'react-native';

export default class Content extends Component {

    render() {
      const { flower } = this.props;
        return (
            <View style={styles.container}>
              <Text style={{color: 'black', fontSize: 16}}>{flower}</Text>
            </View>
        );
    }
}

const styles = {
  container: {
    height: 56,
    alignItems: 'center',
    backgroundColor: '#F3B93B'
  },
}
