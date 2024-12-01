import React, { useState } from "react";
import * as styles from "./header.css";

const Header: React.FC<{ onToggleActivityLog: () => void }> = ({
  onToggleActivityLog,
}) => {
  const [buttonToggle, setButtonToggle] = useState(false);
  const toggleVisibility = () => {
    setButtonToggle(!buttonToggle);
    onToggleActivityLog();
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>Trello clone</h1>
      <button className={styles.toggleButton} onClick={toggleVisibility}>
        {buttonToggle ? "×" : "☰"}
      </button>
    </header>
  );
};

export default Header;
