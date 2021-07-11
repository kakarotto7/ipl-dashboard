import React, {useEffect, useState} from 'react';
import {Table, Row, Col, CardPanel, Preloader} from 'react-materialize';
import '../Style.css';
import Match from '../../json_data/Match.json';
import Player from '../../json_data/Player.json';
import Season from '../../json_data/Season.json';
import Team from '../../json_data/Team.json';
import Select_season from "../Layouts/Select_season";
import DonutChart from "../Charts/DonutChart";


const PointsTable = () => {

    const [table, setTable] = useState([]);

    const [teams, setTeams] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);

    const [render, setRander] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState();

    const [orangeCap, setOrangeCap] = useState();
    const [purpleCap, setPurpleCap] = useState();
    const [manOfSeries, setManOfSeries] = useState();
    const [totalMatches, setTotalMatches] = useState();
    const [totalTeamsParticipated, setTotalTeamsParticipated] = useState();

       
        useEffect(()=> {

                //fetching data
                 
                console.log(Team);
                console.log(Match);
                console.log(Season);
                console.log(Player);

                setTeams(Team);
                setMatches(Match);
                setSeasons(Season);
                setPlayers(Player);

                setSelectedSeason("All Seasons");
                setTimeout(() => { 
                    setRander(true);
                }, 500);

            },[]
        )

        useEffect(()=> {

                //fetching matches of selected season
                let selected_season_matches; 
                if(selectedSeason === "All Seasons"){
                    selected_season_matches = matches;
                }else{
                    selected_season_matches = matches.filter(match => {
                        return (match.Season_Id == parseInt(selectedSeason));
                    })
                }

                //total number of matches played in selected season
                console.log("total matches played : " + selected_season_matches.length);
                setTotalMatches(selected_season_matches.length);


                //fetching year, orange cap, purple cap & man of series of selected season
                if(selectedSeason !== "All Seasons"){
                    seasons.forEach(season => {

                        if(season.Season_Id === parseInt(selectedSeason)){
                           console.log("year : " + season.Season_Year);
                           players.forEach(player => {

                            if(player.Player_Id === season.Orange_Cap_Id){
                                console.log("Orange cap : " + player.Player_Name );
                                setOrangeCap(player.Player_Name);
                            }
                            if(player.Player_Id === season.Purple_Cap_Id){
                                console.log("Purple cap : " + player.Player_Name );
                                setPurpleCap(player.Player_Name);
                            }
                            if(player.Player_Id === season.Man_of_the_Series_Id){
                                console.log("Man of the Series : " + player.Player_Name );
                                setManOfSeries(player.Player_Name);
                            }                  
                           })
                        }
                    })
                }else{
                    setOrangeCap("Not applicable");
                    setPurpleCap("Not applicable");
                    setManOfSeries("Not applicable");
                }


                //generating points table of all teams
                let table = [];
                selected_season_matches.forEach(match=> {

                    //code for 'Team_Name_Id'
                    if(table.some(team => (team.team_id && (match.Team_Name_Id === team.team_id)))){
                        table.forEach(team => {
                            if(team.team_id === match.Team_Name_Id){
                                team.matches++;
                                if(match.Team_Name_Id === match.Match_Winner_Id){
                                    team.wins++;
                                    team.points = team.points+2;
                                }else{
                                    team.losses++;
                                }
                            }              
                        })
                    }else{
                        let obj, name;
                        teams.forEach(team => {
                            if(team.Team_Id === match.Team_Name_Id){
                                name = team.Team_Name;
                            }
                        })
                        if(match.Match_Winner_Id === match.Team_Name_Id ){
                            obj = {
                                team_id: match.Team_Name_Id, 
                                team_name: name, 
                                matches: 1, 
                                wins: 1, 
                                losses: 0, 
                                points: 2
                            };
                        } else{
                            obj = {
                                team_id: match.Team_Name_Id, 
                                team_name: name, 
                                matches: 1, 
                                wins: 0, 
                                losses: 1, 
                                points: 0
                            };
                        }
                        table.push(obj);
                    }


                    //code for 'Opponent_Team_Id'
                    if(table.some(team => (team.team_id && (match.Opponent_Team_Id === team.team_id)))){
                        table.forEach(team => {
                            if(team.team_id === match.Opponent_Team_Id){
                                team.matches++;
                                if(match.Opponent_Team_Id === match.Match_Winner_Id){
                                    team.wins++;
                                    team.points = team.points+2;
                                }else{
                                    team.losses++;
                                }
                            }           
                        })
                    }else{
                        let obj, name;
                        teams.forEach(team => {
                            if(team.Team_Id === match.Opponent_Team_Id){
                                name = team.Team_Name;
                            }
                        })
                        if(match.Match_Winner_Id === match.Opponent_Team_Id){
                            obj = {
                                team_id: match.Opponent_Team_Id, 
                                team_name: name, 
                                matches: 1, 
                                wins: 1, 
                                losses: 0, 
                                points: 2};
                        } else{
                            obj = {
                                team_id: match.Opponent_Team_Id, 
                                team_name: name, 
                                matches: 1, 
                                wins: 0, 
                                losses: 1, 
                                points: 0
                            };
                        }
                        table.push(obj);
                    }
                })
   
                console.log(table);
                console.log("total teams participated : " + table.length);
                setTotalTeamsParticipated(table.length);
                table.sort((a,b) => b.wins - a.wins);
                setTable(table);

            },[selectedSeason]
        );


        //on selecting a season
        const onSelectSeason=(event)=> {
            console.log(event.target.value);
            setSelectedSeason(event.target.value);
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
            <div className="container text">
            <Row>
                <Col s={12} m={7} l={7}>
                    <Select_season onSelectSeason={onSelectSeason} />
                    <br></br><br></br>
                    <CardPanel className="white panel">
                    <div className="para">
                    <p><span className="heading">Orange cap : </span> {orangeCap}</p>
                    <p><span className="heading">Purple cap : </span> {purpleCap}</p>
                    <p><span className="heading">Man of series : </span> {manOfSeries}</p>
                    <p><span className="heading">Total matches played : </span> {totalMatches}</p>
                    <p><span className="heading">Total teams participated : </span>{totalTeamsParticipated}</p>
                    </div>
                    </CardPanel>
                    <Table>
                        <thead>
                        <tr>
                        <th>Team</th>
                        <th>Matches</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Points</th>
                        </tr>
                        </thead>         
                        <tbody> 
                        {table.map(team => (      
                            <tr key={team.team_id}>
                                <td>{team.team_name}</td>
                                <td>{team.matches}</td>
                                <td>{team.wins}</td>
                                <td>{team.losses}</td>
                                <td>{team.points}</td>
                            </tr>
                        ))}                
                        </tbody>
                    </Table>   
                </Col>
                <Col s={12} m={5} l={5}>  
                <div className="donutchart">
                <DonutChart table= {table} />
                </div> 
                </Col>
            </Row>
            </div>
        );
       
}

export default PointsTable;
