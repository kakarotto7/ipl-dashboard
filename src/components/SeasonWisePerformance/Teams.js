import React, {useEffect, useState} from 'react';
import {Table, Row, Col, Preloader} from 'react-materialize';
import '../Style.css';
import Match from '../../json_data/Match.json';
import Select_team from "../Layouts/Select_team";
import SplineChart from "../Charts/SplineChart";

const Teams = () => {

    const [matches, setMatches] = useState([]);
    
    const [render, setRander] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState();

    const [selectedTeamWins, setSelectedTeamWins] = useState();
    const [selectedTeamMatches, setSelectedTeamMatches] = useState();
    const [seasonWisePerformances, setSeasonWisePerformances] = useState([]);
    
     
        useEffect(()=> {

                //fetching data
                  
                console.log(Match);

                setMatches(Match);
                setSelectedTeam(1);
                setTimeout(() => { 
                    setRander(true);
                }, 500);              

            },[]
        )

        useEffect(()=> {

           //fetching all matches of selected team
           const selected_team_matches = matches.filter(match => {
              return ((match.Team_Name_Id == parseInt(selectedTeam) || 
              match.Opponent_Team_Id == parseInt(selectedTeam)));
           })
           setSelectedTeamMatches(selected_team_matches.length);


           //fetching all matches in which selected team won
           const selected_team_wins = matches.filter(match => {
              return ((match.Team_Name_Id == parseInt(selectedTeam) || 
              match.Opponent_Team_Id == parseInt(selectedTeam)) && 
              match.Match_Winner_Id === parseInt(selectedTeam));
           })
           setSelectedTeamWins(selected_team_wins.length);

 
           //creating a table of season-wise performances of selected team
           //'performances array'- for performances of selected team in all seasons
           //'performance var'- for performance of selected team in a perticular season
           let performances = [];
           selected_team_matches.forEach(match=> {

                 if(performances.some(performance => (performance.season_id && 
                    (performance.season_id === match.Season_Id)))){
                    performances.map(performance => {
                        if(performance.season_id === match.Season_Id){
                            performance.matches++;
                        }
                        if(performance.season_id === match.Season_Id && 
                            match.Match_Winner_Id === parseInt(selectedTeam)){
                            performance.wins++;
                        }
                    })
                 }else{
                    let win= 0;
                    if(match.Match_Winner_Id === parseInt(selectedTeam)){
                        win= 1;
                    }
                    let obj = {season_id: match.Season_Id, wins: win, matches: 1};
                    performances.push(obj);
                 }  
           })
           console.log(performances);
           setSeasonWisePerformances(performances);

           }, [selectedTeam]

        );


        //on selecting a team
        const onSelectTeam=(event)=> {
            console.log(event.target.value);
            setSelectedTeam(event.target.value);
        }


        //rendering preloader for 0.5 second
        if(render==false){
            return (
            <div className="preloader">
            <Row>
            <Col s={5}></Col>
            <Col s={2}><Preloader active color="blue" flashing /></Col>
            <Col s={5}></Col>
            </Row>
            </div>
            )
        }

                    
        return(  
            <div className="container-fluid text">       
            <Row>
                <Col s={12} m={4} l={4}>
                    <Select_team onSelectTeam={onSelectTeam} />
                    <Table>
                        <thead>
                        <tr>
                        <th>Season</th>
                        <th>Matches</th>
                        <th>Wins</th>
                        <th>% of wins</th>
                        </tr>
                        </thead>         
                        <tbody>  
                        {seasonWisePerformances.map(performance => (      
                            <tr key={performance.season_id}>
                                <td>{performance.season_id}</td>
                                <td>{performance.matches}</td>
                                <td>{performance.wins}</td>
                                <td>{parseFloat(performance.wins/performance.matches*100).toFixed(2)}</td>
                            </tr>
                        ))}     
                        </tbody>
                        <thead>
                        <tr>
                        <th>Overall</th>
                        <th>{selectedTeamMatches}</th>
                        <th>{selectedTeamWins}</th>
                        <th>{parseFloat(selectedTeamWins/selectedTeamMatches*100).toFixed(2)}</th>
                        </tr>
                        </thead> 
                    </Table>   
                </Col>
                <Col s={12} m={8} l={8}>
                    <div className="splinechart">
                    <SplineChart seasonWisePerformances={seasonWisePerformances} />
                    </div>
                </Col>
            </Row>    
            </div>
        );

}

export default Teams;
