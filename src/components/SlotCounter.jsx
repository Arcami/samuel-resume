import { useEffect, useRef, useState } from "react";
import SlotCounter from "react-slot-counter";
import speakerImg from "@assets/speaker.png";

function App({
  value = "+1.300.000",
  startValue = "??.???.???",
  duration = 2, // Duration is in seconds
  className = "",
  ...rest
}) {
  const counterRef = useRef(null);
  const [animationEnded, setAnimationEnded] = useState(false);

  useEffect(() => {
    // 1. Attempt to start the animation normally
    counterRef.current?.startAnimation?.();

    // 2. SAFETY FALLBACK
    // Calculate expected time in ms + a small 500ms buffer.
    // If the library fails to fire onAnimationEnd (e.g. hydration lag,
    // tab backgrounded), this ensures we still show the final number.
    const fallbackDelay = duration * 1000 + 500;

    const safetyTimer = setTimeout(() => {
      // Force the state to true. If it was already set by the event,
      // React ignores this state update (no re-render).
      // If it wasn't, this fixes the "stuck" component.
      setAnimationEnded(true);
    }, fallbackDelay);

    // Cleanup timer if component unmounts
    return () => clearTimeout(safetyTimer);
  }, [duration]);

  return (
    <>
      <span
        className={`translated-words ${animationEnded ? "animate-icons" : ""}`}
        style={{ "--speaker-icon": `url('${speakerImg.src}')` }}
      >
        <SlotCounter
          ref={counterRef}
          value={value}
          // When animationEnded becomes true (via event OR backup timer),
          // we lock the startValue to the final value.
          startValue={animationEnded ? value : startValue}
          autoAnimationStart={false}
          duration={duration}
          className={className}
          animateUnchanged
          startFromLastDigit
          useMonospaceWidth
          direction="bottom-up"
          // Events are still preferred
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
