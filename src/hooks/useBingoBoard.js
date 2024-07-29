import { useCallback, useEffect, useState } from "react";
import { CENTER_INDEX, RESET_TIMEOUT } from "../constants";

export const useBingoBoard = (boardSize, phrases) => {
  const [marked, setMarked] = useState(
    Array(boardSize)
      .fill()
      .map(() => Array(boardSize).fill(false))
  );
  const [winCells, setWinCells] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [audio] = useState(new Audio("/victory.mp3"));
  const [shuffledPhrases, setShuffledPhrases] = useState([]);

  const shufflePhrases = useCallback(() => {
    setShuffledPhrases([...phrases].sort(() => 0.5 - Math.random()));
  }, [phrases]);

  useEffect(() => {
    if (showOverlay) {
      audio.play();
    }
  }, [showOverlay, audio]);

  useEffect(() => {
    shufflePhrases();
  }, [shufflePhrases]);

  const resetBoard = useCallback(() => {
    setMarked(
      Array(boardSize)
        .fill()
        .map(() => Array(boardSize).fill(false))
    );
    setWinCells([]);
    shufflePhrases();
  }, [boardSize, shufflePhrases]);

  const triggerWin = useCallback(
    (winningCells) => {
      setWinCells(winningCells);
      setShowOverlay(true);

      setTimeout(() => {
        setShowOverlay(false);
        resetBoard();
      }, RESET_TIMEOUT);
    },
    [resetBoard]
  );

  const checkForWin = useCallback(
    (marked) => {
      const isWinning = (array) => array.every(Boolean);

      for (let rowIndex = 0; rowIndex < boardSize; rowIndex++) {
        if (isWinning(marked[rowIndex])) {
          triggerWin(
            marked[rowIndex].map((_, colIndex) => ({ rowIndex, colIndex }))
          );
          return;
        }
      }

      for (let colIndex = 0; colIndex < boardSize; colIndex++) {
        const column = marked.map((row) => row[colIndex]);
        if (isWinning(column)) {
          triggerWin(column.map((_, rowIndex) => ({ rowIndex, colIndex })));
          return;
        }
      }

      const leftDiagonal = marked.map((row, idx) =>
        idx === CENTER_INDEX ? true : row[idx]
      );
      const rightDiagonal = marked.map((row, idx) =>
        idx === CENTER_INDEX ? true : row[boardSize - 1 - idx]
      );

      if (isWinning(leftDiagonal)) {
        triggerWin(
          leftDiagonal.map((_, idx) => ({ rowIndex: idx, colIndex: idx }))
        );
      }

      if (isWinning(rightDiagonal)) {
        triggerWin(
          rightDiagonal.map((_, idx) => ({
            rowIndex: idx,
            colIndex: boardSize - 1 - idx,
          }))
        );
      }
    },
    [boardSize, triggerWin]
  );

  const handleCellClick = useCallback(
    (rowIndex, colIndex) => {
      if (rowIndex === CENTER_INDEX && colIndex === CENTER_INDEX) return;

      const newMarked = marked.map((row, rIdx) =>
        row.map((cell, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? !cell : cell
        )
      );

      setMarked(newMarked);
      checkForWin(newMarked);
    },
    [marked, checkForWin]
  );

  return { marked, winCells, showOverlay, handleCellClick, shuffledPhrases };
};
