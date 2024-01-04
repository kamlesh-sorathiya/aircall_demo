import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header.jsx';
import Navbar from './components/navBar.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inbox from '../src/pages/inbox.jsx';
import AllCalls from '../src/pages/allCalls.jsx';
import NotFound from '../src/pages/notFound.jsx';


const App = () => {
  return (
    <div className='container m-0 p-0'>
      <Header/>
      <div className='frame-window'>
      <React.Suspense fallback={<p>Loading Suspention</p>}>
      <BrowserRouter>
          <Navbar/>
      <div className='frame-body'>
          <Routes>
            <Route index element={<Inbox />} />
            <Route exact path="/inbox" element={<Inbox />} />
            <Route exact path="/allcalls" element={<AllCalls />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
     </BrowserRouter>
     </React.Suspense>
    </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
