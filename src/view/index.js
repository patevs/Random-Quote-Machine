
/**
 * src/view/index.js
 * RQM
 */

 // imports
import React, { Component } from 'react'
import $ from "jquery";

import { Pane, Button, majorScale, Text } from 'evergreen-ui'
import { Container, Col } from 'reactstrap'

// components
import Divider from '../shared/Divider'

/**
 * // RANDOM QUOTE MACHINE 
 *  component class
 */
class RQM extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      color: "#D5D6D7",
      isToggleOn: true
    };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('this is:', this);
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  newQuote(){
    randomQuote();
    this.color();
  }

  componentDidMount(){
    this.newQuote();
  }

  color(){
    var colorS = '#'+Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = shadeColor(colorS, -5);
    document.getElementById("random_quote").style.backgroundColor = shadeColor(colorS, -20);
    document.getElementById("random_quote").style.color = shadeColor(colorS, -20);
    document.getElementById("btn1").style.background = shadeColor(colorS, -20);
    //$("body").animate({backgroundColor:shadeColor(colorS,-5)},1000);
    //$("#random_quote").animate({color:shadeColor(colorS,-20)},1000);
    //$("#btn0").animate({backgroundColor:shadeColor(colorS,-20)},1000);
    //$("#btn1").animate({backgroundColor:shadeColor(colorS,-20)},1000);
    //$(".fa-quote-left").animate({color:shadeColor(colorS,-20)},1000);
    //$(".fa-twitter").animate({backgroudColor:shadeColor(colorS,-20)},1000);
  }

  render() {
    return( 
      <Container>

        <Pane align="center" marginTop={majorScale(7)}>

          <Pane align="center" marginBottom={majorScale(7)} background="white">
            <Col>
              <Text color={"black"} id="random_quote" />
            </Col>
          </Pane>

          <Divider />

          <Button appearance="primary" intent="success" marginTop={majorScale(4)} height={majorScale(7)} onClick={e => this.newQuote(e)} id="btn1">
            Next Quote!
          </Button>
        
        </Pane>

      </Container>
    );
  }

}

export default RQM;

/*

          <Button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'ON' : 'OFF'}
          </Button>
          <Button
            onClick={(e) => this.handleClick(e)}
            id="btn0"
          >Tweet
          </Button>

 */

function randomQuote(){
  $.ajax({   
    url: "https://api.forismatic.com/api/1.0/?",
    dataType: "jsonp",
    data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
    success: function( response ) {
      if(response.quoteText.length > 120){
        randomQuote();
      }
      if(response.quoteAuthor.length > 0){
        $("#random_quote").html("<p id='random_quote' class='lead text-center'>" + response.quoteText + "<br/>&dash; " + response.quoteAuthor + " &dash;</p>");
        $('#btn0').attr('href', 'https://twitter.com/intent/tweet?text='+response.quoteText+ '- ' + response.quoteAuthor).attr('target', '_blank');
      } else {
        $("#random_quote").html("<p id='random_quote' class='lead text-center'>" + response.quoteText + "<br/>&dash; Unknown &dash;</p>");
        $('#btn0').attr('href', 'https://twitter.com/intent/tweet?text='+response.quoteText+ '- Unknown').attr('target', '_blank');
      }      
    }
  });
}

// credit: https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors/13532993#13532993
function shadeColor(color, percent) {
  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);
  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  
  var RR = ((R.toString(16).length===1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length===1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length===1)?"0"+B.toString(16):B.toString(16));
  return "#"+RR+GG+BB;
}




