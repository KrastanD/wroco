import { useEffect, useState } from "react";
import { GAME_CONFIG } from "./utils/config";
import { getRandomColor } from "./utils/helpers";

export function useColorGame() {
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [gameState, setGameState] = useState<
    "waiting" | "inProgress" | "gameOver"
  >("waiting");
  const [timeLeft, setTimeLeft] = useState<number>(GAME_CONFIG.timeToReact);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    if (gameState === "inProgress" && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - GAME_CONFIG.tickInterval);
      }, GAME_CONFIG.tickInterval);

      return () => clearTimeout(timer);
    }
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (gameState === "inProgress" && timeLeft <= 0) {
      setGameState("gameOver");
    }
  }, [gameState, timeLeft]);

  const handleResetRound = () => {
    const newColor = getRandomColor(GAME_CONFIG.colors);
    setSelectedColor(newColor);
    setTimeLeft(GAME_CONFIG.timeToReact);
    setGameState("inProgress");
  };

  const handleColorClick = (color: string) => {
    if (color === selectedColor) {
      setGameState("gameOver");
      return;
    }
    setScore((prev) => prev + 1);
    if (gameState !== "inProgress") return;
    handleResetRound();
  };

  const handleStartGame = () => {
    setScore(0);
    handleResetRound();
  };

  return {
    selectedColor,
    gameState,
    timeLeft,
    score,
    handleColorClick,
    handleStartGame,
  };
}
