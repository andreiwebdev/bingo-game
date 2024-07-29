import { BOARD_SIZE, CENTER_INDEX, PHRASES } from "../constants";
import { useBingoBoard } from "../hooks";
import { BingoCell } from "./BingoCell";

export const BingoBoard = () => {
  const { marked, winCells, showOverlay, handleCellClick, shuffledPhrases } = useBingoBoard(BOARD_SIZE, PHRASES);

  return (
    <div className="flex flex-col justify-center items-center h-screen relative">
      {showOverlay && (
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <h1 className="font-primary mb-10 text-white text-4xl md:text-6xl uppercase">
            Bingo! You Win!
          </h1>
        </div>
      )}
      <h1 className="font-primary mb-10 text-[60px] md:text-[120px]">BINGO</h1>
      <table className="max-w-2xl">
        <tbody>
          {Array.from({ length: BOARD_SIZE }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: BOARD_SIZE }).map((_, colIndex) => (
                <BingoCell
                  key={`${rowIndex}-${colIndex}`}
                  content={shuffledPhrases[rowIndex * BOARD_SIZE + colIndex]}
                  isMarked={marked[rowIndex][colIndex]}
                  isCenter={rowIndex === CENTER_INDEX && colIndex === CENTER_INDEX}
                  isWinning={winCells.some(
                    (cell) => cell.rowIndex === rowIndex && cell.colIndex === colIndex
                  )}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
