import React , {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'
import * as font from 'expo-font';
import { AppLoading , Font } from 'expo'

const fetchFonts = () =>{
  return font.loadAsync({
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
  });
};


export default function App() {
  const [userNu , setUserNu] = useState()
  const [guessRounds , setguessRounds] = useState(0)
  const [dataLoaded , setDataLoaded] = useState(false)

  if(!dataLoaded){
    <AppLoading startAsync={fetchFonts} 
      onFinish={() => {setDataLoaded(true)}}
      onError = {(err) => {console.log(err)}}  />
  }

  const configureNewGameHandler = () =>{
    setguessRounds(0)
    setUserNu(null)
  }

  const startGameHandler = (selectedNu) =>{
    setUserNu(selectedNu) 
  }

  const gameOverHandler = (noOfRounds) =>{
    setguessRounds(noOfRounds)
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />
  if (userNu && guessRounds <= 0){
    content = <GameScreen userChoice={userNu} onGameOver = {gameOverHandler}/>
  }else if(guessRounds >0){
    content = <GameOverScreen roundsNu ={guessRounds} userNumber = {userNu} Restart={configureNewGameHandler}/>
  }

  return (
    <View style = {styles.screen}>
      <Header title="Guess a No."/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex : 1,
  }
});
