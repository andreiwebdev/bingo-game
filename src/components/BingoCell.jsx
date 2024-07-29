// eslint-disable-next-line react/prop-types
export const BingoCell = ({ content, isMarked, isCenter, isWinning, onClick }) => (
  <td
    onClick={onClick}
    className={`text-[9px] sm:text-[16px] p-1 w-16 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 md:p-2 text-center font-primary relative ${
      isCenter ? "font-bold" : isMarked ? "bg-[darkseagreen] text-black" : ""
    } ${isWinning ? "animate-pulse" : ""}`}
  >
    {isCenter ? (
      <div className="border-2 border-[darkseagreen] w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex flex-col items-center justify-center">
        <span className="text-[6px] sm:text-[10px] tracking-widest">
          FREE
        </span>
        <span className="text-lg sm:text-6xl">0</span>
        <span className="text-[6px] sm:text-[10px] tracking-widest">
          FREE
        </span>
      </div>
    ) : (
      content
    )}
  </td>
);