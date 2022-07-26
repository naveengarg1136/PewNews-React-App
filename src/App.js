
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import React , { useState } from "react";
import {
  BrowserRouter as Router,
  Route,Routes} from "react-router-dom";
  import LoadingBar from 'react-top-loading-bar'

function App() {
  const [progress, setProgress] = useState(0)

  const progressSetter=(x)=>{
    setProgress(x);
  }

  return (
    <div>
    <Router>
    <Navbar/>
    <LoadingBar
        color='#f11946'
        progress={progress}
        //onLoaderFinished={() => setProgress(0)}
      />

    <Routes>
        <Route exact path="/" element={<News setProgress={progressSetter}  key="a" pageSize={8} country="in" category=""/>}/>
        <Route exact path="/business" element={<News setProgress={progressSetter}  key="business" pageSize={8} country="in" category="business"/>}/>
        <Route exact path="/entertainment" element={<News setProgress={progressSetter}  key="entertainment" pageSize={8} country="in" category="entertainment"/>}/>
        <Route exact path="/general" element={<News setProgress={progressSetter}  key="general" pageSize={8} country="in" category="general"/>}/>
        <Route exact path="/health" element={<News setProgress={progressSetter}  key="health" pageSize={8} country="in" category="health"/>}/>
        <Route exact path="/science" element={<News setProgress={progressSetter}  key="science" pageSize={8} country="in" category="science"/>}/>
        <Route exact path="/sports" element={<News setProgress={progressSetter}   key="sports" pageSize={8} country="in" category="sports"/>}/>
        <Route exact path="/technology" element={<News setProgress={progressSetter}  key="technology" pageSize={8} country="in" category="technology"/>}/>
    </Routes>

    </Router>
    </div>
  );
}

export default App;
