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

    computerCardEl.innerHTML = `<img src=${data.cards[0].image} class="card" />`
    myCardEl.innerHTML = `<img src=${data.cards[1].image} class="card" />`

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

    headerEl.textContent = headerText
}

function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = computerScore
        return "Computer wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = myScore
        return "You win!"
    }

    return "War!"
}
