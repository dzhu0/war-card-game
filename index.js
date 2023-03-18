const url = "https://apis.scrimba.com/deckofcards/api/deck"
const drawCardsBtn = document.getElementById("draw-cards")
const cardsRemainingText = document.getElementById("cards-remaining")

let computerScore = 0
let myScore = 0
let deckId

getDeck()

drawCardsBtn.addEventListener('click', drawCards)
document.getElementById("new-deck").addEventListener('click', getNewDeck)

function getNewDeck() {
    window.location.reload(false)
}

async function getDeck() {
    const res = await fetch(`${url}/new/shuffle/`)
    const data = await res.json()
    cardsRemainingText.textContent = data.remaining
    deckId = data.deck_id
}

async function drawCards() {
    const res = await fetch(`${url}/${deckId}/draw/?count=2`)
    const data = await res.json()
    cardsRemainingText.textContent = data.remaining

    document.getElementById("computer-card").innerHTML = `<img src=${data.cards[0].image} class="card" />`
    document.getElementById("my-card").innerHTML = `<img src=${data.cards[1].image} class="card" />`

    let headerText = determineCardWinner(data.cards[0], data.cards[1])

    if (data.remaining === 0) {
        drawCardsBtn.disabled = true
        if (computerScore > myScore) {
            headerText = "The computer won the game!"
        } else if (computerScore < myScore) {
            headerText = "You won the game!"
        } else {
            headerText = "It's a tie game!"
        }
    }

    document.getElementById("header").textContent = headerText
}

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        document.getElementById("computer-score").textContent = computerScore
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        document.getElementById("my-score").textContent = myScore
        return "You win!"
    }

    return "War!"
}
