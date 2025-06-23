// components/DynamicGrid.js
import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

const DynamicGrid = ({ data = [] }) => {
    return (
        <View>
            <Text style={{ fontSize: 30 }}>Dynamic Grid</Text>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.map((itemDynamic) => (
                    <Text key={itemDynamic.id} style={styles.itemDynamic}>
                        {itemDynamic.name}
                    </Text>
                ))}
            </View>
        </View>
    );
};

export default DynamicGrid;
