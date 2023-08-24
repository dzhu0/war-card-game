const url = "https://apis.scrimba.com/deckofcards/api/deck"
const newDeckEl = document.getElementById("new-deck")
const cardsRemainingEl = document.getElementById("cards-remaining")
const headerEl = document.getElementById("header")
const computerScoreEl = document.getElementById("computer-score")
const computerCardEl = document.getElementById("computer-card")
const myScoreEl = document.getElementById("my-score")
const myCardEl = document.getElementById("my-card")
const drawCardsEl = document.getElementById("draw-cards")

let computerScore = 0
let myScore = 0
let deckId

getDeck()

newDeckEl.addEventListener('click', getNewDeck)
drawCardsEl.addEventListener('click', drawCards)

async function getDeck() {
    const res = await fetch(`${url}/new/shuffle/`)
    const data = await res.json()
    cardsRemainingEl.textContent = data.remaining
    deckId = data.deck_id
}

function getNewDeck() {
    window.location.reload(false)
}

async function drawCards() {
    const res = await fetch(`${url}/${deckId}/draw/?count=2`)
    const data = await res.json()
    cardsRemainingEl.textContent = data.remaining

    const [compCard, myCard] = data.cards

    computerCardEl.innerHTML = `<img src=${compCard.image} class="card">`
    myCardEl.innerHTML = `<img src=${myCard.image} class="card">`

    let headerText = determineCardWinner(compCard, myCard)

    if (data.remaining === 0) {
        headerText = determineGameWinner()
    }

    headerEl.textContent = headerText
}

function determineCardWinner(compCard, myCard) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const compCardValue = valueOptions.indexOf(compCard.value)
    const myCardValue = valueOptions.indexOf(myCard.value)

    if (compCardValue > myCardValue) {
        computerScore++
        computerScoreEl.textContent = computerScore
        return "Computer wins!"
    } else if (compCardValue < myCardValue) {
        myScore++
        myScoreEl.textContent = myScore
        return "You win!"
    }

    return "War!"
}

function determineGameWinner() {
    drawCardsEl.disabled = true

    if (computerScore > myScore) {
        return "The computer won the game!"
    } else if (computerScore < myScore) {
        return "You won the game!"
    }

    return "It's a tie game!"
}
