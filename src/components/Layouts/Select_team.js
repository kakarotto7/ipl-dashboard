import React from 'react';
import {Select} from 'react-materialize';

const Select_team =(props)=>{
    
        return(            
            <div className="container-fluid">
                <Select onChange={props.onSelectTeam}
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
                    <option disabled value="">Choose Team</option>
                    <option value="1">Kolkata Knight Riders</option>
                    <option value="2">Royal Challengers Bangalore</option>
                    <option value="3">Chennai Super Kings</option>
                    <option value="4">Kings XI Punjab</option>
                    <option value="5">Rajasthan Royals</option>
                    <option value="6">Delhi Daredevils</option>
                    <option value="7">Mumbai Indians</option>
                    <option value="8">Deccan Chargers</option>
                    <option value="9">Kochi Tuskers Kerala</option>
                    <option value="10">Pune Warriors</option>
                    <option value="11">Sunrisers Hyderabad</option>
                    <option value="12">Rising Pune Supergiants</option>
                    <option value="13">Gujarat Lions</option>
                </Select>          
            </div>
        );   
}

export default Select_team;