import React from 'react';
import { Navbar, Icon} from 'react-materialize';
import {Link} from 'react-router-dom';

const Navibar = () => {
     
        return (           
            <div className="container">   
            <Navbar centerChildren
              alignLinks="left" id="mobile-nav"
              menuIcon={<Icon>menu</Icon>}
              options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
              }}
            >
              <Link to='/'>Points Table</Link>  
              <Link to='/teams'>Seasonwise Performance of Teams</Link>
              <Link to='/batsmen'>Top Batsmen</Link>
              <Link to='/bowlers'>Top Bowlers</Link>           
            </Navbar>
            </div>
    );
}

export default Navibar;
