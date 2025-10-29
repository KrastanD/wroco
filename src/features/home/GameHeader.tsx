import Button from "@/src/components/Button";
import { css, html } from "react-strict-dom";

interface GameHeaderProps {
  gameState: "waiting" | "inProgress" | "gameOver";
  timeLeft: number;
  selectedColor: string;
  score: number;
  onStartGame: () => void;
}

function GameHeader({
  gameState,
  timeLeft,
  selectedColor,
  score,
  onStartGame,
}: GameHeaderProps) {
  const timeLeftSeconds = Math.ceil(timeLeft / 1000);

  return (
    <html.div style={styles.header}>
      {gameState === "inProgress" && (
        <>
          <html.h1>Time left: {timeLeftSeconds}s</html.h1>
          <html.h1>Don&apos;t click on {selectedColor}!</html.h1>
        </>
      )}
      {gameState === "waiting" && (
        <Button onClick={onStartGame}>
          <html.p>Start Game</html.p>
        </Button>
      )}
      {gameState === "gameOver" && (
        <Button onClick={onStartGame}>
          <html.p>Game Over! Click to Restart</html.p>
        </Button>
      )}
      {gameState !== "waiting" && <html.h2>Score: {score}</html.h2>}
    </html.div>
  );
}

export default GameHeader;

const styles = css.create({
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
  },
});
