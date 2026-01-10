import SlotCounter from "react-slot-counter";

function App() {
  return (
    <>
      <SlotCounter
        value="+1.300.000"
        startValue="??.???.???"
        startValueOnce
        duration={2}
        animateUnchanged
        startFromLastDigit
        direction="bottom-up"
        animateOnVisible={{ triggerOnce: true }}
      />
    </>
  );
}

export default App;
