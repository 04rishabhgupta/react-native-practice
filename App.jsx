import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Text, TextInput, View, Button, Linking, Modal, ScrollView, Image, Animated, FlatList } from 'react-native';
import styles from './styles';

// Lazy load components
const Counter = lazy(() => import('./components/Counter'));
const StaticGrid = lazy(() => import('./components/StaticGrid'));
const DynamicGrid = lazy(() => import('./components/DynamicGrid'));
import users from './data/users';
import products from './data/products';

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [display, setDisplay] = useState(false);

  const [count, setCount] = useState(0);
  const resetCounter = () => setCount(0);

  const [modalVisible, setModalVisible] = useState(false);
  const age = 23;

  const reset = () => {
    if (name || email || pass) { // Only reset if there's a change in form
      setDisplay(false);
      setName('');
      setEmail('');
      setPass('');
    }
  };

  const openWebsite = () => Linking.openURL('https://www.youtube.com/');
  const makeCall = () => Linking.openURL('tel:+8826891513');
  const sendEmail = () => Linking.openURL('mailto:04rishabhgupta@gmail.com');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const [posts, setPosts] = useState([]);
  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    console.log('App component mounted.');

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true
    }).start();

    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch(() => {
        setPosts([{
          id: 'error',
          title: 'Failed to load posts',
          body: 'Try later.'
        }]);
      });
  }, []);

  useEffect(() => {
    console.log('Name changed:', name);
  }, [name]);

  // Basic list optimization with FlatList
  const renderItem = ({ item }) => (
    <Text style={styles.listItem}>
      {item.name} - {item.id}
    </Text>
  );

  const keyExtractor = (item) => item.id.toString();  // Ensuring unique keys for each item

  return (
    <ScrollView style={styles.container}>
      <Animated.Text style={{ ...styles.header, opacity: fadeAnim }}>
        User List
      </Animated.Text>

      {/* Using FlatList for optimized rendering */}
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        initialNumToRender={10}  // Render 10 items initially
      />

      <Text style={styles.subHeader}>Your age is {age}</Text>
      {age >= 18 ? (
        <Text style={{ ...styles.subHeader, color: 'green' }}>You are an Adult</Text>
      ) : (
        <Text style={{ ...styles.subHeader, color: 'red' }}>You are a Child</Text>
      )}

      
      {/* Basic form in react native */}
      <Text style={styles.subHeader}>Form</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Enter Username'
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Enter Email'
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        placeholder='Enter Password'
        secureTextEntry={true}
        onChangeText={(text) => setPass(text)}
        value={pass}
      />
      <View style={styles.buttonContainer}>
        <Button title='Fetch Details' onPress={() => setDisplay(true)} />
      </View>
      <Button title='Clear' onPress={reset} />

      {display && (
        <View>
          <Text style={styles.subHeader}>{name}</Text>
          <Text style={styles.subHeader}>{email}</Text>
          <Text style={styles.subHeader}>{pass}</Text>
        </View>
      )}

      {/* Lazy-loaded components */}
      <Suspense fallback={<Text>Loading...</Text>}>
        <Counter />
        <StaticGrid />
        <DynamicGrid data={users} />
      </Suspense>

      {/* Linking and deep linking */}
      <View>
        <Text style={styles.subHeader}>Linking Functionality:</Text>
        <Button title="Open Website" onPress={openWebsite} />
        <Button title="Make Phone Call" onPress={makeCall} />
        <Button title="Send Email" onPress={sendEmail} />
      </View>

      {products.map((item, index) => (
        <View key={index} style={{ alignItems: 'center', borderBottomColor: 'navy', borderBottomWidth: 3, padding: 10 }}>
          <Text>{item.name}</Text>
          <Text>{item.color}</Text>
          <Text>{item.price}</Text>
          <Image style={{ width: 100, height: 100 }} source={{ uri: item.image }} />
          <Button title='Add to cart' />
        </View>
      ))}

      <View>
        <Text style={styles.subHeader}>Latest Posts (via API):</Text>
        {posts.map(post => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text>{post.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Open Modal" onPress={openModal} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContent}>
            <Text>This is a Basic Modal</Text>
            <Button title="Close Modal" onPress={closeModal} />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default App;
