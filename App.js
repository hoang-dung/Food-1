import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {Home, Restaurant, OrderDelivery} from './screens';
import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Restaurant"
          component={Restaurant}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OrderDelivery"
          component={OrderDelivery}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
