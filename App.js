import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetPickUp from './screens/SetPickUp';
import HomeTabs from './screens/HomeTabs';
import { ContextProvider } from './context/ContextProvider';
//home 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <ContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="SetPickUp" component={SetPickUp} />
      </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  );
}

