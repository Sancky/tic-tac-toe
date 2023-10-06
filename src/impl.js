/* 
    Variables
*/

let     
    gridBoxesFill = Array(9).fill(null),

    ticTacToe = {
        scores: {
            player: 0,
            tie: 0,
            cpu: 0,
            DOMElements: {
                player: null,
                tie: null,
                cpu: null
            }
        },
        turn: 1,
        selectedLetter: null,
        filledBoxesCount: 0,
        endRound: false
    },

    darkMode = false,

    gridContainer = null;

const 
    globalContentContainer = document.getElementById('flex-container');

/* 
    Functions
*/

const pagesContent = {
    Menu: {
        pageLoadContent: () => {
            const bodyElement = document.body;

            bodyElement.appendChild(globalContentContainer);

            let tempElement = document.createElement('div');
            tempElement.className = 'heading-title';
            tempElement.textContent = 'Tic-Tac-Toe';

            globalContentContainer.appendChild(tempElement);

            const buttonsContainer = document.createElement('div');
            buttonsContainer.id = 'buttons-flex-container';

            globalContentContainer.appendChild(buttonsContainer);

            const buttonsProperties = [
                {
                    Name: 'Play', 
                    OnClick: () => switchPages('ChooseXor0')
                }, 
                {
                    Name: 'Settings',
                    OnClick: () => switchPages('Settings')
                }, 
                {
                    Name: 'Help',
                    OnClick: () => switchPages('Help')
                }
            ];

            for(let i = 0; i < 3; ++i) {
                tempElement = document.createElement('button');

                tempElement.className = 'menu-buttons';
                tempElement.textContent = buttonsProperties[i].Name;
                tempElement.addEventListener('click', buttonsProperties[i].OnClick);

                buttonsContainer.appendChild(tempElement);
            }
        }
    },
    Settings: {
        pageLoadContent: () => {

        }
    },
    Help: {
        pageLoadContent: () => {
            let
                elementContainer,
                tempElement;

            elementContainer = document.createElement('div');

            elementContainer.className = 'help-section';

            globalContentContainer.appendChild(elementContainer);

            tempElement = document.createElement('h1');

            tempElement.textContent = 'Rules';

            elementContainer.appendChild(tempElement);

            const ticTacToeRules = [
                'The game is played on a grid that\'s 3 squares by 3 squares.',
                'You are X, your friend (or the computer in this case) is O. Players take turns putting their marks in empty squares.',
                'The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner.',
                'When all 9 squares are full, the game is over. If no player has 3 marks in a row, the game ends in a tie.'
            ];

            const orderedListElement = document.createElement('ol');

            elementContainer.appendChild(orderedListElement);

            for(const rule of ticTacToeRules) {
                tempElement = document.createElement('li');

                tempElement.textContent = rule;

                orderedListElement.appendChild(tempElement);
            }

            tempElement = document.createElement('div');

            tempElement.className = 'return-back';
            tempElement.addEventListener('click', () => switchPages('Menu'));

            const iconElement = document.createElement('i');

            iconElement.className = 'fa-solid fa-check';

            elementContainer.appendChild(tempElement);

            tempElement.appendChild(iconElement);
        }
    },
    Game: {
        pageLoadContent: () => {
            const bodyElement = document.body;

            gridContainer = document.createElement('div');

            globalContentContainer.appendChild(gridContainer);

            gridContainer.id = 'grid-container';

            const gridBordersStyles = [
                'border-left: none; border-top: none;',
                'border-top: none;',
                'border-top: none; border-right: none;',
                'border-left: none;',
                '',
                'border-right: none;',
                'border-left: none; border-bottom: none;',
                'border-bottom: none;',
                'border-bottom: none; border-right: none;'
            ];

            gridContainer.addEventListener('click', (event) => {
                if(event.target.internalItemID === undefined)
                    return;

                if(ticTacToe.filledBoxesCount === 9 || ticTacToe.endRound)
                    return;

                if(ticTacToe.turn === 1)
                    fillBox(event.target.internalItemID, ticTacToe.turn); 
            });

            for(let i = 0, element; i < 9; ++i) {
                element = document.createElement('div');

                element.className = 'grid-items';
                element.internalItemID = i;

                if(i !== 4)
                    element.style = gridBordersStyles[i];

                gridContainer.appendChild(element);
            }

            ticTacToe.turn = 1 + Math.floor(Math.random() * 2);

            if(ticTacToe.turn === 2) 
                setTimeout(cpuSelectBox, 500);

            const flexContainer = document.createElement('div');

            flexContainer.className = 'game-info-container';

            globalContentContainer.appendChild(flexContainer);

            let gameInfoScores;

            if(!ticTacToe.selectedLetter) 
                gameInfoScores = ['PLAYER (X)', 'TIE', 'CPU (0)'];
            
            else 
                gameInfoScores = ['PLAYER (0)', 'TIE', 'CPU (X)'];

            for(let i = 0, tempElement; i < 3; ++i) {
                tempElement = document.createElement('div');

                tempElement.textContent = gameInfoScores[i];
                tempElement.className = 'game-info-text';

                flexContainer.appendChild(tempElement);

                switch(i) {
                    case 0: {
                        ticTacToe.scores.DOMElements.player = document.createElement('div');

                        ticTacToe.scores.DOMElements.player.textContent = '0';
                        ticTacToe.scores.DOMElements.player.className = 'game-info-score';

                        tempElement.appendChild(ticTacToe.scores.DOMElements.player);
                        break;
                    }
                    case 1: {
                        ticTacToe.scores.DOMElements.tie = document.createElement('div');

                        ticTacToe.scores.DOMElements.tie.textContent = '0';
                        ticTacToe.scores.DOMElements.tie.className = 'game-info-score';

                        tempElement.appendChild(ticTacToe.scores.DOMElements.tie);
                        break;
                    }
                    case 2: {
                        ticTacToe.scores.DOMElements.cpu = document.createElement('div');
                    
                        ticTacToe.scores.DOMElements.cpu.textContent = '0';
                        ticTacToe.scores.DOMElements.cpu.className = 'game-info-score';

                        tempElement.appendChild(ticTacToe.scores.DOMElements.cpu);
                        break;
                    }
                }
            }
        }
    },
    ChooseXor0: {
        pageLoadContent: () => {
            const headingTitle = document.createElement('div');

            headingTitle.className = 'heading-title';
            headingTitle.textContent = 'Choose your element:';

            globalContentContainer.appendChild(headingTitle);

            const flexContainer = document.createElement('div');

            flexContainer.id = 'flex-container-choose';

            globalContentContainer.appendChild(flexContainer);

            const 
                selectX = document.createElement('div'),
                select0 = document.createElement('div');

            selectX.className = 'select-x';
            selectX.textContent = 'X';

            flexContainer.appendChild(selectX); 

            select0.className = 'select-0';
            select0.textContent = 'O';

            flexContainer.appendChild(select0);

            flexContainer.addEventListener('mouseover', (event) => {
                if(event.target === selectX) 
                    select0.classList.add('select-scale');
                
                else if(event.target === select0) 
                    selectX.classList.add('select-scale');
            }); 

            flexContainer.addEventListener('mouseout', (event) => {
                if(event.target === selectX) 
                    select0.classList.remove('select-scale');
                
                else if(event.target === select0) 
                    selectX.classList.remove('select-scale');
            });
            
            flexContainer.addEventListener('click', (event) => {
                if(event.target === selectX) {
                    ticTacToe.selectedLetter = 0;

                    switchPages('Game');
                }
                else if(event.target === select0) {
                    ticTacToe.selectedLetter = 1;

                    switchPages('Game');
                }
            });
        }
    }
};

const switchPages = (page = '') => {
    globalContentContainer.replaceChildren();

    pagesContent[page].pageLoadContent();
}

const createDarkModeButton = () => {
    let 
        divElement = document.createElement('div'),
        iconElement = document.createElement('i'),
        bodyElement = document.body;

    divElement.className = 'dark-mode-icon';

    bodyElement.appendChild(divElement);

    iconElement.className = 'fa-solid fa-moon';

    divElement.addEventListener('click', () => {
        if(!darkMode) {
            iconElement.className = 'fa-solid fa-sun';

            bodyElement.classList.replace('white-mode', 'dark-mode');

            darkMode = true;
        }
        else {
            iconElement.className = 'fa-solid fa-moon';

            bodyElement.classList.replace('dark-mode', 'white-mode');

            darkMode = false;
        }
    });

    divElement.appendChild(iconElement);
}

const fillBox = (id, x0) => { 
    if(gridBoxesFill[id] !== null)
        return;
    
    const 
        divElement = document.createElement('div');

    divElement.className = 'x-or-0';

    if(x0 === 2) 
        divElement.textContent = ticTacToe.selectedLetter ? 'X' : 'O';
    
    else 
        divElement.textContent = !ticTacToe.selectedLetter ? 'X' : 'O';

    gridBoxesFill[id] = x0;
    
    ticTacToe.filledBoxesCount ++;

    ticTacToe.turn = 3 - ticTacToe.turn;

    gridContainer.childNodes[id].appendChild(divElement);

    const winnerBoxes = checkWinnerBoxes();

    if(winnerBoxes !== null) {
        for(const box of winnerBoxes)  
            gridContainer.childNodes[box].firstChild.style.color = '#FF0000';

        if(gridBoxesFill[winnerBoxes[0]] === 1)
            ticTacToe.scores.DOMElements.player.textContent = ++ticTacToe.scores.player;  
    
        else 
            ticTacToe.scores.DOMElements.cpu.textContent = ++ticTacToe.scores.cpu;

        setTimeout(resetTicTacToeRound, 2000);

        ticTacToe.endRound = true;
        return;
    }

    if(ticTacToe.filledBoxesCount === 9) {
        ticTacToe.scores.DOMElements.tie.textContent = ++ticTacToe.scores.tie;

        setTimeout(resetTicTacToeRound, 2000);
        return;
    }

    if(ticTacToe.turn === 2) 
        setTimeout(cpuSelectBox, 500);
}

const checkWinnerBoxes = () => {
    const checkCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    for(const [a, b, c] of checkCombinations) {  
        if(gridBoxesFill[a] !== null && gridBoxesFill[a] === gridBoxesFill[b] && gridBoxesFill[a] === gridBoxesFill[c]) 
            return [a, b, c];
    }
    return null;
}

const cpuSelectBox = () => {
    let random = Math.floor(Math.random() * 9);

    while(gridBoxesFill[random] !== null) 
        random = Math.floor(Math.random() * 9);
    
    fillBox(random, ticTacToe.turn);
}

const resetTicTacToeRound = () => {
    gridContainer.querySelectorAll('.grid-items').forEach(i => {
        if(i.firstChild !== null)
            i.firstChild.remove();
    });

    gridBoxesFill.fill(null);

    ticTacToe.filledBoxesCount = 0;

    ticTacToe.turn = 1 + Math.floor(Math.random() * 2);

    if(ticTacToe.turn === 2) 
        setTimeout(cpuSelectBox, 500);

    ticTacToe.endRound = false;
}

/* 
    Calls
*/

switchPages('Menu');
createDarkModeButton();