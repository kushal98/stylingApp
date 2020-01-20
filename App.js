import React , {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

export default function App() {
  const [userNu , setUserNu] = useState()
  const [guessRounds , setguessRounds] = useState(0)

  const configureNewGameHandler = () =>{
    setguessRounds(0)

  }

  const startGameHandler = (selectedNu) =>{
    setUserNu(selectedNu)
    setguessRounds(0)
  }

  const gameOverHandler = (noOfRounds) =>_{
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
