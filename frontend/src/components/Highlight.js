import React from "react";

const Highlighted = ({ text = "", highlight = "" }) => {
    if (highlight === "") {
        return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
        <span>
            {parts.filter(String).map((part, i) => {
                return regex.test(part) ? (
                    <mark style={{ backgroundColor: "#FEE715CF", color: "black" }} key={i}>{part}</mark>
                ) : (
                    <span key={i}>{part}</span>
                );
            })}
        </span>
    );
};

export default Highlighted