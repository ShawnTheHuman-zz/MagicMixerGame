// const server = require('express')();
// const http = require('http').createServer(server);
// const io = require('socket.io')(http);

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);
const port = 3000;

let players = [];
let player1;
let player2;


io.on('connection', function (socket) {

    socket.emit("isPlayer1");
    socket.emit("isPlayer2");

    socket.on('player1Connected', function () {
        socket.join('room1');
        player1 = socket.id;
        console.log(player1 + " connected as Player1");
    })

    socket.on('player2Connected', function () {
        socket.join('room1');
        player2 = socket.id;
        console.log(player2 + " connected as Player2");
    })


    socket.on("MessageSent", function()
    {



    });





    // console.log('A user connected: ' + socket.id);
    // players.push(socket.id);
    //
    // if (players.length === 1) {
    //
    //     console.log("Setting " + socket.id + " as Player 1");
    //     io.emit("isPlayer1");
    //     player1 = socket.id;
    // }
    // else if(players.length > 1)
    // {
    //     console.log(socket.id + " is Player " + players.length);
    // }

    socket.on('newMsgPlayer1', ({ message, name }) => {
        socket.to("room1").emit('getMsgPlayer1', { message, name });
        console.log("Server received msg from Player1: " + message);
    });



    socket.on("sendRandomBeaker", ({beakerC}) =>
    {
        socket.to("room1").emit('getRandomBeaker', { beakerC });


    });


    socket.on("sendPlayerBeaker", ({beakerC}) =>
    {
        socket.to("room1").emit('getPlayerBeaker', { beakerC });

        //console.log("Sending Player Beaker to Room");

    });


    socket.on('newMsgPlayer2', ({ message, name }) => {
        socket.to("room1").emit('getMsgPlayer2', { message, name });
        console.log("Server received msg from Player2: " + message);
    })

    socket.on("sendTime", (timeArray) => {

        console.log(timeArray);
        socket.to("room1").emit('getTime', {timeArray});

    })

    socket.on('disconnect', function () {
        if (socket.id === player1) {
            console.log('Player1 disconnected');
        } else if (socket.id === player2) {
            console.log('Player2 disconnected');
        }
        // io.emit('disconnect', socket.id);
    });
});

server.listen(port, function () {
    console.log("Server listening on: " + port);
});

