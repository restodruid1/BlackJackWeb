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
        dealCard();
        await delay(1000);
        let card = document.createElement("img");
        card.src = "images/cards/" + cards[i] + ".png";
        console.log(cards[i]);
        
        if (i % 2 == 0) {   // This is the player
            document.getElementById("player-cards").append(card);
        }
        else {  // This is the dealers cards
            console.log(Math.floor(i/2));
            if (Math.floor(i/2) == 0) {
                card.src = "images/cards/BACK.png";
                document.getElementById("dealer-cards").append(card);
            }
            else {
                document.getElementById("dealer-cards").append(card);
            }
            
        }   
    }
    //document.getElementById("hit").style.display = "inline-block";
}
    

function playGame() {
    while (true) {
        let playerValue = 0;
        let dealerValue = 0;

        cards = [];  
        showCard(2);
        //playerValue += getValue(cards[0]) + getValue(cards[2]);
        //dealerValue += getValue(cards[1]) + getValue(cards[3]);

        showButtons();
        break;
    }
}

async function showButtons () {
    await delay(4500);
    let hitVar = document.getElementById("hit");
    hitVar.style.display = "inline-block";
    hitVar.addEventListener("click", hit);

    let stay = document.getElementById("stay"); 
    stay.style.display = "inline-block";
    stay.addEventListener("click", stay);
}

function hit() {
    dealCard();
    let card = document.createElement("img");
    card.src = "images/cards/" + cards.at(-1) + ".png";
    document.getElementById("player-cards").append(card);

}
function stay() {

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


