import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  icons,
  images,
  SIZES,
  COLORS,
  FONTS,
  GOOGLE_API_KEY,
} from '../constants';

const OrderDelivery = ({route, navigation}) => {
  const [restaurant, setRestaurant] = useState(null);
  const [streetName, setStreetName] = useState('');
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    let {restaurant, currentLocation} = route.params;
    console.log(currentLocation, 'currentLocation');
    let fromLoc = currentLocation.gps;
    let toLoc = restaurant.location;
    let street = currentLocation.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };

    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  const renderMap = () => {
    return (
      <View style={styles.containerMaps}>
        <MapView
          style={styles.containerMapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}>
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey={GOOGLE_API_KEY}
            strokeWidth={5}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
          />

          {destinationMarker()}
        </MapView>
      </View>
    );
  };

  const destinationMarker = () => {
    return (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}>
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.primary,
            }}>
            <Image
              source={icons.pin}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS.white,
              }}
            />
          </View>
        </View>
      </Marker>
    );
  };

  return <View style={styles.container}>{renderMap()}</View>;
};

export default OrderDelivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMaps: {
    flex: 1,
  },
  containerMapView: {
    flex: 1,
  },
});
