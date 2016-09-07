---
layout: post
title: "Scotland Yard Case Study"
author: "Bilal Kazi"
---

![Finished Java based game](/images/scotland-yard-finshed.png){:class="post-image"}

The Scotland Yard project was part of the final project for the Programming and Algorithms unit, the aim of which was to, in a team of two, digitally recreate the [Scotland Yard Board Game](https://en.wikipedia.org/wiki/Scotland_Yard_(board_game)). It involved two parts. The first part was to build a model for the provided MVC framework so that it integrates with the Java GUI and yields a playable game. The second to build an AI that would play the game as both Mr. X and the detectives.

Scotland Yard is a board game in which a team of players, as police, cooperate to track down a player controlling a criminal(Mr X) around a board representing the streets of London. It is named after Scotland Yard, the headquarters of London's Metropolitan Police Service. Scotland Yard is an asymmetric board game, where the objective of the game, if you are Mr X is to stay undercover to escape the detectives until they can no longer move. However if you are the detectives, you must catch Mr X by moving onto the playing area where he is currently hiding.

### The model

We were provided with a starter project that had the View and Controller for the game and GUI. There were also JUnit tests given to drive the development of the Model which were the rules of the game. The use of object oriented principles made it easier to make pieces that fit in with the provided puzzle. Djikstra's algorithm was employed to find the possible moves that could be made by the players on the board. There  was a requirement to implement functionality such that 'spectators' could be added to the game,so we used the observer pattern to inform the spectators of the state of the game.

### The AI

![Scotland Yard Multiplayer](/images/scotland-yard-multiplayer.png){:class="post-image"}

Before we could get started with building the AI we had to complete the JavaScript controller that would run in the browser and handle messages from the servers. The second part involved using a browser based view and controller to enable us to play games over the network and pit our AI opponents against each other. 

The first step in building the AI was to create a heuristic board scoring approach. We used [Claude Shannon's paper](http://archive.computerhistory.org/projects/chess/related_materials/text/2-0%20and%202-1.Programming_a_computer_for_playing_chess.shannon/2-0%20and%202-1.Programming_a_computer_for_playing_chess.shannon.062303002.pdf) on the subject of evaluation functions for chess as inspiration to come up with our own board scoring solution that took into account relative positions of players and mobility of the player itself and mobility of Mr X if the player concerned was a detective. To advance the AI opponent further we looked to use the MiniMax algorithm on a game tree. Building the game tree was a challenging task since there are a high number of possible moves for each position when combined with the multiple modes of transport. To optimise this process I implemented a parallel tree building method that used `ThreadPoolExecutor` and other classes from the Java concurrent class to build the tree as far as possible within the given time limit. Further optimisation included using AlphaBeta pruning to reduce the tree that needed to be spanned. As a last step to squeeze out more performance a Monte Carlo search style random sampling technique was used.

The effort involved resulted in being awarded a First based on the above project 
