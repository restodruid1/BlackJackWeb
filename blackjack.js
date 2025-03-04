let playerValue = 0;
let dealerValue = 0;
let hiddenCard = ""
let playerBusted = false;

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
            document.getElementById("player-cards").append(card);
        }
        else {  // This is the dealers cards
            //console.log(Math.floor(i/2));
            if (Math.floor(i/2) == 0) {
                hiddenCard = card.src;
                console.log(hiddenCard);
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
        console.log(playerValue, dealerValue);
        showButtons();
        
        break;
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
}

function hit() {
    dealCard();
    let card = document.createElement("img");
    card.src = "images/cards/" + cards.at(-1) + ".png";
    document.getElementById("player-cards").append(card);
    playerValue += getValue(cards.at(-1));
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

function resetGame() {
    document.getElementById("dealer").innerHTML = "";
    document.getElementById("dealer").innerHTML = "<h2 id=\"dealer-cards\"></h2>";
    document.getElementById("player").innerHTML = "";
    document.getElementById("player").innerHTML = "<h2 id=\"player-cards\"></h2>";
    document.getElementById("winner").innerHTML = "";
    if (deck.length < 10) {
        console.log("Shuffling New Deck");
        buildDeck();
        shuffleDeck();
    }
    playerBusted = false;
    playerValue = 0;
    dealerValue = 0;
    playGame();
}

async function dealerLogic() {
    let hidden = document.getElementById("dealer-cards");
    //console.log(hidden);
    hidden.firstChild.src = hiddenCard;
    await delay(2000);
    //console.log(hidden);
    if (playerBusted == false) {    // Dealer hits 
        while (dealerValue < 17) {
            //await delay(2000);
            dealCard();
            let card = document.createElement("img");
            card.src = "images/cards/" + cards.at(-1) + ".png";
            document.getElementById("dealer-cards").append(card);
            dealerValue += getValue(cards.at(-1));
            console.log(dealerValue);
            await delay(2000);
        }
        //if (dealerValue > 21) {
        //    console.log("dealer busted");
        //}
    }
    //else {
    //    console.log("player lost");
    //}
    compareValues()
    resetGame();
}

async function compareValues() {
    //let result = document.getElementById("winner");

    if (playerBusted) {
        //result.innerText = "You Lost";
        document.getElementById("winner").innerText = "You Lost";
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

    await delay(3000);
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


