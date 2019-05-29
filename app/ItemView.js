import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        marginBottom: 15, 
        padding: 10,
        backgroundColor: 'white'
    },
    image: {
        width: '100%',
        height: 150
    },
    title: {
        paddingTop: 5, 
        fontSize: 20,
        fontWeight: 'bold'
    },
    resume: {
        paddingTop: 5, 
        fontSize: 15,
        fontFamily: 'arial'
    }
});

export default (props) => (
    <View style={styles.item} onPress={props.onPress}>
        <Image source={require('./generic.jpg')} style={styles.image} />
        <Text style={styles.title}>
            {props.item.titulo}
        </Text>
        <Text style={styles.resumo}>
            {props.item.titulo}{props.item.titulo}
        </Text>
    </View>
)