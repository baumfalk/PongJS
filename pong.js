function Pong() {
  this.started = false;
  this.height = 100;
  this.width = 2 * this.height;

  this.paddleWidth = this.height / 5;
  this.paddleThickness = this.width / 40;
  this.lPaddleLoc = this.height / 2 - this.paddleWidth / 2;
  this.rPaddleLoc = this.lPaddleLoc;
  this.paddleSpeed = this.height/20;

  this.ballThickness = this.paddleThickness;
  this.ballXLoc = this.width / 2;
  this.ballYLoc = this.height / 2;

  this.ballXVel = this.height / 50;
  this.ballYVel = this.width / 50;
  this.scoreL = 0;
  this.scoreR = 0;

  this.fps = 24;
  this.timeBetweenTicks = 1000/this.fps;

  // graphical variables
  this.canvas = document.getElementById("pong");
  this.score = document.getElementById("score");
  this.context = this.canvas.getContext("2d");

  this.canvas.height = this.height;
  this.canvas.width = this.width;

  this.draw = function() {
    this.context.fillStyle = "#000";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = "#FFF";
    this.context.fillRect(this.ballXLoc, this.ballYLoc, this.ballThickness, this.ballThickness);

    this.context.fillRect(0, this.lPaddleLoc, this.paddleThickness, this.paddleWidth);
    this.context.fillRect(this.width-this.paddleThickness, this.rPaddleLoc, this.paddleThickness, this.paddleWidth);
  }
  this.resetBall = function() {
    this.ballXLoc = this.width / 2;
    this.ballYLoc = this.height / 2;

    this.ballXVel = this.height / 50;
    this.ballYVel = this.width / 50;
  }
  this.initialize = function() {
    //unpause
    if(this.started === false) {
      this.started = true;
      this.intervalID = setInterval(function() {

        // compute movement
        this.ballXLoc += this.ballXVel;
        this.ballYLoc += this.ballYVel;
       
        //check paddle/ball collision
        if(this.ballXLoc >= 0
          && this.ballXLoc <= 0 + this.paddleThickness
          && this.ballYLoc+this.ballThickness >= this.lPaddleLoc
          && this.ballYLoc <= this.lPaddleLoc + this.paddleWidth) {
          this.ballXVel = -1*this.ballXVel;
          this.ballXLoc = 0 + this.paddleThickness;
          if(this.ballYVel > 0) {
            this.ballYVel = -1*Math.min(this.ballYVel +1,10);
          } else {
            this.ballYVel = -1*Math.max(this.ballYVel -1,-10);
          }
        } else if(this.ballXLoc+this.ballThickness >= this.width - this.paddleThickness
          && this.ballXLoc+this.ballThickness <= this.width
          && this.ballYLoc+this.ballThickness >= this.rPaddleLoc
          && this.ballYLoc <= this.rPaddleLoc + this.paddleWidth) {
          this.ballXVel = -1*this.ballXVel;
          this.ballXLoc = this.width - this.paddleThickness - this.ballThickness;
          if(this.ballYVel > 0) {
            this.ballYVel = -1*Math.min(this.ballYVel +1,10);
          } else {
            this.ballYVel = -1*Math.max(this.ballYVel -1,-10);
          }
        } else {
          //check top/bottom wall collisions
          if(this.ballYLoc> this.height) {
            this.ballYLoc = 2 * this.height - this.ballYLoc;
            this.ballYVel = -1*this.ballYVel;
          } else if(this.ballYLoc < 0) {
            this.ballYLoc = - this.ballYLoc;
            this.ballYVel = -1*this.ballYVel;
          }
          // check left/right wall collisions
          //left scores
          if(this.ballXLoc> this.width) {
            this.ballXLoc = 2 * this.width - this.ballXLoc;
            this.ballXVel = -1*this.ballXVel;
            this.scoreL += 1;
            this.score.innerHTML = this.scoreL + " - " + this.scoreR;
            this.resetBall();
            //right scores
          } else if(this.ballXLoc < 0) {
            this.ballXLoc = - this.ballXLoc;
            this.ballXVel = -1*this.ballXVel;
            this.scoreR += 1;
            this.score.innerHTML = this.scoreL + " - " + this.scoreR;
            this.resetBall();
          }
        }

       
        // check 
        // draw frame
        this.draw();
      }.bind(this),this.timeBetweenTicks);
    } else { //pause
      clearInterval(this.intervalID);
      this.started = false;
    }   
  }
  document.addEventListener("keyup", function(e) {
    if(e.key === "w" || e.keyCode === 87) {
      if(this.lPaddleLoc >= this.paddleSpeed) {
        this.lPaddleLoc = this.lPaddleLoc - this.paddleSpeed; 
      }
    } else if(e.key === "s" || e.keyCode === 83) {
      if(this.lPaddleLoc+this.paddleWidth+this.paddleSpeed <=this.height) {
        this.lPaddleLoc = this.lPaddleLoc + this.paddleSpeed;
      }
    } else if(e.key === "ArrowUp" || e.keyCode === 38) {
      if(this.rPaddleLoc >= this.paddleSpeed) {
        this.rPaddleLoc = this.rPaddleLoc - this.paddleSpeed;    
      }
    } else if(e.key === "ArrowDown" || e.keyCode === 40) {
      if(this.rPaddleLoc+this.paddleWidth+this.paddleSpeed <=this.height) {
        this.rPaddleLoc = this.rPaddleLoc + this.paddleSpeed;
      }
    } else if(e.key === " " || e.keyCode === 32) {
      this.initialize();
    }
    
    this.draw();
    
  }.bind(this), false);
}

window.onload = function() {
  var pongGame = new Pong();
  pongGame.draw();

}

// // game loop
// function sleepFor( sleepDuration ){
//     var now = new Date().getTime();
//     while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
// }

// function update() {
//   var lastTime = Date.now();
//   var curTime = Date.now();
//   var count = 0;
//   do {
//     curTime = Date.now();
//     console.log(curTime - lastTime);

//     if(curTime - lastTime > timeBetweenTicks) {
      // ballXLoc += ballXVel;
      // ballYLoc += ballYVel;
      // if(ballXLoc > height) {
      //   ballXLoc = height - ballXLoc;
      //   ballXVel = - ballXVel;
      // }
      // else if (ballXLoc < 0) {
      //   ballXLoc = -ballXLoc;
      //   ballXVel = - ballXVel;
      // }
      
      // if(ballYLoc > width) {
      //   ballYLoc = width - ballYLoc;
      //   ballYVel = - ballYVel;
      // }
      // else if (ballYLoc < 0) {
      //   ballYLoc = -ballYLoc;
      //   ballYVel = - ballYVel;
      // }
      
//       draw(context,canvas, height, width, ballXLoc, ballYLoc, ballThickness,lPaddleLoc, rPaddleLoc, paddleThickness, paddleWidth);
//     } 
    
//     lastTime = curTime;
//     sleepFor(250);
//     count = count + 1;
//   } while(count < 10);
// }




