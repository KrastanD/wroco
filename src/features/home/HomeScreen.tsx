import { css, html } from "react-strict-dom";
import Box from "./Box";
import GameHeader from "./GameHeader";
import { useColorGame } from "./useColorGame";

function HomeScreen() {
  const {
    selectedColor,
    gameState,
    timeLeft,
    score,
    shuffledColors,
    handleColorClick,
    handleStartGame,
  } = useColorGame();

  return (
    <>
      <GameHeader
        gameState={gameState}
        timeLeft={timeLeft}
        selectedColor={selectedColor}
        score={score}
        onStartGame={handleStartGame}
      />

      <html.div style={styles.colorContainer}>
        {shuffledColors.map((color) => (
          <Box key={color} color={color} onClick={handleColorClick} />
        ))}
      </html.div>
    </>
  );
}

export default HomeScreen;

const styles = css.create({
  colorContainer: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    height: "75vh",
  },
});
