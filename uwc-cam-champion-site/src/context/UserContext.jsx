import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

// Sample data moved outside the component so it doesn't re-instantiate on every render
const TasksSampleData = [
  {
    id: 1,
    type: 'Quiz',
    title: 'Database Fundamentals Quiz 3',
    moduleCode: 'DBS402',
    moduleName: 'Database Systems',
    dueDate: 'May 29, 2026',
    status: 'Past Due',
    description: 'MCQ on normalization and relational algebra.',
    weight: '10%',
    categoryWeight: '25%',
  },
  {
    id: 2,
    type: 'Assignment',
    title: 'Web Design Project - Milestone 2',
    moduleCode: 'WPR201',
    moduleName: 'Web Programming',
    dueDate: 'June 15, 2026',
    status: 'Due in 6 days',
    description: 'Functional prototype using React.',
    weight: '15%',
    categoryWeight: '35%',
  },
  {
    id: 3,
    type: 'Practical',
    title: 'Java Lab Exam 1 (Practical Test)',
    moduleCode: 'COS311',
    moduleName: 'Object-Oriented Prog',
    dueDate: 'June 18, 2026',
    status: 'Due in 9 days',
    description: 'Data structures implementation under time constraints.',
    weight: '20%',
    categoryWeight: '25%',
  },
  {
    id: 4,
    type: 'Test',
    title: 'Linear Algebra Midterm Exam',
    moduleCode: 'STA331',
    moduleName: 'Statistical Analysis',
    dueDate: 'July 2, 2026',
    status: 'Upcoming',
    description: 'Full midterm coverage of matrices and linear systems.',
    weight: '30%',
    categoryWeight: '40%',
  }
];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Data
  const [modules, setModules] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [deadlines, setDeadlines] = useState(null);
  const [cam, setCam] = useState(0);
  
  // Initialized directly with sample data
  const [tasks, setTasks] = useState(TasksSampleData);

  // Auth logic
  const login = async ({ username, password }) => {
    try {} catch (error) {} finally {}
  };

  const signUp = async ({ firstname, surname, email, password }) => {
    try {} catch (error) {} finally {}
  };

  const forgotPassword = async ({ email }) => {
    try {} catch (error) {} finally {}
  };

  const handleContinueWithoutLogin = () => {
    setUser({
      username: "Guest",
      isGuest: true
    });
  };
  
  let isLoggedIn = Boolean(user);

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoggedIn, 
      loading, 
      login, 
      signUp, 
      forgotPassword, 
      handleContinueWithoutLogin, 
      modules, 
      setModules, 
      deadlines, 
      setDeadlines, 
      cam, 
      setCam, 
      tasks, 
      setTasks 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}