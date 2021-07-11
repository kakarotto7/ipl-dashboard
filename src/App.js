import React from 'react';
import Navbar from './components/Layouts/Navbar';
// import Teams from './components/TableView/Teams';
import PointsTable from './components/PointsTable/PointsTable';
import Teams from './components/SeasonWisePerformance/Teams';
import Batsmen from './components/SeasonWisePerformance/Batsmen';
import Bowlers from './components/SeasonWisePerformance/Bowlers';
import {BrowserRouter, Route, Switch} from 'react-router-dom';


const App = () => {
          
        return (
            <BrowserRouter>            
            <div className="container-fluid">  
            <Navbar/>      
            <Switch>
            <Route path="/" exact component={PointsTable} />
            <Route path="/teams" exact component={Teams} />
            <Route path="/batsmen" exact component={Batsmen} />
            <Route path="/bowlers" exact component={Bowlers} />
            </Switch>
            </div>
            </BrowserRouter>
    );
}

export default App;
