import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  //keep track of the history of the modes, so we can go backwards
  const [history, setHistory] = useState([initial]); 

  function transition(newMode, replace = false) {
    // When transition is called, we need to add the new mode to our history.
    
    setMode(newMode);

    if (replace) { //if replace is false
      setHistory([...history]);
    } else {
      setHistory([...history, newMode])
    }

    // setHistory(prev => [...prev, newMode])
    // setHistory(prev =>
    //   replace ? [...prev.slice(0, prev.length - 1), newMode] : [...prev, newMode]
    // ); 
  }

  function back() {
    // When back is called, we should set the mode to the previous item in our history array.
    
    // if (history.length > 1) {
    //   // lifecycle hasn't caught up yet, so history has changed but mode still thinks
    //   // the item we just sliced is there
    //   setHistory(prev => [...prev.slice(0, prev.length -1)]);
    //   setMode(history[history.length - 2]);
    // }

    // if (history.length < 2) return;
    // setHistory(prev => [...prev.slice(0, history.length - 1)]);

    const tempHistory = [... history];
    tempHistory.pop();
    setHistory(tempHistory);

    if (tempHistory.length > 1) {
      setMode(tempHistory[tempHistory.length -1])
    } else {
      setMode(initial)
    }
    //tempHistory.length > 1 ? setMode(tempHistory[tempHistory.length - 1]) : setMode(initial)}
  }

  return { mode, transition, back };
  // return { mode: history[history.length - 1], transition, back };
}