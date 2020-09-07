let isBlack = true;
let isPlayer = true;
let chessBoard = [];
let gameover = false;
let AIplayer = true;


const newGame = document.getElementById('newgame')
newGame.onclick = function () {
    window.location.reload();
}

const twoPlayer = document.getElementById('two-players')
twoPlayer.onclick = function () {
    AIplayer = false;      
}

const onePlayer = document.getElementById('one-player')
onePlayer.onclick = function () {
    window.location.reload()
    AIplayer = true;
}


for (let i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (let j = 0; j < 15; j++) {
        chessBoard[i][j] = 0
    }
}

//AI wins
let wins = [];
for (let i = 0; i < 15; i++) {
    wins[i] =[];
    for (let j = 0; j < 15; j++) {
        wins[i][j] =[];
    }
}

let count = 0;

for(let i = 0; i<15;i++){
    for(let j=0;j<11;j++){
        for(let k=0;k<5;k++){
            wins[i][j+k][count] = true;
        }
        count ++;
    }
}

for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[j+k][i][count] = true;
        }
        count++;
    }
}

for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i + k][j + k][count] = true;
        }
        count++;
    }
}

for (let i = 0; i < 11; i++) {
    for (let j = 14; j >3; j--) {
        for (let k = 0; k < 5; k++) {
            wins[i + k][j - k][count] = true;
        }
        count++;
    }
}
// console.log(count);

let blackWin = [];
let whiteWin = [];
let AIWin = [];
let playerWin = [];
for( let i=0;i<count;i++){
    blackWin[i] = 0;
    whiteWin[i] = 0;
    AIWin[i] = 0;
    playerWin[i] = 0;
}





const chess = document.getElementById('chess');
const context = chess.getContext('2d');

context.strokeStyle = 'black';
const background = new Image();
background.src='images/bcg.png';
background.onload = function(){
    
    drawChessBoard();
    
}


const drawChessBoard = function(){
    for(let i=0 ; i<15; i++){
        context.moveTo(15+i*30, 15);
        context.lineTo(15+i*30, 435);
        context.stroke();
        context.moveTo(15,15 + i * 30);
        context.lineTo(435,15 + i * 30);
        context.stroke();
    }
}

const oneStep = function(i,j,black){
    context.beginPath();
    context.arc(15+i*30, 15+j*30, 13, 0, 2 * Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 12,
         15 + i * 30 + 2, 15 + j * 30 - 2, 0);
    if(black){
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#636766');
}
    else{
        gradient.addColorStop(0, '#D1D1D1');
        gradient.addColorStop(1, '#F9F9F9');
    }
    context.fillStyle = gradient
    context.fill();
    clickSound.play();
}

chess.onclick = function(e){
    if(AIplayer === false){
        if(gameover){
            return
        }
        let x = e.offsetX;
        let y = e.offsetY;
        let i = Math.floor(x/30);
        let j = Math.floor(y/30);
        if(chessBoard[i][j]===0){
            oneStep(i, j, isBlack);
            if(isBlack){
                chessBoard[i][j] = 1;
                for (let k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        blackWin[k]++;
                        whiteWin[k] = -1;
                        if (blackWin[k] === 5) {
                            setTimeout(function () { window.alert('Black win'); })
                            gameover = true;
                        } if (whiteWin[k] === 5) {
                            setTimeout(function () { window.alert('White win'); })
                            gameover = true;
                        }
                    }
                }
            }else{
                chessBoard[i][j] = 2;
                for (let k = 0; k < count; k++) {
                    if (wins[i][j][k]) {
                        blackWin[k] =-1;
                        whiteWin[k] ++;
                        if (blackWin[k] === 5) {
                            setTimeout(function () { window.alert('Black win'); })
                            gameover = true;
                        } if (whiteWin[k] === 5) {
                            setTimeout(function () { window.alert('White win'); })
                            gameover = true;
                        }
                    }
                }
            }
            isBlack = !isBlack;  
        }
    }
    else if(AIplayer ===true){
        if (gameover) {
            return
        }
        if(!isPlayer){
            return
        }
        let x = e.offsetX;
        let y = e.offsetY;
        let i = Math.floor(x / 30);
        let j = Math.floor(y / 30);
        if (chessBoard[i][j] === 0) {
            oneStep(i, j, isPlayer);
            chessBoard[i][j] = 1; 
            isPlayer = !isPlayer;      
            for (let k = 0; k < count; k++) {
                if (wins[i][j][k]) {
                    playerWin[k]++;
                    AIWin[k] = -1;
                    if (playerWin[k] === 5) {
                        setTimeout(function () { window.alert('player win'); },2000)
                        gameover = true;
                    }
                }
            }
            if(!gameover){
                computerAI();
                isPlayer = !isPlayer;
            }
        }
    }
}

const computerAI = function(){
    const playerScore =[];
    const AIScore =[];
    let max = 0;
    let u = 0;
    let v = 0;
    for(let i =0; i<15;i++){
        playerScore[i] = [];
        AIScore[i] = [];
        for(let j = 0;j<15;j++){
            playerScore[i][j] = 0;
            AIScore[i][j] = 0;
        }
    }
    for(let i=0;i<15;i++){
        for(let j=0;j<15;j++){
            if(chessBoard[i][j]===0){
                for(let k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(playerWin[k] ===1){
                            playerScore[i][j]+=200;
                        }else if(playerWin[k]===2){
                            playerScore[i][j] += 400;
                        } else if (playerWin[k] === 3) {
                            playerScore[i][j] += 2000;
                        } else if (playerWin[k] === 4) {
                            playerScore[i][j] += 10000;
                        }
                        if (AIWin[k] === 1) {
                            AIScore[i][j] += 250;
                        } else if (AIWin[k] === 2) {
                            AIScore[i][j] += 500;
                        } else if (AIWin[k] === 3) {
                            AIScore[i][j] += 2000;
                        } else if (AIWin[k] === 4) {
                            AIScore[i][j] += 20000;
                        }
                    }
                }
                if(playerScore[i][j]>max){
                    max = playerScore[i][j];
                    u=i;
                    v=j;
                }else if(playerScore === max){
                    if(AIScore[i][j]>AIScore[u][v]){
                        u= i;
                        v= j;
                    }
                }
                if (AIScore[i][j] > max) {
                    max = AIScore[i][j];
                    u = i;
                    v = j;
                } else if (AIScore === max) {
                    if (playerScore[i][j] > playerScore[u][v]) {
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }
    oneStep(u,v,false);
    chessBoard[u][v] = 2;
    for (let k = 0; k < count; k++) {
        if (wins[u][v][k]) {
            playerWin[k] = -1;
            AIWin[k]++;
            if (AIWin[k] === 5) {
                setTimeout(function () { window.alert('AI win'); },800)
                gameover = true;
            } 
        }
    }
}

const bgm = new Audio();
bgm.src ='music/bgm.mp3';

function playbgm() {
    bgm.play();
}


function stopbgm(){
    bgm.pause();
}

const clickSound = new Audio();
clickSound.src='music/putpiece.wav';
function clicksound(){
    clickSound.play();
}



