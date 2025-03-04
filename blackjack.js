window.onload = function() {
    buildDeck();
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
    let card = document.createElement("img");
    card.src = "images/cards/BACK.png";
    document.getElementById("dealer-cards").append(card);
    let card2 = document.createElement("img");
    card2.src = "images/cards/BACK.png";
    document.getElementById("dealer-cards").append(card2);
    
}
