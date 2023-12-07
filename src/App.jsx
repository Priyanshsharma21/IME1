import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Fitness, Home, Mindset, Expense, LiveHard, Content } from './pages';
import { BookDetails, Books, Journal, JournalDetails, Tech, TechDetails } from './pages/mindset/index';
import { Navbar } from './components';
import { Meditation, Nutrition, Workout,CardioDetails, GymDetails } from './pages/fitness/index.js';
import { Savings, DailyExpense, Investments } from './pages/expense/index.js';
import {Editing, Marketing, Script} from './pages/content/index.js';
import { Phase1, Phase2, SFHard } from './pages/livehard/index.js';

const App = () => {
  return (
    <div className="main w-full flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/mind" element={<Mindset />} />
        <Route path="/mind/books" element={<Books />} />
        <Route path="/mind/books/:id" element={<BookDetails />} />
        <Route path="/mind/journal" element={<Journal />} />
        <Route path="/mind/journal/:id" element={<JournalDetails />} />
        <Route path="/mind/tech" element={<Tech />} />
        <Route path="/mind/tech/:id" element={<TechDetails />} />
        
        <Route path="/body" element={<Fitness />} />
        <Route path="/body/workout" element={<Workout />} />
        <Route path="/body/workout/cardio/:id" element={<CardioDetails />} />
        <Route path="/body/workout/gym/:id" element={<GymDetails />} />
        
        
        <Route path="/body/nutrition" element={<Nutrition />} />
        <Route path="/body/meditation" element={<Meditation />} />

        <Route path="/expense" element={<Expense />} />
        <Route path="/expense/saving" element={<Savings />} />
        <Route path="/expense/dailyexpense" element={<DailyExpense />} />
        <Route path="/expense/investment" element={<Investments />} />

        <Route path="/content" element={<Content />} />
        <Route path="/content/editing" element={<Editing />} />
        <Route path="/content/marketing" element={<Marketing />} />
        <Route path="/content/script" element={<Script />} />

        <Route path="/livehard" element={<LiveHard />} />
        <Route path="/livehard/75-hard" element={<SFHard />} />
        <Route path="/livehard/phase1" element={<Phase1 />} />
        <Route path="/livehard/phase2" element={<Phase2 />} />
      </Routes>
    </div>
  );
};

export default App;
