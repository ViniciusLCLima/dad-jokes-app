import React, { Component } from 'react';
import LaughEmoji from './LaughingEmoji.svg.png';
import axios from 'axios';
import './DadJokesApp.css'
import Joke from './Joke';
import {v4 as uuidv4} from 'uuid'

const API_URL = 'https://v2.jokeapi.dev/joke/Any?type=single'

class DadJokesApp extends Component{
    constructor(props){
        super(props)
        this.state = {
            jokes: JSON.parse(localStorage.getItem('jokesDadJokes') || "[]"),
            loading: false
        }
        this.get10Jokes = this.get10Jokes.bind(this)
    }
    componentDidMount(){
        if(this.state.jokes.length === 0){
         this.get10Jokes()
        }
    }

    componentDidUpdate(){
        localStorage.setItem('jokesDadJokes',JSON.stringify(this.state.jokes))
    }

    async get10Jokes(){
        const response = await axios.get(`${API_URL}&amount=10`)
        const newJokes = response.data.jokes
        for (let i=0; i<newJokes.length; i++){
            let newJoke = newJokes[i].joke
            if(!this.state.jokes.every(j=>{return j.joke !== newJoke})){
                continue;
            }
            this.setState(st=>{
                return {jokes:[...st.jokes, {joke:newJoke, voteCounter:0,id: uuidv4()}]}
            })
        }
        this.setState({loading:false})
    }

    newJokesClickHandler =()=>{
        this.setState({loading:true}, this.get10Jokes)
    }

    updateVotes = (id, valueToSum) => {
        let idx = 0
        for (let joke of this.state.jokes){
            if (joke.id === id){
                break;
            }
            idx++
        }
        this.setState(st => {
            st.jokes[idx] = {...st.jokes[idx], voteCounter:st.jokes[idx].voteCounter + valueToSum}
            return {jokes: st.jokes}
        })
    }

    render(){
        let jokes = this.state.jokes.sort((a, b) => -a.voteCounter + b.voteCounter )
        let jokesList = jokes.map(j=>{
            return <Joke key={j.id} joke={j.joke} votes={j.voteCounter} id={j.id} updateVotes={this.updateVotes}/>
        })
        if (this.state.jokes.length === 0 || this.state.loading){
            return <div className='DadJokesApp-loader'><i className="fa-solid fa-8x fa-face-laugh-beam"></i>
            <h1>Loading...</h1>
            </div>
        }
        return (
            <main className='DadJokesApp'>
            <div className='DadJokesApp-firstDiv'>
                <h1 className='DadJokesApp-header'>Dad <span>Jokes</span></h1>
                <div className='DadJokesApp-imgDiv'><img className='DadJokesApp-LaughEmoji' src={LaughEmoji} alt='A laughing face with tears of joy'/></div>
                <button onClick={this.newJokesClickHandler} className='DadJokesApp-newJokesBtn'>New jokes</button>
            </div>
            <div className='DadJokesApp-jokes'>
                {jokesList}
            </div>
        </main>)
    }
}

export default DadJokesApp;