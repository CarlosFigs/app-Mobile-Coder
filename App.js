import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import TabsNavigation from './src/navigation/tabs/TabsNavigation';
import { Provider } from 'react-redux';
import { Store } from './src/store';

// ESte hook lo que evita es que se oculte la pantalla screen, como la inicial
SplashScreen.preventAutoHideAsync();
export default function App() {
  //
  const [loaded, error] = useFonts({
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf')
  });

  // este use effect funciona para cargar las letras antes de mostrar la screen principal, se pueden hacer mas validaciones
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync()
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      <Provider store={Store}>
        <NavigationContainer>
          <StatusBar style='auto' />
          <TabsNavigation />
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
