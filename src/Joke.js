import React, { Component } from 'react';
import './Joke.css'
import emoji0 from './angry-face.png'
import emoji1 from './confused emoji.png'
import emoji2 from './slightly smiling emoji.png'
import emoji3 from './grinning with big eyes emoji.png'
import emoji4 from './grinning squinting emoji.png'
import emoji5 from './face with tears of joy emoji.png'
import emoji6 from './rolling on the floor laughing emoji.png'

class Joke extends Component{
    static defaultProps = {
        votesTones:['darkred','red', 'orangered', 'orange', 'yellow', 'yellowgreen', 'green'],
        emojiDescriptions:['angry face','confused', 'slightly smiling', 'grinning with big eyes', 'grinning squinting', 'face with tears of joy', 'rolling on the floor laughing' ],
        emojis:[emoji0, emoji1, emoji2, emoji3, emoji4, emoji5, emoji6]
    }
    downVoteClickHandler = e =>{
        this.props.updateVotes(this.props.id, -1)
    }

    upVoteClickHandler = e =>{
        this.props.updateVotes(this.props.id, 1)
    }

    getJokeEsteemLevel = votes =>{
        if (votes<0) return 0
        else if(votes<3) return 1
        else if (votes<5) return 2
        else if (votes<7) return 3
        else if (votes<9) return 4
        else if (votes<11) return 5
        else return 6
    }

    render(){
        const props = this.props
        let jokeSteemLevel = this.getJokeEsteemLevel(props.votes)
        return (
        <div className='Joke'>
            <div className='Joke-votesDiv'>
                <button className='up-vote' onClick={this.upVoteClickHandler}>
                    <i className="fa-solid fa-arrow-up"></i>
                </button>
                <p style={{borderColor: props.votesTones[jokeSteemLevel]}}>{props.votes}</p>
                <button className='down-vote' onClick={this.downVoteClickHandler}>
                    <i className="fa-solid fa-arrow-down"></i>
                </button>
            </div>
            <p className='Joke-joke'>{props.joke}</p>
            <div className='Joke-faceDiv'><img src={props.emojis[jokeSteemLevel]} alt={`${props.emojiDescriptions[jokeSteemLevel]} emoji`} /></div>
        </div>)
    }
}

export default Joke;