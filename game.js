const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const inventoryElement = document.getElementById('inventory')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
  showInv({})
}

function showInv(inv) {
  const things = ["sword", "shield", "bluegoo", "crown", "redpotion", "blooddrop", "goldcoin", "castle", "crown"];
  const icons = document.querySelector(".icons");
  const svgDoc = icons.getSVGDocument;
  
  things.map(i => svgDoc().getElementById(i.toLowerCase()+'-icon').style.visibility = "hidden" )
  Object.keys(inv).forEach(i => svgDoc().getElementById(i.toLowerCase()+'-icon').style.visibility = state[i] ? "visible" : "hidden" )
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
  showInv(state)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in a strange place and you see a jar of blue goo near you.',
    options: [
      {
        text: 'Take the goo',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Leave the goo',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        text: 'Trade the goo for a sword',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade the goo for a shield',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 4
      },
      {
        text: 'Find a room to sleep at in the town',
        nextText: 5
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring the castle you come across a horrible monster in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your sword',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the blue goo at it',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11,
        setState: { castle: true }
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the monster easily catches.',
    options: [
      {
        text: 'Hide',
        nextText: 12
      },
      {
        text: 'Keep running',
        nextText: 13
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this monster could be slain with a single sword.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      },
      {
        text: 'What comes now?',
        nextText: 14
      }
    ]
  },
    {
    id: 12,
    text: 'Your attempt to hide failed and you were made to mince meat.',
    options: [
      {
        text: 'Restart.',
        nextText: -1
      }
    ]
  },
    {
    id: 13,
    text: 'You keep going until you find yourself lost and dazed.',
    options: [
      {
        text: 'Stumble around.',
        nextText: 1
      }
    ]
  },
    {
    id: 14,
    text: 'After a while feeling safe and comfortable in your castle you decide its time for a change.',
    options: [
      {
        text: 'Go on a Quest.',
        nextText: 15
      },
      {
        text: 'Try to find more goo',
        nextText: 1
      }
    ]
  },
    {
    id: 15,
    text: 'You find a castle surrounded by a moat.',
    options: [
      {
        text: 'Explore the surrounding.',
        nextText: -1
      },
      {
        text: 'Explore the castle',
        nextText: 1
      }
    ]
  }
]

startGame();
