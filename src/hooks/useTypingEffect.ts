import { useState, useEffect } from 'react';

export function useTypingEffect(
  textLines: string[],
  typingSpeed = 50,
  lineDelay = 800
) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= textLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = textLines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = '';
          }
          newLines[currentLineIndex] += currentLine[currentCharIndex];
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed + (Math.random() * 30 - 15)); // Add slight randomness
      
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay);
      
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, textLines, typingSpeed, lineDelay]);

  return { displayedLines, isComplete };
}
