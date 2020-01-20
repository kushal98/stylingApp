import React , {useState} from 'react'
import {View , Text , StyleSheet, TextInput, Button , TouchableWithoutFeedback , Keyboard , Alert} from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/Color'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer'

const StartGameScreen = props =>{
    const [enteredValue , setEnteredValue] = useState('')
    const [confirmed , setConfirmed] = useState(false)
    const [selectedNu , setSelectedNu] = useState()

    const numberInpHandler = inputText =>{
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    }
    
    const resetInpHandler = () =>{
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () =>{
        const choosenNu = parseInt(enteredValue)
        if(isNaN(choosenNu) || choosenNu <= 0 || choosenNu > 99){
            Alert.alert('Invalid Number' , 'Number has to be between 1 and 99',[{text : 'Okay' , style: 'destructive', onPress: resetInpHandler}])
            return;
        }
        setConfirmed(true)
        setSelectedNu(parseInt(choosenNu))
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput;

    if(confirmed){
        confirmedOutput = 
            <Card style={styles.summaryContainer}>
                <Text>You Selected</Text>
                <NumberContainer selectNu = {selectedNu}/>
                <Button title="Start Game" style = {styles.btn} color ={Colors.accent} onPress={() => props.onStartGame(selectedNu)}/>
            </Card>
    }

    return(
        <TouchableWithoutFeedback onPress = {()=>{Keyboard.dismiss();}}>
            <View style={styles.screen}>
                <Text style = {styles.title}>Start a New Game</Text>
                <Card style={styles.inpContainer}>
                    <Text>Enter a Number</Text>
                    <Input style = {styles.inp} onChangeText={numberInpHandler} value = {enteredValue} blurOnSubmit autoCapitalize = 'none' keyboardType = "numeric" maxLength = {2} autoCorrect = {false} />
                    <View style = {styles.btnContainer}>
                        <View style = {styles.btn} ><Button title="Reset" onPress={resetInpHandler} color={Colors.accent} /></View>
                        <View style = {styles.btn} ><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex : 1,
        padding : 10,
        alignItems : 'center'
    },
    title :{
        fontSize :20,
        marginVertical:10,

    },
    inp:{
        width : '40%',
        textAlign:'center'
    },
    inpContainer:{
        width : 300,
        maxWidth : '80%',
        alignItems : 'center',
    },
    btn:{
        width : '40%'
    },
    btnContainer:{
        width: '100%',
        flexDirection : 'row',
        justifyContent: 'space-between',
        paddingHorizontal : 15,
    },
    summaryContainer:{
        alignItems:'center',
        marginTop:20 
    }
})

export default StartGameScreen;