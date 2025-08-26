import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import Categories from './src/screens/Categories';
import Products from './src/screens/Products'
import Header from './src/components/Header';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'

// ESte hook lo que evita es que se oculte la pantalla screen, como la inicial
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [categorySelected, setCategorySelected] = useState("")
  //
  const [loaded,error]=useFonts({
    'Lato-Regular':require('./assets/fonts/Lato-Regular.ttf'),
    'Lato-Bold':require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Light':require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Black':require('./assets/fonts/Lato-Black.ttf')
  });

  // este use effect funciona para cargar las letras antes de mostrar la screen principal, se pueden hacer mas validaciones
  useEffect(()=>{
    if(loaded||error){
      SplashScreen.hideAsync()
    }
  },[loaded,error]);
  return (
    <>
      <StatusBar style='auto' />
      {
        categorySelected
          ?
          //los parmetros se pasan con una key que recibe el componente y el valor 
          <>
          <Header title="Tienda" subtitle="Productos" />
          <Products categorySelected={categorySelected}/>
          </>
          :
                    <>
          <Header title="Tienda" subtitle="Categoria" />
          <Categories setCategorySelected={setCategorySelected} />
          </>

      }

    </>
  );
}

const styles = StyleSheet.create({});
