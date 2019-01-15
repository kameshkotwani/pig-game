/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

/*
****************OTHER THINGS THAT WE CAN DO**************

POINTS:
1. State variable talks about the state of an event

//To update the current value using document.queryselector using activePlayer to    dynamically assign values
    document.querySelector('#current-'+activePlayer).textContent = dice;

To store the value of any innerHTML and view it in the console
    var x = document.querySelector('#score-1').textContent;
    console.log(x);

//Using innerHTML to change the property of the text ex: italics
    document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>'
*/

//Creating Global Variables
var scores,roundScore,activePlayer,gamePlaying=false;

function initGame()
{
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    //Query Selector to change the css and hide dice 
    document.querySelector('.dice').style.display = 'none';

    //Getting the score and current value
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
}

//Initializing the game
initGame();


//Rolling the dice
document.querySelector('.btn-roll').addEventListener('click',function()
{
    
     if(gamePlaying)
     {
        //1. Random number
        //Making dice using math function

        var dice = Math.floor(Math.random()*6+1);

        //2. Display the result storing the result in diceDOM
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        //Display the dice image
        diceDOM.src = 'dice-' + dice +'.png';
        
        //3. Update the round score if the rolled number is NOT 1
        if(dice !== 1)
        {
            //Add to the current score i.e roundScore
            roundScore+=dice;
                
            //Update the current score in HTML 
            document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }
        else
        {
            
            //Changing the activePlayer since dice faced 1
            nextPlayer();

            //Remove the dice again 
            document.querySelector('.dice').style.display = 'none';   
        }
    }
});


//Implenting the HOLD button

document.querySelector('.btn-hold').addEventListener('click',function()
{
    if(gamePlaying)
    {

    
    //1. Add the current score the to GLOBAL score
    scores[activePlayer] +=roundScore;

    //Update the UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
    
    //Check if player won the game
    var highScore = 100;
    if(scores[activePlayer]>=highScore)
    {
        //Display if the player won
        document.querySelector('#name-'+activePlayer).innerHTML = '<strong>Winner!</strong>';
        //Remove the dice
        document.querySelector('.dice').style.display = 'none';
        
        //adding winner class to winner and removing active class
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        
        gamePlaying = false;

    }
    else
    {
        //Next Player
        nextPlayer();
    }
}
});



//A Function to change the player whenever there is 1 or HOLD is pressed
function nextPlayer()
{
    //Go to Next player if the dice is 1 and reset roundScore
    activePlayer===0 ? activePlayer = 1:activePlayer = 0;
    roundScore=0;
    
    //Reset both the currents
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    
    //Changing the active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

//Creating a NEW GAME Function
document.querySelector('.btn-new').addEventListener('click',initGame);


