import React, {useEffect, useState} from 'react';
import {Table, Row, Col, CardPanel, Preloader} from 'react-materialize';
import '../Style.css';
import Match from '../../json_data/Match.json';
import Player from '../../json_data/Player.json';
import Ball_by_Ball from '../../json_data/Ball_by_Ball.json';
import Select_season from "../Layouts/Select_season";


const Bowlers = () => {

    const [balls, setBalls] = useState([]);
    const [matches, setMatches] = useState([]);
    const [players, setPlayers] = useState([]);

    const [render, setRander] = useState(false);
    const [selectedSeason, setSelectedSeason] = useState();

    const [maxWickets, setMaxWickets] = useState([]);
    const [bowlersDetails, setBowlersDetails] = useState([]);
    
       
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

                //creating a table of all bowlers with runs, balls and more
                let bowlers =[];
                selected_season_balls.forEach(ball => {
                    if(bowlers.some(bowler => (bowler.bowler_id && 
                        (bowler.bowler_id === parseInt(ball.Bowler_Id))))){

                        bowlers.map(bowler => {
                            if((bowler.bowler_id === parseInt(ball.Bowler_Id))){

                                if(Number.isInteger(parseInt(ball.Batsman_Scored))){
                                    bowler.runs = bowler.runs + parseInt(ball.Batsman_Scored);
                                }
                                if(Number.isInteger(parseInt(ball.Extra_Runs))){
                                    if(ball.Extra_Type === "wides"){
                                        bowler.runs = bowler.runs + parseInt(ball.Extra_Runs);
                                    }
                                    else if(ball.Extra_Type === "noballs"){
                                        bowler.runs++;
                                    }
                                }
                                if(ball.Extra_Type === "" || ball.Extra_Type === "byes" ||  
                                ball.Extra_Type === "legbyes" || ball.Extra_Type === "penalty"){
                                    bowler.balls++;
                                }
                                if(bowler.lastMatchId !== parseInt(ball.Match_Id)){
                                    bowler.matches++;
                                    bowler.lastMatchId = parseInt(ball.Match_Id);
                                }
                                if(ball.Dissimal_Type === "caught" || ball.Dissimal_Type === "bowled" ||
                                 ball.Dissimal_Type === "lbw" || ball.Dissimal_Type === "caught and bowled" || 
                                 ball.Dissimal_Type === "stumped" || ball.Dissimal_Type === "hit wicket"){
                                    bowler.wickets++;
                                }
                            }
                        })

                    }else{
                        let ball_= 0, wicket= 0, run= 0, name;
                        if(ball.Extra_Type === "" || ball.Extra_Type === "byes" || 
                        ball.Extra_Type === "legbyes" || ball.Extra_Type === "penalty"){
                            ball_= 1;
                        }
                        if(ball.Dissimal_Type === "caught" || ball.Dissimal_Type === "bowled" || 
                        ball.Dissimal_Type === "lbw" || ball.Dissimal_Type === "caught and bowled" || 
                        ball.Dissimal_Type === "stumped" || ball.Dissimal_Type === "hit wicket"){
                            wicket= 1;
                        }   
                        if(Number.isInteger(parseInt(ball.Batsman_Scored))){
                            run = run + parseInt(ball.Batsman_Scored);
                        }
                        if(Number.isInteger(parseInt(ball.Extra_Runs))){
                            if(ball.Extra_Type === "wides"){
                                run = run + parseInt(ball.Extra_Runs);
                            }
                            else if(ball.Extra_Type === "noballs"){
                                run++;
                            }
                        }
                        players.forEach(player => {
                            if(player.Player_Id === parseInt(ball.Bowler_Id)){
                               name = player.Player_Name
                            }
                        })
                        let obj = {
                            bowler_id : parseInt(ball.Bowler_Id), 
                            bowler_name : name,
                            balls : ball_, 
                            runs : run, 
                            wickets : wicket , 
                            matches : 1, 
                            lastMatchId : parseInt(ball.Match_Id)  
                        }
                        bowlers.push(obj);
                    }
                })


                //setting bowlers details, max wickets of the selected season
                
                bowlers.sort((a,b) => b.wickets - a.wickets);
                console.log(bowlers);
                if(bowlers && bowlers[0]){
                    console.log("max wickets : "+bowlers[0].wickets);
                    setMaxWickets([bowlers[0].wickets, bowlers[0].bowler_name]);
                }
                bowlers = bowlers.sort((a,b) => b.wickets - a.wickets).slice(0,10);
                setBowlersDetails(bowlers);
    
            },[selectedSeason]
        );

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
                    <p><span className="heading">Maximum number of wickets taken : </span>
                    {maxWickets[0]} ( by {maxWickets[1]} )</p>
                    </div>
                    </CardPanel>  
                    <Table>
                        <thead>
                        <tr>
                        <th>Bowler</th>
                        <th>Matches</th>
                        <th>Overs</th>
                        <th>Runs</th>
                        <th>Wickets</th>
                        <th>Econ</th>
                        <th>Avg</th>
                        </tr>
                        </thead>         
                        <tbody>  
                        {bowlersDetails.map(bowler => (      
                            <tr key={bowler.bowler_id}>
                                <td>{bowler.bowler_name}</td>
                                <td>{bowler.matches}</td>
                                <td>{Math.ceil(bowler.balls/6)}</td>
                                <td>{bowler.runs}</td>
                                <td>{bowler.wickets}</td>
                                <td>{parseFloat(bowler.runs/Math.ceil(bowler.balls/6)).toFixed(2)}</td>
                                <td>{parseFloat(bowler.runs/bowler.wickets).toFixed(2)}</td>
                            </tr>
                        ))}          
                        </tbody>
                    </Table>  
                </Col>
            </Row>
      
            </div>
        );
       
}

export default Bowlers;
