import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Fitness, Home, Mindset, Expense, LiveHard} from './pages';

const App = () => {
  return (
    <div className="main w-full flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mind" element={<Mindset />} />
        <Route path="/body" element={<Fitness />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/livehard" element={<LiveHard />} />
      </Routes>
    </div>
  )
}

export default App