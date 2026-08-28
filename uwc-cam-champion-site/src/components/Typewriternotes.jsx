import { useState, useEffect, useRef } from 'react'

function TypewriterNotes({
    paragraphs,
    typingDuration = 3000,
    pauseDuration = 1200,
    erasingDuration = 1500,
}) {
    const [index, setIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [phase, setPhase] = useState("typing"); // "typing" | "pausing" | "erasing"

    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const currentParagraph = paragraphs[index];
        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);

        if (phase === "typing") {
            const charDelay = typingDuration / currentParagraph.length;
            let charIndex = 0;

            intervalRef.current = setInterval(() => {
                charIndex++;
                setDisplayedText(currentParagraph.slice(0, charIndex));

                if (charIndex >= currentParagraph.length) {
                    clearInterval(intervalRef.current);
                    setPhase("pausing"); // finished typing, hold with blinking cursor
                }
            }, charDelay);
        }

        if (phase === "pausing") {
            timeoutRef.current = setTimeout(() => {
                setPhase("erasing");
            }, pauseDuration);
        }

        if (phase === "erasing") {
            const charDelay = erasingDuration / currentParagraph.length;
            let charIndex = currentParagraph.length;

            intervalRef.current = setInterval(() => {
                charIndex--;
                setDisplayedText(currentParagraph.slice(0, charIndex));

                if (charIndex <= 0) {
                    clearInterval(intervalRef.current);
                    setIndex((prev) => (prev + 1) % paragraphs.length);
                    setPhase("typing"); // move to next paragraph
                }
            }, charDelay);
        }

        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, [phase, index, paragraphs, typingDuration, pauseDuration, erasingDuration]);

    return (
        <p className='text-[#c7c4bd] text-xl font-semibold max-w-sm leading-relaxed min-h-18'>
            {displayedText}
            <span
                className={`inline-block w-0.5 h-4 bg-white/80 ml-0.5 align-middle ${
                    phase === "pausing" ? "animate-pulse" : "opacity-100"
                }`}
            />
        </p>
    );
}

export default TypewriterNotes