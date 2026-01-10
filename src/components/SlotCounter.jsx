import { useEffect, useRef, useState } from "react";
import SlotCounter from "react-slot-counter";

/**
 * SlotCounterClient
 *
 * - Shows a placeholder (startValue)
 * - Animates once into the final value
 * - Never resets when scrolled out / back in
 *
 * Key idea:
 * After the animation finishes, we set startValue === value,
 * which prevents SlotCounter from ever snapping back to the placeholder.
 */
function App({
  value = "+1.300.000",
  startValue = "??.???.???",
  duration = 2,
  className = "",
  ...rest
}) {
  // Ref used to imperatively start the animation
  const counterRef = useRef(null);

  // Controls whether the placeholder is still active
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Start the animation exactly once, after mount
    counterRef.current?.startAnimation?.();

    // Once the animation is finished,
    // disable the placeholder permanently
    const timeout = setTimeout(() => {
      setIsAnimating(false);
    }, Math.ceil(duration * 1000) + 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SlotCounter
      ref={counterRef}
      value={value}
      // While animating, use the placeholder.
      // After that, lock startValue to the final value.
      startValue={isAnimating ? startValue : value}
      autoAnimationStart={false}
      duration={duration}
      className={className}
      animateUnchanged
      startFromLastDigit
      direction="bottom-up"
      {...rest}
    />
  );
}

export default App;
