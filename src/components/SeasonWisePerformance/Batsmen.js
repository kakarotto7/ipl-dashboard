import React, {useEffect, useState} from 'react';
import {Table, Row, Col, CardPanel, Preloader} from 'react-materialize';
import '../Style.css';
import Match from '../../json_data/Match.json';
import Player from '../../json_data/Player.json';
import Ball_by_Ball from '../../json_data/Ball_by_Ball.json';
import Select_season from "../Layouts/Select_season";


const Batsmen = () => {

    const [balls, setBalls] = useState([]);
    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);
    
    const [render, setRander] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState();

    const [maxRuns, setMaxRuns] = useState([]);
    const [maxFours, setMaxFours] = useState([]);
    const [maxSixes, setMaxSixes] = useState([]);
    const [batsmenDetails, setBatsmenDetails] = useState([]);
    

        useEffect(()=> {

                //fetching data
                 
                console.log(Match);
                console.log(Player);
                console.log(Ball_by_Ball);

                setMatches(Match);
                setPlayers(Player);
                setBalls(Ball_by_Ball);

                setSelectedSeason("All Seasons");
                setTimeout(() => { 
                    setRander(true);
                }, 500);

            },[]
        )

        useEffect(()=> {

                //fetching all balls of selected season
                let selected_season_balls = [];          
                if(selectedSeason === "All Seasons"){
                    selected_season_balls = balls;
                }else{
                    balls.forEach(ball => {
                        matches.forEach(match => {
                            if(parseInt(ball.Match_Id) === match.Match_Id && 
                            match.Season_Id === parseInt(selectedSeason)){
                                selected_season_balls.push(ball);
                            }
                        })
                    })
                }


                //creating a table of all batsmen with runs, balls and more
                let batsmen = [];
                selected_season_balls.forEach(ball => {  
                    if(batsmen.some(batsman => (batsman.batsman_id && 
                        (batsman.batsman_id === parseInt(ball.Striker_Id))))){

                        batsmen.map(batsman => {
                            if((batsman.batsman_id === parseInt(ball.Striker_Id))){

                                if(Number.isInteger(parseInt(ball.Batsman_Scored))){
                                    batsman.runs = batsman.runs + parseInt(ball.Batsman_Scored);
                                    if(parseInt(ball.Batsman_Scored) === 4){
                                        batsman.fours++;
                                    }else if(parseInt(ball.Batsman_Scored) === 6){
                                        batsman.sixes++;
                                    }
                                }
                                if(ball.Extra_Type === "" || ball.Extra_Type === "byes" ||  
                                ball.Extra_Type === "legbyes" || ball.Extra_Type === "noballs" || 
                                ball.Extra_Type === "penalty"){
                                    batsman.balls++;
                                }
                                if(batsman.lastMatchId !== parseInt(ball.Match_Id)){
                                    batsman.matches++;
                                    batsman.lastMatchId = parseInt(ball.Match_Id);
                                }
                            }
                        })
                    }else{   
                        let four= 0, six= 0, ball_= 0, run= 0, name;
                        if(Number.isInteger(parseInt(ball.Batsman_Scored))){
                            run = parseInt(ball.Batsman_Scored);
                            if(parseInt(ball.Batsman_Scored) === 4){
                                four=1;
                            }else if(parseInt(ball.Batsman_Scored) === 6){
                                six=1;
                            }
                        }
                        if(ball.Extra_Type === "" || ball.Extra_Type === "byes" || 
                        ball.Extra_Type === "legbyes" || ball.Extra_Type === "noballs" || 
                        ball.Extra_Type === "penalty"){
                            ball_= 1;
                        }
                        players.forEach(player => {
                            if(player.Player_Id === parseInt(ball.Striker_Id)){
                               name = player.Player_Name
                            }
                        })
                        let obj = {
                            batsman_id : parseInt(ball.Striker_Id), 
                            batsman_name : name,
                            balls : ball_, 
                            runs : run, 
                            fours : four, 
                            sixes : six, 
                            matches : 1, 
                            lastMatchId : parseInt(ball.Match_Id)
                        };
                        batsmen.push(obj);
                    }

                })


                //setting batsmen details, most runs, most fours & most sixes of the selected season      
                batsmen.sort((a,b) => b.runs - a.runs);
                console.log(batsmen);
                if(batsmen && batsmen[0]){
                    console.log("max runs : "+batsmen[0].runs);
                    setMaxRuns([batsmen[0].runs, batsmen[0].batsman_name]);
                }
    
                batsmen.sort((a,b) => b.fours - a.fours);
                if(batsmen && batsmen[0]){
                    console.log("max fours : "+batsmen[0].fours);
                    setMaxFours([batsmen[0].fours, batsmen[0].batsman_name]);
                }

                batsmen.sort((a,b) => b.sixes - a.sixes);
                if(batsmen && batsmen[0]){
                    console.log("max sixes : "+batsmen[0].sixes);
                    setMaxSixes([batsmen[0].sixes, batsmen[0].batsman_name]);
                }
                batsmen = batsmen.sort((a,b) => b.runs - a.runs).slice(0,10);
                setBatsmenDetails(batsmen);
  
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
                <Col s={12} m={12} l={12}>
                    <Select_season onSelectSeason={onSelectSeason} />
                    <br></br><br></br>
                    <CardPanel className="white panel">
                    <div className="para">
                    <p><span className="heading">Maximum number of runs scored : </span>
                    {maxRuns[0]} ( by {maxRuns[1]} )</p>
                    <p><span className="heading">Maximum number of fours scored : </span>
                    {maxFours[0]} ( by {maxFours[1]} )</p>
                    <p><span className="heading">Maximum number of sixes scored : </span>
                    {maxSixes[0]} ( by {maxSixes[1]} )</p>
                    </div>
                    </CardPanel>
                    <Table>
                        <thead>
                        <tr>
                        <th>Batsmen</th>
                        <th>Matches</th>
                        <th>Balls</th>
                        <th>Runs</th>
                        <th>4s</th>
                        <th>6s</th>
                        <th>Avg</th>
                        <th>SR</th>
                        </tr>
                        </thead>         
                        <tbody>  
                        {batsmenDetails.map(batsman => (      
                            <tr key={batsman.batsman_id}>
                                <td>{batsman.batsman_name}</td>
                                <td>{batsman.matches}</td>
                                <td>{batsman.balls}</td>
                                <td>{batsman.runs}</td>
                                <td>{batsman.fours}</td>
                                <td>{batsman.sixes}</td>
                                <td>{parseFloat(batsman.runs/batsman.matches).toFixed(2)}</td>
                                <td>{parseFloat(batsman.runs/batsman.balls*100).toFixed(2)}</td>
                            </tr>
                        ))}          
                        </tbody>
                    </Table>   
                </Col>
            </Row>    
            </div>
        );
       
}

export default Batsmen;
