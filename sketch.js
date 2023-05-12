let dots = [] //array of the dots in the screen
let poppedDots = [] //array for the dots that will be popped
let bgColor = 0; //background color
let dotColor = 255; //color of the dots
let lineColor = 255; //line between the dots

function setup(){
  createCanvas(windowWidth, windowHeight)
  background(bgColor)
}

function draw(){
  //resetting every dot that is created
  background(bgColor);

  //make a variable of a mousePosition
  let mousePos = createVector(mouseX, mouseY);

  for(let i = 0; i < dots.length; i++){

    //I want to put every dot inside the array
    let dot = dots[i];

    //add a small repulsion force from the mouse position to make the dots repel the mouse position
    let mouseDist = p5.Vector.sub(mousePos, createVector(dot.x, dot.y)).mag();
    if (mouseDist < 400) {
      let repulsionForce = p5.Vector.sub(createVector(dot.x, dot.y), mousePos).normalize().mult(2);
      dot.force.add(repulsionForce); //add repulsionForce to the dot.force
    }

    //make the dots stay away from the cursor
    dot.x += dot.force.x;
    dot.y += dot.force.y;

    //update the dot force with a random value to keep it moving randomly
    dot.force = createVector(random(-1, 1), random(-1, 1)).mult(dot.speed);

    //check if the current dot and next dot in the array can be connected by a line based on the distance
    for (let j = i + 1; j < dots.length; j++) {
      let nextDot = dots[j];
      let distance = dist(dot.x, dot.y, nextDot.x, nextDot.y);
      if (distance < 200) {
        stroke(lineColor);
        line(dot.x, dot.y, nextDot.x, nextDot.y);
      }
    }

    //updating the dots everytime
    stroke(0);
    fill(dotColor);
    ellipse(dot.x, dot.y, dot.radius, dot.radius);

    //check if the dot has hitted the canvas
    if (dot.x < 0 || dot.x > width || dot.y < 0 || dot.y > height) {
      poppedDots.push(dot); //add dot to popped dots array
      dots.splice(i, 1); //remove dot from active dots array
    }
  }

  //make an animation and remove dot from the array
  for (let i = 0; i < poppedDots.length; i++) {
    let poppedDot = poppedDots[i];
    fill(255, 0, 0);
    ellipse(poppedDot.x, poppedDot.y, poppedDot.radius * 2, poppedDot.radius * 2);
    poppedDot.radius *= 0.95; //shrink dot over time
    if (poppedDot.radius < 1) {
      poppedDots.splice(i, 1); //remove dot from popped dots array
    }
  }
}

function mousePressed() {
  let dot = {
    x: mouseX,
    y: mouseY,
    radius: random(10, 50),
    speed: 5,
    color: color(dotColor),
    force: createVector(random(-1, 1), random(-1, 1)).mult(1),
  };
  dots.push(dot);
}

function keyPressed() {
  if (keyCode === 32) {
    if(bgColor == 0){
      bgColor = 255;
      dotColor = 0;
      lineColor = 0;
    }
    else{
      bgColor = 0;
      dotColor = 255;
      lineColor = 255;
    }
  }
}
