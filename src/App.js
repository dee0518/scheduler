import { Routes, Route, Navigate } from 'react-router-dom';
import { Header, Schedule } from './Path'
import { MAIN, MAINSUB } from './navigation/Constant'
import { useParams } from 'react-router';

function App() {
  const params = useParams()
  return (
    <div className="wrapper">
      <Header/>
      {console.log(params)}
      <Routes>
        <Route path={MAIN} element={<Schedule/>}>
            <Route path={MAINSUB} element={<Schedule/>}/>
        </Route>
        <Route path={'/'} element={<Navigate replace to={MAIN}/>}/>
        <Route path={'/deeWork/'} element={<Navigate replace to={MAIN}/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
