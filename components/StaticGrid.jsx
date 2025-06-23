import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

const StaticGrid = () => {
    return (
        <View>
            <Text style={{ fontSize: 30 }}>Static Grid</Text>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.item}>ListItem 0</Text>
                <Text style={styles.item}>ListItem 1</Text>
                <Text style={styles.item}>ListItem 2</Text>
                <Text style={styles.item}>ListItem 3</Text>
                <Text style={styles.item}>ListItem 4</Text>
                <Text style={styles.item}>ListItem 5</Text>
                <Text style={styles.item}>ListItem 6</Text>
                <Text style={styles.item}>ListItem 7</Text>
            </View>
        </View>
    );
};

export default StaticGrid;
