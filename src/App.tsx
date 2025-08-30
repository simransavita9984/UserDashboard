import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Header from './components/Header';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route path="/create" element={<CreateUser />} />
              <Route path="/edit/:id" element={<EditUser />} />
            </Routes>
          </main>
        </div>
      </Router>
    </RecoilRoot>
  );
};

export default App;