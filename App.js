import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./SRC/Screens/Home";
import Details from "./SRC/Screens/Details";
import { NativeBaseProvider } from "native-base";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <Home />
    <NativeBaseProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Details' component={Details}/>
      </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  )
}