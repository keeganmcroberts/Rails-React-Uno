import styled from "styled-components";
import { useEffect, useState } from "react";

import My_Hand from "./My_Hand";
import Other_Player2 from './other_players_hands/Other_Player2'
import Other_Player3 from './other_players_hands/Other_Player3'
import Other_Player4 from './other_players_hands/Other_Player4'
import PlayedCardPile from './PlayedCardPile' 
import WildCardPopUp from './WildCardComponent'
import backOfCard from '../cards/Back_of_Card.png'



const Container = styled.div`

`


function ActiveGame(){

    /* moving between players */
    /*  sets players state to index in players array*/
    // const players = [{"player": "player_1", user_name: null}, 
    //                  {"player": "player_2", user_name : null},
    //                  { "player": "player_3", user_name: null}, 
    //                  {"player": "player_4", user_name: null }]


    const players = ["player_1", "player_2", "player_3", "player_4"]


    const [playerTurn, setPlayerTurn] = useState(players[0]) 
    const [clockWise, setClockwise]= useState(true)
    const [initialTurn, setInitialTurn] = useState(true)
    const [displayCard, setDisplayCard] = useState(false)
    const [playerState, setPlayerState] = useState(players)
    const [startingCard, setStartingCard] = useState([])

//     
    const [completeDeck, setCompleteDeck] = useState([])
    const [drawingDeckState, setDrawingDeckState] = useState([])
    
    const [playedCards, setPlayedCards] = useState([])
    const thePlayedCardsArray = []
    let Player4Hand =[]
    const [player4HandState, setPlayer4HandState] = useState([Player4Hand])
    let Player3Hand = []
    const [player3HandState, setPlayer3HandState] = useState([Player3Hand])
    let Player2Hand = []
    const [ player2HandState, setPlayer2HandState] = useState([Player2Hand])
    let MyHand = []
    const [myHandState, setMyHandState] = useState(MyHand)
    const [gameInProgress, setGameInProgress] = useState(false)
    const [gameEnd, setGameEnds] = useState(false)
    // const [winner,setWinner] = useState("")
    const [displayWildCard, setDisplayWildCard] = useState(false)
    
    // function gameisOver(){
    //     if (myHandState === 0)
    //         setGameEnds(true)
    //         // setGameInProgress(false)
    //         // setWinner("player_1")
    //         alert("Player 1 WINS")
    //     if (player2HandState === 0)
    //         setGameEnds(true)
    //         // setGameInProgress(false)
    //         // setWinner("player_2")
    //         alert("Player 2 WINs")
    //     if (player3HandState === 0)
    //         setGameEnds(true)
    //         // setGameInProgress(false)
    //         // setWinner("player_3")
    //         alert("player 3 wins ")
    //     if (player4HandState === 0)
    //         setGameEnds(true)
    //         // setGameInProgress(false)
    //         // setWinner("player_4")
    //         alert("Player 4 Wins")
    //  }

    useEffect( ()=>{
        fetch("http://localhost:3000/cards")
        .then(res => res.json())
        .then(data => {setCompleteDeck(data)
                        setDrawingDeckState(data)    
           
        })
    }, [])

   console.log("complete deck:", completeDeck)

   function startingTheGame(){
    
        const startingCards = drawingDeckState.filter(eachCard=>{
            if (eachCard.value !== "wild" && eachCard.value !== "draw_4")
                return eachCard

        })
    
             setGameInProgress(true)
             const newCard = getARandomCard(startingCards)
             const deckToDrawFrom = startingCards.indexOf(newCard)
             console.log("decktoDrawFrom:", deckToDrawFrom)
             startingCards.splice(deckToDrawFrom, 1)
             setPlayedCards([newCard])
            
    }

    console.log("gameinSession:", gameInProgress)


    function getARandomCard(arrayOfCards){
        const randomIndex = Math.floor(Math.random()* arrayOfCards.length)
        const randomCard = arrayOfCards[randomIndex]
        return randomCard
    }

    function firstPlayedCard(arrayOfCards){
        const randomIndex = Math.floor(Math.random()* arrayOfCards.length)
        const randomCard = arrayOfCards[randomIndex]
        setPlayedCards( randomCard )
    }


    function startingCardDeck(){
        drawingDeckState.filter(eachCard=>{
            if (eachCard.value !== "wild" || eachCard.value !== "draw_4")
            setStartingCard([eachCard])
            console.log("cards without add 4 and wild", startingCard)
                
            
    })}
    


        function whenDrawingDeckisZero(){
            if (drawingDeckState < 80)
            setDrawingDeckState([completeDeck])
        }


        function player1WildCard(eachCard){
            setDisplayWildCard(true)
            const cardToDelete = myHandState.find(cardToDelete=>{
                return eachCard.emblem === cardToDelete.emblem 
            })
             const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
                myHandState.splice(deleteSpecificIndex, 1)
                playedCards.unshift(cardToDelete)
       
        }
        
        function player2WildCard(eachCard){
            setDisplayWildCard(true)
            const cardToDelete = player2HandState.find(cardToDelete=>{
                return eachCard.emblem === cardToDelete.emblem 
            })
             const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
                player2HandState.splice(deleteSpecificIndex, 1)
                playedCards.unshift(cardToDelete)
      
        }

        function player3WildCard(eachCard){
            setDisplayWildCard(true)
            const cardToDelete = player3HandState.find(cardToDelete=>{
                return eachCard.emblem === cardToDelete.emblem 
            })
             const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
                player3HandState.splice(deleteSpecificIndex, 1)
                playedCards.unshift(cardToDelete)
        }

        function player4WildCard(eachCard){
            setDisplayWildCard(true)
            const cardToDelete = player4HandState.find(cardToDelete=>{
                return eachCard.emblem === cardToDelete.emblem 
            })
             const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
                player4HandState.splice(deleteSpecificIndex, 1)
                playedCards.unshift(cardToDelete)
        
        }




    
    function draw4WildPlayer1(card){
        setDisplayWildCard(true)
        const Card1=getARandomCard(drawingDeckState)
        const Card2=getARandomCard(drawingDeckState)
        const Card3=getARandomCard(drawingDeckState)
        const Card4=getARandomCard(drawingDeckState)
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
         if ("player_1" === playerTurn && clockWise === true){
            
            setPlayer2HandState([Card1, Card2, Card3, Card4, ...player2HandState])
            return}
        
        if ("player_1" === playerTurn && clockWise === false){
            
            setPlayer4HandState ([Card1, Card2, Card3, Card4, ...player4HandState])
            return}
    }

    function draw4WildPlayer2(card){
        setDisplayWildCard(true)
        const Card1=getARandomCard(drawingDeckState)
        const Card2=getARandomCard(drawingDeckState)
        const Card3=getARandomCard(drawingDeckState)
        const Card4=getARandomCard(drawingDeckState)
         
   
        const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete) 
        
         if ("player_2" === playerTurn && clockWise === true){
            
            setPlayer3HandState([Card1, Card2, Card3, Card4, ...player3HandState])

            return}
        if ("player_2" === playerTurn && clockWise === false){
            
            setMyHandState ([Card1, Card2, Card3, Card4, ...myHandState])
            return}
    }

    function draw4WildPlayer3(card){
        setDisplayWildCard(true)
        const Card1=getARandomCard(drawingDeckState)
        const Card2=getARandomCard(drawingDeckState)
        const Card3=getARandomCard(drawingDeckState)
        const Card4=getARandomCard(drawingDeckState)
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
         if ("player_3" === playerTurn && clockWise === true){
            
            setPlayer4HandState([Card1, Card2, Card3, Card4, ...player4HandState])
            return}
        if ("player_3" === playerTurn && clockWise === false){
            
            setPlayer2HandState ([Card1, Card2, Card3, Card4, ...player2HandState])
            return}
    }

    function draw4WildPlayer4(card){
        setDisplayWildCard(true)
        const Card1=getARandomCard(drawingDeckState)
        const Card2=getARandomCard(drawingDeckState)
        const Card3=getARandomCard(drawingDeckState)
        const Card4=getARandomCard(drawingDeckState)

        const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
         if ("player_4" === playerTurn && clockWise === true){
            
            setMyHandState([Card1, Card2, Card3, Card4, ...myHandState])
            return}
        if ("player_4" === playerTurn && clockWise === false){
            
            setPlayer3HandState ([Card1, Card2, Card3, Card4, ...player3HandState])
            return}
    }
        
    
    function StartingSevenCards(){ 
     const card1 = getARandomCard(completeDeck)
     const card2 = getARandomCard(completeDeck)
     const card3 = getARandomCard(completeDeck)
     const card4 = getARandomCard(completeDeck)
     const card5 = getARandomCard(completeDeck)
     const card6 = getARandomCard(completeDeck)
     const card7 = getARandomCard(completeDeck)
    
     return([card1, card2, card3, card4, card5, card6, card7])     
    }
   

    function startingHands(){
        setMyHandState(StartingSevenCards)
        setPlayer2HandState(StartingSevenCards)
        setPlayer3HandState(StartingSevenCards)
        setPlayer4HandState(StartingSevenCards)

        setDisplayCard(true)  
    }



    function addsCardToHand(){
        if (drawingDeckState < 70){ 
            setDrawingDeckState([completeDeck])}
        const newCard = getARandomCard(drawingDeckState)
        console.log("NEWCARD:", newCard)
        const deckToDrawFrom = drawingDeckState.indexOf(newCard)
        console.log("decktoDrawFrom:", deckToDrawFrom)
        drawingDeckState.splice(deckToDrawFrom, 1)

            console.log("DECK TO DRAW FROM:", deckToDrawFrom)
        
        
        if ("player_1" === playerTurn)
            return setMyHandState([newCard, ...myHandState])

        else if ("player_2" === playerTurn)
            return setPlayer2HandState([newCard, ...player2HandState])

        else if ("player_3" === playerTurn)
            return setPlayer3HandState([newCard, ...player3HandState])

        else if ("player_4" === playerTurn)
            return setPlayer4HandState([newCard, ...player4HandState])
    }

    console.log("New Hand For My Player:", myHandState)
    console.log("NewHand For Player2", player2HandState)
    console.log("New Hand For Player 3:", player3HandState)
    
    console.log("New Hand For Player 4:", player4HandState)

    console.log("The drawing Deck:", drawingDeckState)
    

   
    console.log("PLAYER TURN:", playerTurn)
    console.log("played cards pile:", playedCards)
    


    function player1Turn(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]
       
        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        
        console.log("last card played", lastCardPlayed)
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
            //  the delete and unshift logic needs to go inside of puttingDownCardP1()
            //  if all the conditions of the function are met then it splices and adds to played cards array

        setInitialTurn(false)
        if ("player_1" === playerTurn && clockWise === true)
            return setPlayerTurn("player_2") 
        else if ("player_1" ===playerTurn && clockWise === false)
            return setPlayerTurn("player_4")
        
        }else alert("illegal move")} }
    
    
        function player2Turn(card){
            const lastCardPlayed = playedCards[0]
                if (typeof(card) === "undefined")
                {lastCardPlayed = playedCards[1]}
            if (lastCardPlayed) {
           
            
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){ 

        const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
       
       if ("player_2" === playerTurn && clockWise === true)
            return setPlayerTurn("player_3") 
        else if ("player_2" === playerTurn && clockWise === false)
            return setPlayerTurn("player_1")
        
        }else alert("Illegal move")} 
    }
    
    function player3Turn(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
       
        if ("player_3" === playerTurn && clockWise === true)
            return setPlayerTurn("player_4")
        else if ("player_3" === playerTurn && clockWise === false)
            return setPlayerTurn("player_2")
            
        }else alert("Illegal move")} 
    }      
    function player4Turn(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
            
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){ 
        
                const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        if ("player_4" === playerTurn && clockWise === true )
            return setPlayerTurn("player_1")  
        else if ("player_4" === playerTurn && clockWise === false)
            return setPlayerTurn("player_3")      
            }else alert("illegal move")} }

    function player1Add2(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
            
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        const card1 = getARandomCard(drawingDeckState)
        const card2 = getARandomCard(drawingDeckState)
        
        if ("player_1" === playerTurn && clockWise === true){
            
            setPlayer2HandState([card1, card2, ...player2HandState])
            setPlayerTurn("player_2")
            return }
        if ("player_1" === playerTurn && clockWise === false) {
            
            setPlayer4HandState ([card1, card2, ...player4HandState])
            setPlayerTurn("player_4")
            return }
    }else alert("Illegal Move")} 
    } 

    
    function player2Add2(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) { 
        
        
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
            console.log("CARDEMBLEM:", cardEmblem)
            console.log("CARDVALUE", cardValue)
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
            const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        const card1 = getARandomCard(drawingDeckState)
        const card2 = getARandomCard(drawingDeckState)
        
        if ("player_2" === playerTurn && clockWise === true){
            
            setPlayer3HandState([card1, card2, ...player3HandState])
            setPlayerTurn("player_3")
            return}
        if ("player_2" === playerTurn && clockWise === false){
            
             setMyHandState ([card1, card2, ...myHandState])
             setPlayerTurn("player_1")
             return}
        }else alert("Illegal Move")} 
    }
    


    

    function player3Add2(card){
        
        const lastCardPlayed = playedCards[0]
                if (typeof(card) === "undefined")
                {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {

            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        const card1 = getARandomCard(drawingDeckState)
        const card2 = getARandomCard(drawingDeckState)
        
        if ("player_3" === playerTurn && clockWise === true){
           
            setPlayer4HandState([card1, card2, ...player4HandState])
            setPlayerTurn("player_4")
            return}
        if ("player_3" === playerTurn && clockWise === false){
            
            setPlayer2HandState ([card1, card2, ...player2HandState])
            setPlayerTurn("player_2")
            return}
        }else alert("Illegal Move")} 
    }

    function player4Add2(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
            if (lastCardPlayed) {
        
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
            
        })
         const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        const card1 = getARandomCard(drawingDeckState)
        const card2 = getARandomCard(drawingDeckState)
        
        if ("player_4" === playerTurn && clockWise === true){
            
            setMyHandState([card1, card2, ...myHandState])
            setPlayerTurn("player_1")
            return}
        if ("player_4" === playerTurn && clockWise === false){
            
            setPlayer3HandState ([card1, card2, ...player3HandState])
            setPlayerTurn("player_3")
            return}
    
        }else alert("Illegal Move")} 
    }
    
    

    console.log("CLOCKWISE:", clockWise)
    
    /// REVERSE CARD LOGIC 

    useEffect(()=>{
        console.log("useEffect happening")
        if (initialTurn)
            return 
        else if ("player_4" === playerTurn && clockWise === false)
            return setPlayerTurn("player_3") 
        else if ("player_4" === playerTurn && clockWise === true)
            return setPlayerTurn("player_1")
        else if ("player_3" === playerTurn && clockWise === false)
            return setPlayerTurn("player_2") 
        else if ("player_3" === playerTurn && clockWise === true)
            return setPlayerTurn("player_4")
        else if ("player_2" === playerTurn && clockWise === false)
            return setPlayerTurn("player_1")
        else if ("player_2" === playerTurn && clockWise === true)
            return setPlayerTurn("player_3")
        else if ("player_1" === playerTurn && clockWise === false)
            return setPlayerTurn("player_4")   
        else if ("player_1" === playerTurn && clockWise === true)     
            return setPlayerTurn("player_2")
    }, [clockWise])

    function player1HandleReverse(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setClockwise(!clockWise)
        setInitialTurn(false)
        }else alert("illegal move")} }
    
    
    function player2HandleReverse(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){

        const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
    })
        const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setClockwise(!clockWise)
        setInitialTurn(false)
        }else alert("illegal move")}}
    
    function player3HandleReverse(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
})
        const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setClockwise(!clockWise)
        setInitialTurn(false)
        }else alert("illegal move")}}

    function player4HandleReverse(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
})
        const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setClockwise(!clockWise)
        setInitialTurn(false)
        }else alert("illegal move")}}

        

    function player1Skip(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = myHandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
        })
         const deleteSpecificIndex = myHandState.indexOf(cardToDelete)
            myHandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        setInitialTurn(false)
        if ("player_1" === playerTurn && clockWise === true)
           return setPlayerTurn("player_3") 
        else if ("player_1" === playerTurn && clockWise === false)    
            return setPlayerTurn("player_3")   
        }else alert("illegal move")}}
    
    function player2Skip(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
            const cardToDelete = player2HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
    })
        const deleteSpecificIndex = player2HandState.indexOf(cardToDelete)
            player2HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
       
       if ("player_2" === playerTurn && clockWise === true)
           return setPlayerTurn("player_4") 
        else if ("player_2" === playerTurn && clockWise === false)
            return setPlayerTurn("player_4") 
        }else alert("illegal move")}}
    
    function player3Skip(card){
        const lastCardPlayed = playedCards[0]
            if (typeof(card) === "undefined")
            {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        
        const lastCardPlayed = playedCards[0]
        const cardEmblem = lastCardPlayed.emblem.split("_")[0]
        const cardValue = lastCardPlayed.emblem.split("_")[1]

        const newCardEmblem = card.emblem.split("_")[0]
        const newCardValue = card.emblem.split("_")[1]
        if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        
        const cardToDelete = player3HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
})
        const deleteSpecificIndex = player3HandState.indexOf(cardToDelete)
            player3HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
        
        if ("player_3" === playerTurn && clockWise === true)
            return setPlayerTurn("player_1") 
        else if ("player_3" === playerTurn && clockWise === false)
            return setPlayerTurn("player_1") 
         }else alert("illegal move")} }
  
   function player4Skip(card){
        const lastCardPlayed = playedCards[0]
                if (typeof(card) === "undefined")
                {lastCardPlayed = playedCards[1]}
        if (lastCardPlayed) {
        const lastCardPlayed = playedCards[0]
            const cardEmblem = lastCardPlayed.emblem.split("_")[0]
            const cardValue = lastCardPlayed.emblem.split("_")[1]
    
            const newCardEmblem = card.emblem.split("_")[0]
            const newCardValue = card.emblem.split("_")[1]
            if (cardEmblem === newCardEmblem || cardValue === newCardValue){
        const cardToDelete = player4HandState.find(cardToDelete=>{
            return card.emblem === cardToDelete.emblem 
})
        const deleteSpecificIndex = player4HandState.indexOf(cardToDelete)
            player4HandState.splice(deleteSpecificIndex, 1)
            playedCards.unshift(cardToDelete)
       
         if ("player_4" === playerTurn && clockWise === true)
           return setPlayerTurn("player_2")
        else if ("player_4" === playerTurn && clockWise === false)
            return setPlayerTurn("player_2")
    }else alert("Illegal Move")} 
    }

    

    function declareWinner(){
        if(myHandState === 0 )
            return alert("Player 1 Wins!")
        else if (player2HandState === 0)
            return alert("Player 2 Wins!")
        else if (player3HandState === 0)
            return alert("Player 3 Wins!")
        else if (player4HandState)
            return alert("Player 4 Wins!")
        
    }

    return(
        <div className="container">
            <div className="game-buttons">
                <button  onClick={startingTheGame}>Start Game</button>
                <button  onClick={startingHands}> Distribute First Hand </button>
            </div>
                {gameInProgress ? <h3 className="text">  {playerTurn} turn </h3> : null}
                {/* {gameisOver()} */} 
                <div className="played-and-draw-cards">
                    <div className="played-cards">
                    <h4> Played Cards:</h4>
                        <PlayedCardPile 
                        playedCardsState={playedCards} 
                        displayCard={displayCard} 
                        completeDeck={completeDeck}/>
                    </div>
                    <div>{displayWildCard? <WildCardPopUp playerTurn={playerTurn} setPlayerTurn={setPlayerTurn} clockWise={clockWise} playedCardsState={playedCards} displayWildCard={setDisplayWildCard}/> : null}</div>

                    <div className="drawpile">
                        <h4>Draw Deck:</h4>
                        { gameInProgress ? <img onClick={ addsCardToHand} src={backOfCard} alt="the back the cards" height={100} width={75}/> : null}
                    </div>
                </div>
        
            
            <div className="player-hands">
                    
                <div className="player1-hand">
                    <My_Hand 
                    playerTurn={playerTurn}
                    player1WildCard={player1WildCard}
                    completeDeck={completeDeck}
                    displayCard={displayCard} 
                    player1Turn={player1Turn} 
                    player1Skip={player1Skip} 
                    player1HandleReverse={player1HandleReverse} 
                    myHandState={myHandState}
                    player1Add2={player1Add2}
                    draw4WildPlayer1={draw4WildPlayer1}
                    // puttingDownCardsP1={puttingDownCardsP1}
                    />
                </div>
                   
                <div className="player2-hand">             
                    <Other_Player2 
                    playerTurn={playerTurn}
                    player2WildCard={player2WildCard}
                    displayCard={displayCard} 
                    completeDeck={completeDeck}
                    player2Turn={player2Turn} 
                    player2Skip={player2Skip} 
                    player2HandleReverse={player2HandleReverse} 
                    player2HandState={player2HandState}
                    player2Add2={player2Add2}
                    draw4WildPlayer2={draw4WildPlayer2}/>
                </div>

                <div className="player3-hand">
                    <Other_Player3 
                    playerTurn={playerTurn}
                    player3WildCard={player3WildCard}
                    displayCard={displayCard} 
                    completeDeck={completeDeck}
                    player3Turn={player3Turn} 
                    player3Skip={player3Skip} 
                    player3HandleReverse={player3HandleReverse} 
                    player3HandState={player3HandState}
                    player3Add2={player3Add2}
                    draw4WildPlayer3={draw4WildPlayer3}/>
                   
                </div>
            
                <div className="player4-hand">
                    <Other_Player4 
                    playerTurn={playerTurn}
                    player4WildCard={player4WildCard}
                    displayCard={displayCard} 
                    completeDeck={completeDeck}
                    player4Turn={player4Turn} 
                    player4Skip={player4Skip} 
                    player4HandleReverse={player4HandleReverse}
                    player4HandState={player4HandState}
                    player4Add2={player4Add2} 
                    draw4WildPlayer4={draw4WildPlayer4}/>
                </div>
                     
            </div>

            
        </div>
    )
}
export default ActiveGame;
