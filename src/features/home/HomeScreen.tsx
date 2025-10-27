import Button from "@/src/components/Button";
import { useEffect, useState } from "react";
import { css, html } from "react-strict-dom";
import Box from "./Box";

const colors = ["red", "green", "blue", "yellow"];
const TIME_TO_REACT = 1000;

function HomeScreen() {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [gameState, setGameState] = useState<
    "waiting" | "inProgress" | "gameOver"
  >("waiting");
  const [timeLeft, setTimeLeft] = useState<number>(TIME_TO_REACT);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (gameState === "inProgress" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 100);
      }, 100);

      return () => clearTimeout(timer);
    }
    if (gameState === "inProgress" && timeLeft <= 0) {
      setGameState("gameOver");
    }
  }, [gameState, timeLeft]);

  const handleColorClick = (color: string) => {
    if (color === selectedColor) {
      setGameState("gameOver");
      return;
    }
    setScore((prev) => prev + 1);
    if (gameState !== "inProgress") return;
    handleResetRound();
  };

  const handleResetRound = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    setSelectedColor(newColor);
    setTimeLeft(TIME_TO_REACT);
    setGameState("inProgress");
  };

  const handleStartGame = () => {
    setScore(0);
    handleResetRound();
  };

  return (
    <>
      <html.div style={style.header}>
        {gameState === "inProgress" && (
          <>
            <html.h1>Time left: {timeLeft / 1000}s</html.h1>
            <html.h1>Don&apos;t click on {selectedColor}!</html.h1>
          </>
        )}
        {gameState === "waiting" && (
          <Button onClick={handleStartGame}>
            <html.p>Start Game</html.p>
          </Button>
        )}
        {gameState === "gameOver" && (
          <Button onClick={handleStartGame}>
            <html.p>Game Over! Click to Restart</html.p>
          </Button>
        )}
        {gameState !== "waiting" && <html.h2>Score: {score}</html.h2>}
      </html.div>

      <html.div style={style.colorContainer}>
        {colors.map((color) => (
          <Box key={color} color={color} onClick={handleColorClick} />
        ))}
      </html.div>
    </>
  );
}

export default HomeScreen;

const style = css.create({
  colorContainer: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    flexDirection: "row",
    width: "100%",
    height: "75vh",
  },
  box: (color: string) => ({
    display: "flex",
    flex: 1,
    flexBasis: "50%",
    backgroundColor: color,
    height: "50%",
  }),
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
  },
});
