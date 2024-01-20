import React, { useState } from "react";
import "./index.scss"

const ExpandableText = ({ text, maxCaracteres }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const calculateMaxCaracteres = (text, maxCaracteres) => {
    if (text.length <= maxCaracteres) {
      return text;
    } else {
      return text.substring(0, maxCaracteres) + " ..."; 
    }
  };

  const truncatedText = calculateMaxCaracteres(text, maxCaracteres);
  const buttonText = expanded ? "Mostrar menos" : "... ver mais";

  return (
    <div className={`Card-Histories ${expanded ? "full" : ""}`}>
      {expanded ? text : truncatedText}
      {text.length > maxCaracteres && (
        <button className="Card-Histories-Btn" onClick={toggleExpansion}>
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;