import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetPickUp from './screens/SetPickUp';
import HomeTabs from './screens/HomeTabs';
import { ContextProvider } from './context/ContextProvider';
import Schedule from './components/Schedule'
//home 
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <ContextProvider>
      <Stack.Navigator
      screenOptions = {({route}) => ({
        headerShown: false,
      })}
      >
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="SetPickUp" component={SetPickUp} />
        {/*<Stack.Screen name="Schedule" component={Schedule} />*/}
      </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  );
}

