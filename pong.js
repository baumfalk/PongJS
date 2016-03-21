function Pong() {
  var pong = this;
  this.started = false;
  this.height = 100;
  this.width = 2 * this.height;

  this.paddleWidth = this.height / 5;
  this.paddleThickness = this.width / 40;
  this.lPaddleLoc = this.height / 2 - this.paddleWidth / 2;
  this.rPaddleLoc = this.lPaddleLoc;
  this.paddleSpeed = 5;

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

  document.addEventListener("keyup", function(e) {
    console.log(e);
    switch(e.key) {
      case "w":
        if(this.lPaddleLoc >= this.paddleSpeed) {
          this.lPaddleLoc = this.lPaddleLoc - this.paddleSpeed; 
        }
        break;
      case "s": 
        this.lPaddleLoc = this.lPaddleLoc + this.paddleSpeed;
        break;
      case "ArrowUp":
        if(this.rPaddleLoc >= this.paddleSpeed) {
          this.rPaddleLoc = this.rPaddleLoc - this.paddleSpeed;
        }
        break;
      case "ArrowDown": 
        this.rPaddleLoc = this.rPaddleLoc + this.paddleSpeed;
        break;
      // start the game  
      case " ":
        if(this.started === false) {
          this.started = true;
          setInterval(function() {
            this.ballXLoc += this.ballXVel;
            this.ballYLoc += this.ballYVel;
           
            if(this.ballXLoc> this.width) {
              this.ballXLoc = 2 * this.width - this.ballXLoc;
              this.ballXVel = -1*this.ballXVel;

            } else if(this.ballXLoc < 0) {
              this.ballXLoc = - this.ballXLoc;
              this.ballXVel = -1*this.ballXVel;

            }

            if(this.ballYLoc> this.height) {
              this.ballYLoc = 2 * this.height - this.ballYLoc;
              this.ballYVel = Math.max(-10,-1*this.ballYVel - 1);

            } else if(this.ballYLoc < 0) {
              this.ballYLoc = - this.ballYLoc;
              this.ballYVel = Math.min(-1*this.ballYVel + 1,10);

            }
            
            console.log(this.ballXVel +" "+this.ballYVel);
            this.draw();
          }.bind(this),this.timeBetweenTicks);
        }
        break;    
      default:
        break;
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




