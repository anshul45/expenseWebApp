import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import App from './App.tsx'
import './index.css'
import '@mantine/core/styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './page/Home.tsx'
import NewExpense from './page/NewExpense.tsx'
import ExpenseView from './page/ExpenseView.tsx'
import Profile from './page/Profile.tsx'
import Reward from './page/Reward.tsx'
import { theme } from './theme.ts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/new-expense/:userId", element: <NewExpense /> }, //  userId for adding
      { path: "/edit-expense/:transactionId", element: <NewExpense /> }, // transactionId for editing
      { path: "/expense/:id", element: <ExpenseView /> },
      { path: "/profile", element: <Profile /> },
      { path: "/reward", element: <Reward /> },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MantineProvider 
      theme={theme}
      >
        <RouterProvider router={router} />
      </MantineProvider>
  </StrictMode>
);
