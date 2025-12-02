import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/backButton.css";

function BackButtonPTBR() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="backButton">
            <div className="back-button-container">
                <button className="back-button" onClick={handleBack} title="Voltar">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <span>Voltar</span>
                </button>
            </div>
        </div>
    );
}

export default BackButtonPTBR;
