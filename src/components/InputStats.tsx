type InputStatsProps = {
  charsCount: number;
  linesCount: number;
};

function InputStats({ charsCount, linesCount }: InputStatsProps) {
  return (
    <div className="absolute bottom-1 right-1 text-xs text-zinc-400">
      chars: {charsCount}, lines: {linesCount}
    </div>
  );
}

export default InputStats;
