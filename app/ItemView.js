import React from 'react';
import { Image, View, Text, StyleSheet, TouchableHighlight } from 'react-native';

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

export default (props) => {
    let image = { uri: props.item.imageTemplate };

    if (!props.item.imageTemplate) {
        image = require('./generic.jpg');
    }

    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={styles.item}>
                <Image source={image} style={styles.image} />
                <Text style={styles.title}>
                    {props.item.titulo}
                </Text>
                <Text style={styles.resumo}>
                    {props.item.resumo.replace(new RegExp("<.*?>", "gm"), "")}
                </Text>
            </View>
        </TouchableHighlight>
    )
}