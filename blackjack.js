let playerValue = 0;
let dealerValue = 0;
let hiddenCard = ""
let playerBusted = false;
let playerAceCount = 0;
let dealerAceCount = 0;

window.onload = function() {
    buildDeck();
    shuffleDeck();
    playGame();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function dealCard () {
    cards.push(deck.pop());
}

async function showCard(numPlayers) {
    for (let i = 0; i < numPlayers*2; i++) {
        //dealCard();
        await delay(1000);
        let card = document.createElement("img");
        card.src = "images/cards/" + cards[i] + ".png";
        console.log(cards[i]);
        
        if (i % 2 == 0) {   // This is the player
            if (cards[i][0] == "A") {
                playerAceCount += 1;
                console.log("Player ACE COUNT: " + playerAceCount);
            }
            document.getElementById("player-cards").append(card);
        }
        else {  // This is the dealers cards
            //console.log(Math.floor(i/2));
            if (cards[i][0] == "A") {
                dealerAceCount += 1;
                console.log("DEALER ACE COUNT: " + dealerAceCount);
            }
            if (Math.floor(i/2) == 0) {
                hiddenCard = card.src;
                card.src = "images/cards/BACK.png";
                document.getElementById("dealer-cards").append(card);
            }
            else {
                document.getElementById("dealer-cards").append(card);
            }
            
        }   
    }
}
    

function playGame() {
    while (true) {
        cards = [];
        dealCard();
        dealCard();
        dealCard();
        dealCard();  
        showCard(2);
        playerValue += getValue(cards[0]) + getValue(cards[2]);
        dealerValue += getValue(cards[1]) + getValue(cards[3]);
        handleAces("player");
        handleAces("dealer");
        console.log(playerValue, dealerValue);
        showButtons();
        
        break;
    }
}

function handleAces(player) {
    if (player == "player") {   // Player hand value
        while (playerValue > 21 && playerAceCount > 0) {
            playerAceCount -= 1;
            playerValue -= 10;
        }
    }
    else {  // Dealer hand value
        while (dealerValue > 21 && dealerAceCount > 0) {
            dealerAceCount -= 1;
            dealerValue -= 10;
        }
    }
}

async function showButtons () {
    await delay(4500);
    let hitVar = document.getElementById("hit");
    hitVar.style.display = "inline-block";
    hitVar.addEventListener("click", hit);

    let stayVar = document.getElementById("stay"); 
    stayVar.style.display = "inline-block";
    stayVar.addEventListener("click", stay);

    let doubleDownVar = document.getElementById("double-down"); 
    doubleDownVar.style.display = "inline-block";
    doubleDownVar.addEventListener("click", doubleDown);
}

function hit() {
    document.getElementById("double-down").style = "display:none;"; //Hide DD button
    dealCard();
    let card = document.createElement("img");
    card.src = "images/cards/" + cards.at(-1) + ".png";
    document.getElementById("player-cards").append(card);
    playerValue += getValue(cards.at(-1));
    if (cards.at(-1)[0] == "A") {
        playerAceCount += 1;
    }
    handleAces("player");
    if (playerValue > 21) {
        console.log("Player Busted");
        playerBusted = true;
        dealerLogic();
    }
    console.log(playerValue);
}
function stay() {
    // Player stays, run dealer logic
    dealerLogic();   
}

function doubleDown() {     // Only get 1 card
    dealCard();
    let card = document.createElement("img");
    card.src = "images/cards/" + cards.at(-1) + ".png";
    document.getElementById("player-cards").append(card);
    playerValue += getValue(cards.at(-1));
    if (cards.at(-1)[0] == "A") {
        playerAceCount += 1;
    }
    handleAces("player");
    if (playerValue > 21) {
        console.log("Player Busted");
        playerBusted = true;
        dealerLogic();
    } 
    else {
        console.log(playerValue);
        dealerLogic();
    }   
}

function hideButtons() {
    document.getElementById("hit").style = "display:none;";
    document.getElementById("stay").style = "display:none;";
    document.getElementById("double-down").style = "display:none;";
}

function resetGame() {
    document.getElementById("dealer").innerHTML = "";
    document.getElementById("dealer").innerHTML = "<h2 id=\"dealer-cards\"></h2>";
    document.getElementById("player").innerHTML = "";
    document.getElementById("player").innerHTML = "<h2 id=\"player-cards\"></h2>";
    document.getElementById("winner").innerText = "";
    //document.getElementById("result").innerHTML = "";
    if (deck.length < 10) {
        console.log("Shuffling New Deck");
        buildDeck();
        shuffleDeck();
    }
    playerBusted = false;
    playerValue = 0;
    dealerValue = 0;
    playerAceCount = 0;
    dealerAceCount = 0;
    playGame();
}

async function dealerLogic() {
    hideButtons();
    let hidden = document.getElementById("dealer-cards");
    //console.log(hidden);
    hidden.firstChild.src = hiddenCard;
    await delay(2000);
    //console.log(hidden);
    if (playerBusted == false) {    // Dealer hits, else dealer no hit
        while (dealerValue < 17) {
            //await delay(2000);
            dealCard();
            let card = document.createElement("img");
            card.src = "images/cards/" + cards.at(-1) + ".png";
            document.getElementById("dealer-cards").append(card);
            dealerValue += getValue(cards.at(-1));
            if (cards.at(-1)[0] == "A") {
                dealerAceCount += 1;
            }
            handleAces("dealer");
            console.log(dealerValue);
            await delay(2000);
        }
    }
    compareValues();
    await delay(1000);
    //resetGame();
    let dealVar = document.getElementById("deal"); 
    dealVar.style.display = "inline-block";
    dealVar.addEventListener("click", deal);
}

function deal() {
    document.getElementById("deal").style = "display:none;";
    resetGame();
}

function compareValues() {
    let result = document.getElementById("winner");
    console.log(result);
    //await delay(5000);

    if (playerBusted == true) {
        result.innerText = "You Lost";
        console.log(result);
    }
    else if (dealerValue > 21) {
        result.innerText = "You Won";
    }
    else if (playerValue > dealerValue) {
        result.innerText = "You Won";
    }
    else if (dealerValue > playerValue) {
        result.innerText = "You Lost";
    } 
    else {
        result.innerText = "You Push";
    }  
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    console.log(deck);    
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap
    }
    console.log(deck);
}


