import { useEffect, useRef, useState } from "react";
import SlotCounter from "react-slot-counter";
import speakerImg from "@assets/speaker.png";

function App({
  value = "+1.300.000",
  startValue = "??.???.???",
  duration = 2,
  className = "",
  ...rest
}) {
  const counterRef = useRef(null);

  // State to track when the number scrolling is complete
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    // Start the number animation exactly once, after mount
    counterRef.current?.startAnimation?.();
  }, []);

  return (
    <>
      <span
        // conditionally add the 'animate-icons' class when numbers finish
        className={`translated-words ${animationEnded ? "animate-icons" : ""}`}
        style={{ "--speaker-icon": `url('${speakerImg.src}')` }}
      >
        <SlotCounter
          ref={counterRef}
          value={value}
          // If animation ended, lock value to final. Otherwise use startValue.
          startValue={animationEnded ? value : startValue}
          autoAnimationStart={false}
          duration={duration}
          className={className}
          animateUnchanged
          startFromLastDigit
          useMonospaceWidth
          direction="bottom-up"
          // EVENT HANDLERS
          onAnimationStart={() => setAnimationEnded(false)}
          onAnimationEnd={() => setAnimationEnded(true)}
          {...rest}
        />{" "}
        words
      </span>
    </>
  );
}

export default App;
