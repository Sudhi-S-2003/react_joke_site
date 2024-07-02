import React, { useState } from "react";
import axios from "axios";
import man1 from "./assets/man1.png";
import man2 from "./assets/man2.png";
import "./man.css";

const Man = () => {
  const [dialogues, setDialogues] = useState({
    amal: "Amal: Yes, sure.",
    appu: "Appu: Can you tell a joke?",
    punchline: "",
  });
  const [stage, setStage] = useState(1);
  const [first, setFirst] = useState("Appu");

  const getQuote = () => {
    axios
      .get("https://official-joke-api.appspot.com/random_joke")
      .then((res) => {
        setDialogues({
          amal: "Amal: " + res.data.setup,
          appu: "Appu: What?",
          punchline: res.data.punchline,
        });
        setFirst("Amal");
        setStage(2);
      })
      .catch((err) => {
        console.error("Error fetching joke:", err);
      });
  };

  const handlePunchline = () => {
    setDialogues((prevDialogues) => ({
      ...prevDialogues,
      amal: "Amal: " + prevDialogues.punchline,
      appu: "Appu: Haha, good one!",
    }));
    setStage(3);
  };

  const restart = () => {
    setDialogues({
      amal: "Amal: Yes, sure.",
      appu: "Appu: Can you tell a joke?",
      punchline: "",
    });
    setFirst("Appu");
    setStage(1);
  };

  const renderDialogue = (firstSpeaker, dialogue) => (
    <>
      {firstSpeaker === "Appu" ? (
        <>
          <img src={man1} alt="man" className="man-img" />
          <div className="man-text"><p>{dialogue.appu}</p></div>
        </>
      ) : (
        <>
          <div className="man-text ri"><p>{dialogue.amal}</p></div>
          <img src={man2} alt="man" className="man-img" />
        </>
      )}
    </>
  );

  return (
    <div>
      <h1>Joke</h1>
      <div className="main">
        <div className="man-container">
          {renderDialogue(first, dialogues)}
        </div>
        <div className="man-container">
          {renderDialogue(first === "Appu" ? "Amal" : "Appu", dialogues)}
        </div>
      </div>
      <div className="button-container">
        {stage === 1 && <button onClick={getQuote}>Next</button>}
        {stage === 2 && <button onClick={handlePunchline}>Next</button>}
        {stage === 3 && <button onClick={restart}>Restart</button>}
      </div>
    </div>
  );
};

export default Man;
