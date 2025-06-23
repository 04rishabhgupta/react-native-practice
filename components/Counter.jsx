import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../styles';

const Counter = () => {
    const [count, setCount] = useState(0);

    const resetCounter = () => setCount(0);

    return (
        <View>
            <Text style={styles.counterText}>Counter: {count}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Increment Count" onPress={() => setCount(count + 1)} />
                <Button title="Decrement Count" onPress={() => setCount(count - 1)} />
                <Button title="Reset Counter" onPress={resetCounter} />
            </View>
        </View>
    );
};

export default Counter;
