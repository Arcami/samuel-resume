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
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    counterRef.current?.startAnimation?.();
  }, []);

  return (
    <>
      <span
        className={`translated-words ${animationEnded ? "animate-icons" : ""}`}
        style={{ "--speaker-icon": `url('${speakerImg.src}')` }}
      >
        <SlotCounter
          ref={counterRef}
          value={value}
          startValue={animationEnded ? value : startValue}
          autoAnimationStart={false}
          duration={duration}
          className={className}
          animateUnchanged
          startFromLastDigit
          useMonospaceWidth
          direction="bottom-up"
          onAnimationStart={() => setAnimationEnded(false)}
          onAnimationEnd={() => setAnimationEnded(true)}
          {...rest}
        />
        <span>words</span>
      </span>
    </>
  );
}

export default App;
