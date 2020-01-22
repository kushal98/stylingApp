import React from 'react'
import {View , Text , StyleSheet, Button} from 'react-native'

const GameOverScreen = props =>{
    return(
        <View style = {styles.screen}>
            <Text>The Game is Over !!</Text>
            <Text>No. of Rounds: {props.roundNu}</Text>
            <Text>Number was : {props.userNumber}</Text>
            <Button title="New Game" onPress={props.Restart}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex : 1,
        justifyContent: 'center',
        alignItems : 'center',
    }
})

export default GameOverScreen;