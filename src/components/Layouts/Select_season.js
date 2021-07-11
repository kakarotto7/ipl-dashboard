import React from 'react';
import {Select} from 'react-materialize';

const Select_season =(props)=>{
    
        return(            
            <div className="container-fluid">
                <Select onChange={props.onSelectSeason} 
                  id="Select-9" multiple={false}
                  options={{
                    classes: '',
                    dropdownOptions: {
                      alignment: 'left',
                      autoTrigger: true,
                      closeOnClick: true,
                      constrainWidth: true,
                      coverTrigger: true,
                      hover: false,
                      inDuration: 150,
                      onCloseEnd: null,
                      onCloseStart: null,
                      onOpenEnd: null,
                      onOpenStart: null,
                      outDuration: 250
                    }
                  }}
                >
                    <option disabled value="">Choose Season</option>
                    <option value="All Seasons">All Seasons</option>
                    <option value="1">Season 1</option>
                    <option value="2">Season 2</option>
                    <option value="3">Season 3</option>
                    <option value="4">Season 4</option>
                    <option value="5">Season 5</option>
                    <option value="6">Season 6</option>
                    <option value="7">Season 7</option>
                    <option value="8">Season 8</option>
                    <option value="9">Season 9</option>
                </Select>          
            </div>
        );   
}

export default Select_season;