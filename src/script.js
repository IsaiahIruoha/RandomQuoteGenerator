import React from 'https://esm.sh/react@18.2.0'
import ReactDOM from 'https://esm.sh/react-dom@18.2.0'

const Quote = (props) => {
		return (
    <>
			<div className="textContainer">
				<h1 id="text">
					<svg viewBox="0 0 512 512" width="35" title="quote-left">
					<path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
					</svg>
					{" "}{props.text}
				</h1>
				<p id="author">- {props.author}</p>
			</div> 
    </>
  );
};

class NewQuote extends React.Component {
	constructor (props) {
		super(props); 
	}
	render() {
		return (
			<>
				<button onClick={this.props.generateNewQuote} className="newQuote" id="new-quote">New Quote</button> 
			</>
		);
	};
}

const Tweet = (props) => {
  return (
    <>
			<a className="tweetQuote" id="tweet-quote" target="_blank"
				href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("\"" + props.text + "\"" + " - " + props.author)}`}>
				<div className="tweetContainer">
					<svg viewBox="0 0 512 512" width="38" title="paper-plane">
  <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" />
</svg>
				</div>
				</a> 
    </>
  );
};

class QuoteBox extends React.Component {
	constructor (props) {
		super(props); 
		this.state = {
			text: '', 
			author: ''
		}
		this.generateNewQuote = this.generateNewQuote.bind(this);
	}
	componentDidMount() {
    fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => {
        this.setState({
          text: data.content,
					author: data.author
        });
      });    
  } 
	generateNewQuote() {
		fetch("https://api.quotable.io/random")
      .then(response => response.json())
      .then(data => {
        this.setState({
          text: data.content,
					author: data.author
        });
      });   
	}
	render() {
		return (
			<div id="quote-box">
				<Quote text={this.state.text} author={this.state.author}/>
				<br />
				<NewQuote generateNewQuote={this.generateNewQuote} />  
				<Tweet text={this.state.text} author={this.state.author}/>
			</div>
		);
	}
}

ReactDOM.render(<QuoteBox/>, document.getElementById('content')); 