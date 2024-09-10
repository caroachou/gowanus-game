class Metal {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.maxspeed = 1;
    this.maxforce = 0.03;
    this.vel = createVector(random(-1.5, 0.8), random(-1.5, 0.8));
    this.initialVel = this.vel.copy();
    this.hydrogelWidth = hydrogelWidth;
    this.hydrogelHeight = hydrogelHeight; 
  }

  display() {
        this.sizex = 80;
        this.sizey= 40;
        image(lead, this.pos.x - this.sizex / 2, this.pos.y - this.sizey / 2, this.sizex, this.sizey);
       }
  
  move() {
    this.pos.add(this.vel);
    if (this.pos.x - this.sizex/2 < 0 || this.pos.x - this.sizex / 2 > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y - this.sizey/2 < waterLevel || this.pos.y - this.sizey / 2 > height) {
      this.vel.y *= -1;
  }}
  
  applyForce(force) {
    this.acc.add(force);
  }
  
  attract(target) {
    let direction = p5.Vector.sub(target, this.pos); 
    let d = direction.setMag(0.75);
    this.pos.add(direction);
    let slowingRadius = 5;
    
    if (d < slowingRadius){
      let m = map(d, 0, slowingRadius, 0, this.maxspeed);
      direction.setMag(m);
    } else{
      direction.setMag(this.maxspeed);
      let steer = p5.Vector.sub(direction, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
  }   
    }

  returnToInitialMovement() {
    let steeringX = (this.initialVel.x - this.vel.x) * 0.01;
    let steeringY = (this.initialVel.y - this.vel.y) * 0.01;
    this.acc = createVector(steeringX, steeringY);
  }

  isAttracted(target) {
    return this.pos.dist(target) < this.hydrogelHeight /2;
  }
}
