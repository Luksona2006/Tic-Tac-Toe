let chooseProperties = document.getElementById('chooseProperties');
let playDiv = document.getElementById('playDiv')
let restartButton = document.getElementById('restart')

let quitNextButtons = document.getElementById('quitNextButtons');
let cancelRestartButtons = document.getElementById('cancelRestartButtons');

let cancelRestart = document.getElementById('cancelRestart')
let confirmRestart = document.getElementById('confirmRestart')

let selectXMark = document.getElementById('XMark');
let selectOMark = document.getElementById('OMark');
let xMarkPath = document.getElementById('xMarkPath');
let oMarkPath = document.getElementById('oMarkPath');
let pickText = document.getElementById('pickText');
let choosed = false;

let sumX = document.getElementById('sumX');
let sumTies = document.getElementById('sumTies');
let sumO = document.getElementById('sumO');

let x = 0;
let o = 0;
let ties = 0;

let blur = document.getElementById('blur');
let wonDiv = document.getElementById('wonDiv');
let winOrLose = document.getElementById('winOrLose');
let getWinner = document.getElementById('getWinner');

let squares = document.getElementById('squares');
let random;
let winWays = [
    // ROW WIN
    [squares.children[0], squares.children[1], squares.children[2]],
    [squares.children[3], squares.children[4], squares.children[5]],
    [squares.children[6], squares.children[7], squares.children[8]],
    // COLUMN WIN
    [squares.children[0], squares.children[3], squares.children[6]],
    [squares.children[1], squares.children[4], squares.children[7]],
    [squares.children[2], squares.children[5], squares.children[8]],
    // LINE WIN
    [squares.children[0], squares.children[4], squares.children[8]],
    [squares.children[2], squares.children[4], squares.children[6]]
]

let cpuButton = document.getElementById('cpuButton');
let playerButton = document.getElementById('playerButton');

let square = document.querySelectorAll('.square');
let turn = document.querySelector('.turn-div');
let nextStep = 'X';

let turnO = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10ZM5.92593 10C5.92593 7.74995 7.74995 5.92593 10 5.92593C12.25 5.92593 14.0741 7.74995 14.0741 10C14.0741 12.25 12.25 14.0741 10 14.0741C7.74995 14.0741 5.92593 12.25 5.92593 10Z" fill="#A8BFC9"/>
            </svg>
            <p>TURN</p>`;

let turnX = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5125 1.09882C17.3409 -0.0727495 15.4415 -0.0727515 14.2699 1.09882L10 5.3687L5.73012 1.09882C4.55855 -0.0727497 2.65906 -0.0727508 1.48749 1.09882L1.09882 1.48748C-0.0727492 2.65906 -0.0727511 4.55855 1.09882 5.73012L5.3687 10L1.09882 14.2699C-0.0727497 15.4414 -0.0727508 17.3409 1.09882 18.5125L1.48748 18.9012C2.65906 20.0728 4.55855 20.0728 5.73012 18.9012L10 14.6313L14.2699 18.9012C15.4414 20.0727 17.3409 20.0728 18.5125 18.9012L18.9012 18.5125C20.0728 17.3409 20.0728 15.4415 18.9012 14.2699L14.6313 10L18.9012 5.73012C20.0727 4.55855 20.0728 2.65906 18.9012 1.48749L18.5125 1.09882Z" fill="#A8BFC9"/>
            </svg>
            <p>TURN</p>`;

// CHOOSE MARK

function chooseXMark() {
    selectXMark.style.backgroundColor = "#A8BFC9";
    selectXMark.style.borderRadius = "10px";
    xMarkPath.style.fill = "#1A2A33";
    selectOMark.style.backgroundColor = "transparent";
    selectOMark.style.borderRadius = "4px"
    oMarkPath.style.fill = "#A8BFC9";
    choosed = 'X';
    pickText.style.color = "#A8BFC9";
    pickText.innerHTML = "PICK PLAYER 1'S MARK";
}

function chooseOMark() {
    selectOMark.style.backgroundColor = "#A8BFC9";
    selectOMark.style.borderRadius = "10px";
    oMarkPath.style.fill = "#1A2A33";
    selectXMark.style.backgroundColor = "transparent";
    selectXMark.style.borderRadius = "4px"
    xMarkPath.style.fill = "#A8BFC9";
    choosed = 'O';
    pickText.style.color = "#A8BFC9";
    pickText.innerHTML = "PICK PLAYER 1'S MARK";
}

// STARTING TIMEOUT

function startText() {
    let starting = document.createElement('h2');
    starting.classList.add('start-text');
    starting.style.display = "block";
    let body = document.body;
    body.appendChild(starting);

    setTimeout(() => {
        starting.style.opacity = "1";
        starting.textContent = "3...";
    }, 200)
    setTimeout(() => {
        starting.style.opacity = "0";
    }, 600)
    setTimeout(() => {
        starting.style.opacity = "1";
        starting.textContent = "2...";
    }, 1200)
    setTimeout(() => {
        starting.style.opacity = "0";
    }, 1800)
    setTimeout(() => {
        starting.style.opacity = "1";
        starting.textContent = "1...";
    }, 2400)
    setTimeout(() => {
        starting.style.opacity = "0";
    }, 3000)
    setTimeout(() => {
        starting.style.opacity = "1";
        starting.textContent = "Start!";
    }, 3600)
    setTimeout(() => {
        starting.style.opacity = "0";
    }, 4200)
    setTimeout(() => {
        starting.style.display = "none";

    }, 4800)

}

// PLAYER MODE

let svgXB = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.2407 62.8526L62.8526 53.2407C64.0242 52.0691 64.0242 50.1696 62.8526 48.9981L45.8546 32.0001L62.8526 15.0021C64.0242 13.8305 64.0242 11.931 62.8526 10.7594L53.2407 1.14748C52.0691 -0.0240943 50.1696 -0.0240927 48.9981 1.14748L32.0001 18.1455L15.0021 1.14748C13.8305 -0.0240945 11.931 -0.0240945 10.7594 1.14748L1.14748 10.7594C-0.0240945 11.931 -0.0240945 13.8305 1.14748 15.0021L18.1455 32.0001L1.14748 48.9981C-0.0240923 50.1696 -0.0240923 52.0691 1.14748 53.2407L10.7594 62.8526C11.931 64.0242 13.8305 64.0242 15.0021 62.8526L32.0001 45.8546L48.9981 62.8526C50.1696 64.0242 52.0691 64.0242 53.2407 62.8526Z" fill="#1F3641"/>
            </svg>`;

let svgX = '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.2407 62.8526L62.8526 53.2407C64.0242 52.0691 64.0242 50.1696 62.8526 48.9981L45.8546 32.0001L62.8526 15.0021C64.0242 13.8305 64.0242 11.931 62.8526 10.7594L53.2407 1.14748C52.0691 -0.0240943 50.1696 -0.0240927 48.9981 1.14748L32.0001 18.1455L15.0021 1.14748C13.8305 -0.0240945 11.931 -0.0240945 10.7594 1.14748L1.14748 10.7594C-0.0240945 11.931 -0.0240945 13.8305 1.14748 15.0021L18.1455 32.0001L1.14748 48.9981C-0.0240923 50.1696 -0.0240923 52.0691 1.14748 53.2407L10.7594 62.8526C11.931 64.0242 13.8305 64.0242 15.0021 62.8526L32.0001 45.8546L48.9981 62.8526C50.1696 64.0242 52.0691 64.0242 53.2407 62.8526Z" fill="#31C3BD"></path>\n            </svg>';

let svgOB = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32ZM18.963 32C18.963 24.7998 24.7998 18.963 32 18.963C39.2002 18.963 45.037 24.7998 45.037 32C45.037 39.2002 39.2002 45.037 32 45.037C24.7998 45.037 18.963 39.2002 18.963 32Z" fill="#1F3641"/>
                </svg>`;

let svgO = '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32ZM18.963 32C18.963 24.7998 24.7998 18.963 32 18.963C39.2002 18.963 45.037 24.7998 45.037 32C45.037 39.2002 39.2002 45.037 32 45.037C24.7998 45.037 18.963 39.2002 18.963 32Z" fill="#F2B137"></path>\n            </svg>';

if (window.innerWidth <= 560) {
    svgO = '<svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32ZM18.963 32C18.963 24.7998 24.7998 18.963 32 18.963C39.2002 18.963 45.037 24.7998 45.037 32C45.037 39.2002 39.2002 45.037 32 45.037C24.7998 45.037 18.963 39.2002 18.963 32Z" fill="#F2B137"></path>\n            </svg>';
    svgX = '<svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.2407 62.8526L62.8526 53.2407C64.0242 52.0691 64.0242 50.1696 62.8526 48.9981L45.8546 32.0001L62.8526 15.0021C64.0242 13.8305 64.0242 11.931 62.8526 10.7594L53.2407 1.14748C52.0691 -0.0240943 50.1696 -0.0240927 48.9981 1.14748L32.0001 18.1455L15.0021 1.14748C13.8305 -0.0240945 11.931 -0.0240945 10.7594 1.14748L1.14748 10.7594C-0.0240945 11.931 -0.0240945 13.8305 1.14748 15.0021L18.1455 32.0001L1.14748 48.9981C-0.0240923 50.1696 -0.0240923 52.0691 1.14748 53.2407L10.7594 62.8526C11.931 64.0242 13.8305 64.0242 15.0021 62.8526L32.0001 45.8546L48.9981 62.8526C50.1696 64.0242 52.0691 64.0242 53.2407 62.8526Z" fill="#31C3BD"></path>\n            </svg>';
    svgOB = `<svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32ZM18.963 32C18.963 24.7998 24.7998 18.963 32 18.963C39.2002 18.963 45.037 24.7998 45.037 32C45.037 39.2002 39.2002 45.037 32 45.037C24.7998 45.037 18.963 39.2002 18.963 32Z" fill="#1F3641"/>
            </svg>`;
    svgXB = `<svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.2407 62.8526L62.8526 53.2407C64.0242 52.0691 64.0242 50.1696 62.8526 48.9981L45.8546 32.0001L62.8526 15.0021C64.0242 13.8305 64.0242 11.931 62.8526 10.7594L53.2407 1.14748C52.0691 -0.0240943 50.1696 -0.0240927 48.9981 1.14748L32.0001 18.1455L15.0021 1.14748C13.8305 -0.0240945 11.931 -0.0240945 10.7594 1.14748L1.14748 10.7594C-0.0240945 11.931 -0.0240945 13.8305 1.14748 15.0021L18.1455 32.0001L1.14748 48.9981C-0.0240923 50.1696 -0.0240923 52.0691 1.14748 53.2407L10.7594 62.8526C11.931 64.0242 13.8305 64.0242 15.0021 62.8526L32.0001 45.8546L48.9981 62.8526C50.1696 64.0242 52.0691 64.0242 53.2407 62.8526Z" fill="#1F3641"/>
            </svg>`;
}

function mouseOver(e) {
    let currentDiv = e.currentTarget;
    if (currentDiv.innerHTML !== "") {
        currentDiv.style.cursor = "unset";
    } else {
        currentDiv.style.cursor = "pointer";
    }
}

// TIE 

function clickDiv(e) {
    let curDiv = e.currentTarget;
    let emptySquare = false;
    let win = false;
    // PASTE & FIND NEXT 
    if (curDiv.innerHTML == "") {
        if (nextStep == 'X') {
            curDiv.innerHTML = `${svgX}`;
            nextStep = 'O';
            turn.innerHTML = `${turnO}`;
            if (choosed == 'X' && sumX.firstChild.innerText == 'X (CPU)' || sumO.firstChild.innerText == 'O (CPU)') {
                square.forEach(element => {
                    if (element.innerHTML === '') {
                        emptySquare = true;
                        random = squares.children[Math.floor(Math.random() * 9)]
                    }
                });
                if (emptySquare === true) {
                    random.innerHTML = `${svgO}`
                }
                nextStep = 'X';
                turn.innerHTML = `${turnX}`;
            }

        } else if (nextStep == 'O') {
            curDiv.innerHTML = `${svgO}`;
            nextStep = 'X';
            turn.innerHTML = `${turnX}`;
            if (choosed == 'O' && sumX.firstChild.innerText == 'X (CPU)' || sumO.firstChild.innerText == 'O (CPU)') {
                square.forEach(element => {
                    if (element.innerHTML === '') {
                        emptySquare = true;
                        random = squares.children[Math.floor(Math.random() * 9)]
                    }
                });
                if (emptySquare === true) {
                    random.innerHTML = `${svgX}`
                }
                nextStep = 'O';
                turn.innerHTML = `${turnO}`;
            }
        }
    }

    for (let i = 0; i < winWays.length; i++) {
        if (winWays[i][0].innerHTML === winWays[i][1].innerHTML && winWays[i][1].innerHTML === winWays[i][2].innerHTML && winWays[i][0].innerHTML !== ``) {
            if (winWays[i][0].innerHTML == `${svgX}`) {
                winWays[i][0].style.backgroundColor = '#31C3BD';
                winWays[i][1].style.backgroundColor = '#31C3BD';
                winWays[i][2].style.backgroundColor = '#31C3BD';
                // CHANGE ICON
                winWays[i][0].innerHTML = `${svgXB}`
                winWays[i][1].innerHTML = `${svgXB}`
                winWays[i][2].innerHTML = `${svgXB}`
                x++
                sumX.lastElementChild.innerHTML = `${x}`;
                // GET NOTIFICATION
                blur.style.display = "block";
                wonDiv.style.display = "flex";
                quitNextButtons.style.display = "flex"
                cancelRestartButtons.style.display = "none"
                if (choosed == 'O') {
                    winOrLose.innerText = 'OH NO, YOU LOST…';
                }
                if (choosed == 'X') {
                    winOrLose.innerText = 'PLAYER 1 WINS!';
                }
                if (sumX.firstChild.innerText == 'X (CPU)' || sumO.firstChild.innerText == 'O (CPU)') {
                    if (choosed == 'O') {
                        winOrLose.innerText = 'OH NO, YOU LOST…';
                    }
                    if (choosed == 'X') {
                        winOrLose.innerText = 'YOU WON!';
                    }
                }
                getWinner.firstElementChild.style.display = "block";
                if (window.innerWidth <= 560) {
                    svgX = '<svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M53.2407 62.8526L62.8526 53.2407C64.0242 52.0691 64.0242 50.1696 62.8526 48.9981L45.8546 32.0001L62.8526 15.0021C64.0242 13.8305 64.0242 11.931 62.8526 10.7594L53.2407 1.14748C52.0691 -0.0240943 50.1696 -0.0240927 48.9981 1.14748L32.0001 18.1455L15.0021 1.14748C13.8305 -0.0240945 11.931 -0.0240945 10.7594 1.14748L1.14748 10.7594C-0.0240945 11.931 -0.0240945 13.8305 1.14748 15.0021L18.1455 32.0001L1.14748 48.9981C-0.0240923 50.1696 -0.0240923 52.0691 1.14748 53.2407L10.7594 62.8526C11.931 64.0242 13.8305 64.0242 15.0021 62.8526L32.0001 45.8546L48.9981 62.8526C50.1696 64.0242 52.0691 64.0242 53.2407 62.8526Z" fill="#31C3BD"></path>\n            </svg>';
                }
                getWinner.firstElementChild.innerHTML = `${svgX}`
                getWinner.lastElementChild.innerHTML = "TAKES THE ROUND";
                getWinner.lastElementChild.style.color = "#31C3BD";
                win = true;
            }
            if (winWays[i][0].innerHTML == `${svgO}`) {
                winWays[i][0].style.backgroundColor = '#F2B137';
                winWays[i][1].style.backgroundColor = '#F2B137';
                winWays[i][2].style.backgroundColor = '#F2B137';
                // CHANGE ICON
                winWays[i][0].innerHTML = `${svgOB}`
                winWays[i][1].innerHTML = `${svgOB}`
                winWays[i][2].innerHTML = `${svgOB}`
                o++
                sumO.lastElementChild.innerHTML = `${o}`;
                // GET NOTIFICATION
                blur.style.display = "block";
                wonDiv.style.display = "flex";
                quitNextButtons.style.display = "flex"
                cancelRestartButtons.style.display = "none"
                if (choosed == 'O') {
                    winOrLose.innerText = 'PLAYER 1 WINS!';
                }
                if (choosed == 'X') {
                    winOrLose.innerText = 'OH NO, YOU LOST…';
                }
                if (sumX.firstChild.innerText == 'X (CPU)' || sumO.firstChild.innerText == 'O (CPU)') {
                    if (choosed == 'O') {
                        winOrLose.innerText = 'YOU WON';
                    }
                    if (choosed == 'X') {
                        winOrLose.innerText = 'OH NO, YOU LOST…';
                    }
                }
                getWinner.firstElementChild.style.display = "block";
                if (window.innerWidth <= 560) {
                    svgO = '<svg width="40" height="40" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path fill-rule="evenodd" clip-rule="evenodd" d="M64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32ZM18.963 32C18.963 24.7998 24.7998 18.963 32 18.963C39.2002 18.963 45.037 24.7998 45.037 32C45.037 39.2002 39.2002 45.037 32 45.037C24.7998 45.037 18.963 39.2002 18.963 32Z" fill="#F2B137"></path>\n            </svg>';
                }
                getWinner.firstElementChild.innerHTML = `${svgO}`
                getWinner.lastElementChild.innerHTML = "TAKES THE ROUND";
                getWinner.lastElementChild.style.color = "#F2B137";
                win = true;
            }
        }
    }
    square.forEach((element, index) => {
        if (element.innerHTML == '') {
            emptySquare = true;
        }
        if (index >= squares.children.length - 1 && emptySquare === false && win === false) {
            ties++
            sumTies.lastElementChild.innerHTML = `${ties}`;
            // GET NOTIFICATION
            blur.style.display = "block";
            wonDiv.style.display = "flex";
            quitNextButtons.style.display = "flex"
            cancelRestartButtons.style.display = "none"
            getWinner.firstElementChild.style.display = "none";
            getWinner.lastElementChild.innerHTML = "ROUND TIED";
            getWinner.lastElementChild.style.color = "#A8BFC9";
            winOrLose.innerText = '';
        }
    });
}


// MODES
// function cpuMode() {
//     if (choosed == false) {
//         pickText.style.color = "#e66771";
//         return false;
//     }
//     if (choosed == 'O') {
//         pickText.style.color = "#e66771";
//         pickText.innerHTML = "CHOOSE X";
//         return false;
//     }
//     if (choosed === 'X') {
//         sumX.firstChild.innerText = 'X (YOU)';
//         sumO.firstChild.innerText = 'O (CPU)';
//     }
//     if (choosed === 'O') {
//         sumO.firstChild.innerText = 'O (YOU)';
//         sumX.firstChild.innerText = 'X (CPU)';
//     }

//     chooseProperties.style.transition = "0.6s all ease-out";
//     chooseProperties.style.opacity = "0";
//     setTimeout(() => {
//         chooseProperties.style.display = "none";
//     }, 600)
//     setTimeout(() => {
//         startText();
//     }, 700)
//     setTimeout(() => {
//         playDiv.style.display = "flex";
//     }, 5400)
//     setTimeout(() => {
//         playDiv.style.opacity = "1";
//     }, 5500)
// }

function playerMode() {
    if (choosed == false) {
        pickText.style.color = "#e66771";
        return false;
    }
    if (choosed === 'X') {
        sumX.firstChild.innerText = 'X (P1)';
        sumO.firstChild.innerText = 'O (P2)';
    }
    if (choosed === 'O') {
        sumO.firstChild.innerText = 'O (P1)';
        sumX.firstChild.innerText = 'X (P2)';
    }
    chooseProperties.style.transition = "0.6s all ease-out";
    chooseProperties.style.opacity = "0";
    setTimeout(() => {
        chooseProperties.style.display = "none";
    }, 600)
    setTimeout(() => {
        startText();
    }, 700)
    setTimeout(() => {
        playDiv.style.display = "flex";
    }, 5400)
    setTimeout(() => {
        playDiv.style.opacity = "1";
    }, 5500)
}

// AFTER WON OR TIE

function continueRound() {
    square.forEach(delEl => {
        delEl.innerHTML = "";
        delEl.style.backgroundColor = "#1F3641"
    });

    blur.style.display = "none";
    wonDiv.style.display = "none";
    nextStep = 'X';
    turn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5125 1.09882C17.3409 -0.0727496 15.4415 -0.0727515 14.2699 1.09882L10 5.3687L5.73012 1.09882C4.55855 -0.0727499 2.65906 -0.0727508 1.48749 1.09882L1.09882 1.48748C-0.072749 2.65906 -0.0727517 4.55855 1.09882 5.73012L5.3687 10L1.09882 14.2699C-0.0727499 15.4414 -0.0727508 17.3409 1.09882 18.5125L1.48748 18.9012C2.65906 20.0728 4.55855 20.0728 5.73012 18.9012L10 14.6313L14.2699 18.9012C15.4414 20.0727 17.3409 20.0728 18.5125 18.9012L18.9012 18.5125C20.0728 17.3409 20.0728 15.4415 18.9012 14.2699L14.6313 10L18.9012 5.73012C20.0727 4.55855 20.0728 2.65906 18.9012 1.48749L18.5125 1.09882Z" fill="#A8BFC9"/>
    </svg>
    <p>TURN</p>`;

}

function quitGame() {
    square.forEach(delEl => {
        delEl.innerHTML = "";
        delEl.style.backgroundColor = "#1F3641"
    });

    blur.style.display = "none";
    wonDiv.style.display = "none";
    choosed = false;
    nextStep = 'X';
    turn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5125 1.09882C17.3409 -0.0727496 15.4415 -0.0727515 14.2699 1.09882L10 5.3687L5.73012 1.09882C4.55855 -0.0727499 2.65906 -0.0727508 1.48749 1.09882L1.09882 1.48748C-0.072749 2.65906 -0.0727517 4.55855 1.09882 5.73012L5.3687 10L1.09882 14.2699C-0.0727499 15.4414 -0.0727508 17.3409 1.09882 18.5125L1.48748 18.9012C2.65906 20.0728 4.55855 20.0728 5.73012 18.9012L10 14.6313L14.2699 18.9012C15.4414 20.0727 17.3409 20.0728 18.5125 18.9012L18.9012 18.5125C20.0728 17.3409 20.0728 15.4415 18.9012 14.2699L14.6313 10L18.9012 5.73012C20.0727 4.55855 20.0728 2.65906 18.9012 1.48749L18.5125 1.09882Z" fill="#A8BFC9"/>
    </svg>
    <p>TURN</p>`;
    x = 0;
    o = 0;
    ties = 0;
    sumX.lastElementChild.innerHTML = `${x}`;
    sumO.lastElementChild.innerHTML = `${o}`;
    sumTies.lastElementChild.innerHTML = `${ties}`;
    playDiv.style.opacity = "0";
    playDiv.style.display = "none";
    setTimeout(() => {
        chooseProperties.style.display = "flex";
    }, 200)
    setTimeout(() => {
        chooseProperties.style.opacity = "1";
    }, 400)

    selectOMark.style.backgroundColor = "transparent";
    selectXMark.style.backgroundColor = "transparent";
    selectOMark.style.borderRadius = "4px"
    selectXMark.style.borderRadius = "4px"
    oMarkPath.style.fill = "#A8BFC9";
    xMarkPath.style.fill = "#A8BFC9";

}

// RESTART BUTTONS
function restartGame() {
    quitNextButtons.style.display = "none"
    cancelRestartButtons.style.display = "flex"
    blur.style.display = "block";
    wonDiv.style.display = "flex";
    winOrLose.innerText = '';
    getWinner.firstElementChild.style.display = "none"
    getWinner.lastElementChild.innerHTML = "RESTART GAME?";
    getWinner.lastElementChild.style.color = "#A8BFC9";
}

function cancelRes() {
    blur.style.display = "none";
    wonDiv.style.display = "none";
}

function confrimRes() {
    square.forEach(delEl => {
        delEl.innerHTML = "";
        delEl.style.backgroundColor = "#1F3641"
    });

    blur.style.display = "none";
    wonDiv.style.display = "none";
    nextStep = 'X';
    turn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5125 1.09882C17.3409 -0.0727496 15.4415 -0.0727515 14.2699 1.09882L10 5.3687L5.73012 1.09882C4.55855 -0.0727499 2.65906 -0.0727508 1.48749 1.09882L1.09882 1.48748C-0.072749 2.65906 -0.0727517 4.55855 1.09882 5.73012L5.3687 10L1.09882 14.2699C-0.0727499 15.4414 -0.0727508 17.3409 1.09882 18.5125L1.48748 18.9012C2.65906 20.0728 4.55855 20.0728 5.73012 18.9012L10 14.6313L14.2699 18.9012C15.4414 20.0727 17.3409 20.0728 18.5125 18.9012L18.9012 18.5125C20.0728 17.3409 20.0728 15.4415 18.9012 14.2699L14.6313 10L18.9012 5.73012C20.0727 4.55855 20.0728 2.65906 18.9012 1.48749L18.5125 1.09882Z" fill="#A8BFC9"/>
    </svg>
    <p>TURN</p>`;
    x = 0;
    o = 0;
    ties = 0;
    sumX.lastElementChild.innerHTML = `${x}`;
    sumO.lastElementChild.innerHTML = `${o}`;
    sumTies.lastElementChild.innerHTML = `${ties}`;
}


// EVENTS
restartButton.addEventListener('click', restartGame);

cancelRestart.addEventListener('click', cancelRes);
confirmRestart.addEventListener('click', confrimRes);

nextRound.addEventListener('click', continueRound);
quit.addEventListener('click', quitGame);

selectXMark.addEventListener('click', chooseXMark);
selectOMark.addEventListener('click', chooseOMark);

playerButton.addEventListener('click', playerMode);

square.forEach(div => {
    div.addEventListener('mouseover', mouseOver)
})

square.forEach(div => {
    div.addEventListener('click', clickDiv)
})




