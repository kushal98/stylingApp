import React , {useState, useRef, useEffect} from 'react'
import {View, Button , Text, StyleSheet, Alert} from 'react-native'
import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'

const generateRandomBetween = (min,max,exclude) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndmNo = Math.floor(Math.random() * (max - min)) + min
    if(rndmNo === exclude){
        return generateRandomBetween(min , max , exclude)
    }else{
        return rndmNo
    }
}

const GameScreen = props =>{
    const[currentGuess , setCurrentGuess] = useState(generateRandomBetween(1,100,props.userChoice))
    const[rounds , setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const {userChoice , onGameOver} = props;

    useEffect(() => {
        if(currentGuess === userChoice){
            onGameOver(rounds);
        }
    },[currentGuess , userChoice ,onGameOver]);

    const GuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) || (direction === "greater" && currentGuess > props.userChoice)){
                Alert.alert("Don't Lie", "You know this is Wrong...",[{text :'Sorry!' , style : 'cancel'}]);
                return;
        }
         if(direction === 'lower'){
            currentHigh.current = currentGuess;
         }else{
             currentLow.current = currentGuess;
         }
         const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current , currentGuess)
         setCurrentGuess(nextNumber)
         setRounds(curRounds => curRounds +1)
    }; 

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer selectNu = {currentGuess}/>
            <Card style={styles.btnContainer}>
                <Button title="Lower" onPress={GuessHandler.bind(this,'lower')}/>
                <Button title="Greater" onPress={GuessHandler.bind(this,'greater')}/>
            </Card>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex :1,
        padding: 10,
        alignItems:'center',
        justifyContent:'center'
    },
    btnContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20,
        width:300,
        maxWidth:'80%'
    }
});

export default GameScreen;