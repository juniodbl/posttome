import React from 'react';
import { FlatList, Text, View } from 'react-native';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>NOTICIAS: </Text>
        <FlatList
          data={[
            { key: 'Devin' },
            { key: 'Jackson' },
            { key: 'James' },
            { key: 'Joel' },
            { key: 'John' },
            { key: 'Jillian' },
            { key: 'Jimmy' },
            { key: 'Julie' },
          ]}
          renderItem={({ item }) => <Text onPress={()=>{alert(item.key)}}>{item.key}</Text>}
        />
      </View>
    );
  }
}