## TicTacToe
An introduction to AI minmax algorithm.

An unbeatable tic-tac-toe ai can be found at:
https://petermaidarobot-tictactoe.herokuapp.com/


## How to Run
Used to be on Heroku, but the accounts are no longer free. It can be run from
your local computer with "npm start" and then navigate to 127.0.0.1:8080 in a browser.



## History

Tutorial from: https://www.youtube.com/watch?v=P2TcQ3h0ipQ

But this one could be beaten with:
|   | 2 |   |
 ----------
| 1 |   |   |
 ----------
| 4 | 5 | 3 |
 or
| 1 |   | 4 |
----------
|   |   | 5 |
----------
|   | 3 | 2 |
and it's bugged and will say "tie"

It also will prevent this win instead of winning itself:
| 1 |   | 2 |
 ----------
|   |   |   |
 ----------
|   |   | 3 |
