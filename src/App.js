import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Routes/Routes/Routes';

function App() {
  return (
    <div data-theme='light'>
      <RouterProvider router={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
