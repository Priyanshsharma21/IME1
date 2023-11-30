import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Fitness, Home, Mindset, Expense, LiveHard, Content } from './pages';
import { Books, Journal, Tech } from './pages/mindset/index';
import { Navbar } from './components';

const App = () => {
  return (
    <div className="main w-full flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/mind" element={<Mindset />} />
        <Route path="/mind/books" element={<Books />} />
        <Route path="/mind/journal" element={<Journal />} />
        <Route path="/mind/tech" element={<Tech />} />
        
        <Route path="/body" element={<Fitness />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/content" element={<Content />} />
        <Route path="/livehard" element={<LiveHard />} />
      </Routes>
    </div>
  );
};

export default App;
