import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "primereact/button"
import { game } from "../constant-text/text.js";
import { routes } from "../routes/routes.js";
import { get, set, update } from 'idb-keyval';
import Card from "./cardPlayer"
import Title from "./titlePages.jsx";

const Game = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [namePlayer, setNamePlayer] = useState("");

    useEffect(() => {
        if (location.state === null) {
            exitToHome();
        }
        else {
            setNamePlayer(location.state.namePlayer)
        }
    }, []);

    const items = [game.rock, game.paper, game.scissors];
    const [selectedItemPlayer, setSelectedItemPlayer] = useState("");
    const [selectedItemBot, setSelectedItemBot] = useState("");
    const [randomNumber, setRandomNumber] = useState(-1);

    const [scorePlayer, setScorePlayer] = useState(0);
    const [scoreBot, setScoreBot] = useState(0);

    const [winner, setWinner] = useState("-");

    useEffect(() => {
        getData();
    }, [namePlayer]);

    useEffect(() => {
        if (selectedItemBot !== game.botThinks) {
            calculateWhoWins();
        }
    }, [selectedItemPlayer, selectedItemBot]);

    useEffect(() => {
        updateData();
    }, [scoreBot, scorePlayer]);

    const playGame = (item) => {
        setSelectedItemPlayer(item);
        botPlays();
    };

    const botPlays = () => {
        setSelectedItemBot(game.botThinks);
        let random = Math.floor(Math.random() * items.length);
        do {
            random = Math.floor(Math.random() * items.length);
        } while (randomNumber === random);

        if (randomNumber !== random) {
            setRandomNumber(random)
            setTimeout(() => {
                setSelectedItemBot(items[random]);
            }, 1000);
        };
    };

    const calculateWhoWins = () => {
        if (selectedItemBot !== "") {
            if (selectedItemPlayer === selectedItemBot) {
                setWinner(game.tie);
            } else {
                if ((selectedItemBot === game.rock && selectedItemPlayer === game.scissors) ||
                    (selectedItemBot === game.scissors && selectedItemPlayer === game.paper) ||
                    (selectedItemBot === game.paper && selectedItemPlayer === game.rock)) {
                    setWinner(game.loser);
                    setScoreBot(scoreBot + 1)
                } else {
                    setWinner(game.winner);
                    setScorePlayer(scorePlayer + 1)
                }
            }
        }
    };

    const exitToHome = () => {
        navigate(routes.home);
    };

    const getData = () => {
        if (namePlayer !== "") {
            get(namePlayer)
                .then((data) => {
                    if (data === undefined) {
                        setData();
                    } else {
                        setNamePlayer(data.namePlayer)
                        setScorePlayer(data.scorePlayer);
                        setScoreBot(data.scoreBot);
                    }
                })
                .catch((err) => console.log('It failed getdata!', err));
        }
    };

    const setData = () => {
        let data = {
            namePlayer: namePlayer,
            scorePlayer: scorePlayer,
            scoreBot: scoreBot
        }
        set(namePlayer, data)
            .then(() => console.log('It worked setdata!'))
            .catch((err) => console.log('It failed setdata!', err));
    };

    const updateData = () => {
        let newData = {
            namePlayer: namePlayer,
            scorePlayer: scorePlayer,
            scoreBot: scoreBot
        }
        update(namePlayer, ({ }) => {
            return newData
        })
            .then(() => console.log('It worked updatedata!'))
            .catch(() => console.log('It failed updatedata!'));
    };

    const renderItems = () => {
        return items.map((item) => {
            const icon = game[`${item}`]
            return (<Button
                disabled={selectedItemBot === game.botThinks}
                className="ItemBtn"
                key={item}
                onClick={() => playGame(item)}
                data-testid={item}>
                <span className="material-symbols-outlined ItemIcon">{icon}</span>
            </Button >)
        })
    };

    return (<>
        <Title title={game.title} description={game.description + namePlayer.toUpperCase()} />
        <p className="WinnerLabel">{winner.toUpperCase()}</p>
        <div className="ItemsContainer" >
            {renderItems()}
        </div>
        <div className="AllCardsContainer">
            <Card name={namePlayer} score={scorePlayer} selectedItem={selectedItemPlayer} />
            <p>{game.vs}</p>
            <Card name={game.bot} score={scoreBot} selectedItem={selectedItemBot} />
        </div>
        <Button
            onClick={() => exitToHome()}
            className="Button">
            <i className="pi pi-arrow-left Button-icon" />
        </Button>
    </>
    );
}

export default Game;