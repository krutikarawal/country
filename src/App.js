import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './components/Authentication/Login';
import Dashboard from './components/Dashboard';
import CountryCreate from './components/DashboardContent/CountryCreate';
import CountryDetails from './components/DashboardContent/CountryDetails';
import CountryEdit from './components/DashboardContent/CountryEdit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/country/create' element={<CountryCreate />}></Route>
              <Route path='/country/detail/:countryId' element={<CountryDetails />}></Route>
              <Route path='/country/edit/:countryId' element={<CountryEdit />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
