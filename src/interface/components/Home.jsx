import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import { home } from "../constant-text/text.js";
import { routes } from "../routes/routes.js";
import Title from "./titlePages.jsx";

const Home = () => {
    const [namePlayer, setNamePlayer] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const navigate = useNavigate();

    const handleOnChange = (name) => {
        setNamePlayer(name.target.value);
    };

    const continueToGame = () => {
        if (namePlayer !== "") {
            navigate(routes.game, { state: { namePlayer: namePlayer } });
        } else {
            setShowDialog(true)
        };
    };

    const onHide = () => {
        setShowDialog(false);
    };

    return (<>
        <Title title={home.welcomeTxt} description={home.description} />
        <div className="HomeContainer">
            <div className="HomeEnterCont">
                <InputText
                    placeholder={home.inputPlaceHolder}
                    value={namePlayer}
                    onChange={handleOnChange}
                    onFocus={onHide}
                    required={true}
                    className="InputEnter"
                    autoFocus
                    maxLength={10}
                    data-testid="home-input-enter"
                />
                <Button
                    onClick={() => continueToGame()}
                    className="Button"
                    data-testid="home-btn-enter">
                    <i className="pi pi-arrow-right Button-icon" />
                </Button>
            </div>
            {showDialog &&
                <div className="HomeDialog">
                    <p>{home.dialogText}</p>
                </div>
            }
        </div>
    </>
    );
}

export default Home;