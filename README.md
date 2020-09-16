[See it live](https://alvinzhao2020.github.io/JS-GO-Game/)


## Overview
JS GO is a Javascript webpage game, its rules are as same as an tradational Chinese Go 
game. In this game there are two models a player can pick ,one is to play with AI, the
other is to play with another player. one player takes black and the other takes white,
black always go first. Who gets the first 5 same-color pieces in a row will win the game.like this pic shows below

<img src="images/Screen Shot 2020-09-16 at 2.31.24 PM.png" width="800" title="JS GO">

## Features

### New Game

When one side win the game , User can click new game button to start a new game

![Alt Text](https://github.com/xdeng9/sunday-market/blob/master/frontend/src/image/search.gif?raw=true)

### Two Player / one Player 

User can switch betweem playing with anohter player or with AI.

![Alt Text](https://github.com/xdeng9/sunday-market/blob/master/frontend/src/image/account.gif?raw=true)

## Code Snippets

A playable AI.

```javascript
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
```

## Functionality and MVP
- [ ] Links to personal page
- [ ] FavIcon 
- [ ] Players can play and pause back ground music
- [ ] Players can play with another Player
- [ ] When have a winner, shows the winner and player can replay a new game

## Bonus Features
- [ ] AI player
