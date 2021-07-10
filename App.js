import React, { useState, useEffect } from 'react';
import {
  Button,
  View,
  Text,
  Ionicons,
  ScrollView,
  TextInput,
  SafeAreaView,
  FontAwesome,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Image
} from 'react-native';

import axios from 'axios';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

import { Fontisto } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerType="slide"
        drawerStyle={{
          backgroundColor: 'white',

          width: 200,
        }}>
        <Drawer.Screen name="Cars"  component={StackNavigator} />

        <Drawer.Screen name="ManageCarBrands" component={brands} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const StackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName={'Cars'}>
      <Stack.Screen
        name="Cars"
        component={users}
        options={{
          headerRight: () => (
            <Button
              onPress={() => {
                navigation.navigate('Addcar');
              }}
              title="Add Car"
              color="blue"
            />
          ),
        }}
      />

      <Stack.Screen name="Car Details" component={CarDetails} />
      <Stack.Screen name="Addcar" component={AddCar} />
    </Stack.Navigator>
  );
};

function users({ navigation }) {
  const [cars,setCars] = useState([]);

  useEffect(()=>{
    getData();
   },[navigation]);

  function getData() {
    const options = {
      method: 'GET',

      url: 'https://car-showroom-mad-default-rtdb.firebaseio.com/cars.json',
    };

    axios
      .request(options)
      .then(function (response) {
        for (let car in response.data) {
          setCars(cars=> [...cars, response.data[car]]);
        }
        
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const showCarDetails = (item) => {
    navigation.navigate('Car Details', {
      item: item,
    });
  };

  const Header = ({ name, openDrawer }) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => openDrawer()}>
        <Icon name="ios-menu" size={32} />
      </TouchableOpacity>

      <Text>{name}</Text>

      <Text style={{ width: 50 }}></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header name="Cars" openDrawer={navigation.openDrawer} />

      <View style={styles.paddings}>
        <Text style={styles.bigBlue}>List of Cars</Text>
        { cars.length > 0 ? (
        <FlatList
          data={cars}
          renderItem={({ item }) => (
            <View style={{paddingTop: 10}}>

            <TouchableOpacity style={styles.appButton} >

            <Text onPress={()=>{showCarDetails(item)}} style={styles.fortext2}>{item.make} {item.model}</Text>

            </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => item}
        />
        ) : (
          <Text style={{margin: 50}}>No cars found.</Text>
        )}

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 40,

    alignItems: 'center',

    backgroundColor: 'yellow',
  },

  paddings: {
    paddingTop: 20,
  },

  bigBlue: {
    color: 'black',

    fontWeight: 'bold',

    fontSize: 30,

    padding: 5,

    borderWidth: 5,

    borderColor: 'black',

    backgroundColor: 'white',
  },

  fortext2: {
    color: 'black',

    fontWeight: 'bold',

    fontSize: 15,

    padding: 5,

    borderWidth: 1,

    borderColor: 'black',

    backgroundColor: 'white',
    
    alignSelf: "center"
  },

  header: {
    width: '100%',

    height: 60,

    flexDirection: 'row',

    justifyContent: 'space-between',

    alignItems: 'center',

    paddingHorizontal: 20,

    backgroundColor: 'orange',
  },
});

const CarDetails = (props) => {
  const { item } = props.route.params;
  return (
    <View>
      <Image style={detailScreenStyles.image} source={{ uri: item.photoURL }} />
      <Text style={detailScreenStyles.title}>{item.make}</Text>
      <Text style={detailScreenStyles.title}>{item.model}</Text>
      <Text style={detailScreenStyles.title}>{item.year}</Text>
      <Text style={detailScreenStyles.price}>{item.power}</Text>
      <Text style={detailScreenStyles.description}>Color: {item.color}</Text>
    </View>
  );
};

const detailScreenStyles = StyleSheet.create({
  image: {
    width: "100%",
    height: "50%",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
    marginVertical: 7,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 3,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

function brands({ navigation }) {
  const brands = [
    'Toyota',
    'Corolla',
    'Suzuki',
    'BMW',
    'MG',
    'KIA',
    'Mercedes',
  ];

  const Header = ({ name, openDrawer }) => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => openDrawer()}>
        <Icon name="ios-menu" size={32} />
      </TouchableOpacity>

      <Text>{name}</Text>

      <Text style={{ width: 50 }}></Text>
    </View>
  );

  return (
    <View style={styles3.container}>
      <Header name="Car Brands" openDrawer={navigation.openDrawer} />
      <View style={styles.paddings}>
        <FlatList
          data={brands}
          renderItem={({ item }) => (
            <View style={{ paddingTop: 10 }}>
              <Text style={styles.fortext2}> {item} </Text>
            </View>
          )}
          keyExtractor={(item, index) => item.id}
        />
      </View>
    </View>
  );
}

const styles3 = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 40,
    backgroundColor: 'yellow',

    alignItems: 'center',
  },
});

function AddCar({ navigation }) {
  const [photoURL, setPhotoURL] = useState();
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [power, setPower] = useState();
  const [color, setColor] = useState();

  async function addCar() {
    const carObj = {
      make: make,
      photoURL: photoURL,
      year: year,
      model: model,
      power: power,
      color: color
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carObj),
    };
    fetch(
      'https://car-showroom-mad-default-rtdb.firebaseio.com/cars.json',
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
      });
    alert("New car added successfully!");
    navigation.replace('Cars');
  }

  return (
    <View style={styles7.container}>
      <Text style={styles7.fortext2}>Add Car </Text>
      <SafeAreaView>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => setPhotoURL(value)}
            placeholder="Enter Photo URL"
            value={photoURL}
            placeholderTextColor="#040000"
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => setMake(value)}
            value={make}
            placeholder="Enter Make"
            placeholderTextColor="#040000"
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => setModel(value)}
            value={model}
            placeholder="Enter Model"
            placeholderTextColor="#040000"
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => setYear(value)}
            value={year}
            placeholder="Enter Manufacturing Year"
            placeholderTextColor="#040000"
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => setPower(value)}
            value={power}
            placeholder="Enter Engine Power"
            placeholderTextColor="#040000"
          />
        </View>
        <View style={{ backgroundColor: '#fff591' }}>
          <TextInput
            style={styles7.input}
            onChangeText={(value) => setColor(value)}
            value={color}
            placeholder="Enter Car Color"
            placeholderTextColor="#040000"
          />
        </View>
      </SafeAreaView>
      <View style={styles7.add2}>
        <Button
          title="Add Car"
          color="blue"
          style={styles7.add}
          onPress={addCar}
        />
      </View>
    </View>
  );
}

const styles7 = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 40,
    backgroundColor: 'yellow',

    alignItems: 'center',
  },

  add2: {
    marginTop: 100,
    marginLeft: 100,
  },
  add: {
    marginTop: 100,
    position: 'absolute',
    left: '10',
  },

  fortext2: {
    color: '#ffffff',

    fontWeight: 'bold',

    fontSize: 40,

    borderRadius: 0,

    borderWidth: 3,

    borderColor: '#E4E102',

    backgroundColor: '#260033',
  },
});
