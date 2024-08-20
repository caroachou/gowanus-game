
class Microbe {
  constructor(position, type, dna) {
    position = createVector(random(width), random(waterLevel, height));
    this.lifespan = lifespan
    this.pos = position
    this.type = type;
    this.vel = createVector(random(-1.5, 0.8), random(-1.5, 0.8));
      this.maxspeed = 1;
    this.dna = dna;
    this.health = 100;
    this.resistance = this.dna.genes === 0;
        this.sizex = 40;
    this.sizey = 40;
  }
    

  move() {
    this.pos.add(this.vel);
    
    if (this.pos.y >= height-this.sizey+10){
      this.pos.y = height-this.sizey;
      this.vel.y *= -1
    }
        else if (this.pos.y <= waterLevel){
      this.pos.y = waterLevel;
      this.vel.y *= -1
    }
    
    if (this.pos.x >= width-this.sizex){
      this.pos.x = width-this.sizex;
      this.vel.x *= -1
    }
    else if (this.pos.x <= 0){
      this.pos.x = 0;
      this.vel.x *= -1
    
    }
    
    
    // 
    // if (this.pos.x - this.sizex / 2 < 0 || this.pos.x - this.sizex / 2 > width) {
    //   this.vel.x *= -1;
    // }
    // if (this.pos.y - this.sizey / 2 < waterLevel || this.pos.y - this.sizey / 2 > height) {
    //   this.vel.y *= -1;
    // }
    
    if (this.health <= 0) {
    this.dead();
    }
    
  }
  


  display() {

    
//     switch (this.type) {
//         case 0:
//             if (!this.resistance) {
//                 image(bactA, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
//             } else {
//                 image(Resistant, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
//             }
//             break;
            
//         case 1:
//             if (!this.resistance) {
//                 image(bactC, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
//             } else {
//                 image(bactR2, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
//             }
//             break;

//         case 2:
//             if (!this.resistance) {
//                 image(bactD, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
//             } else {
//                 image(bactR, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
//             }
//             break; 
    
//     }
    
    
    
     
    
    
//   }
    
  if (!this.resistance){
    
     switch (this.type) {
         
      case 0:
        image(bactA, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
        break;

      case 1:
        image(bactC, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
        break;

      case 2:
        image(bactD, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
        break;
        
         case 3:
        image(bactF, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
        break;
        
           case 4:
        image(bactB, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
        break;
     }
    }else{
    
    image(Resistant, this.pos.x - this.sizex/2, this.pos.y - this.sizey/2, this.sizex, this.sizey);
       
      //OR ANOTHER RESISTANT - THIS BE POPPING RANDOMLY UP
      
      
        
    }
  }
  
  contact(metals) {

    
    if (!this.resistance) {
      for (let i = metals.length - 1; i >= 0; i--) {
        let distance = p5.Vector.dist(this.pos, metals[i].pos);
        if (distance < 10) {
          this.health -= 50;
         this.vel.mult(0.0005);
  
          
        }
      }
    }
  }

dead() {
      return this.health <= 0;
  }

  reproduce() {

    if (random(1) < 0.00005) {
      let cloneDNA = this.dna.copy();
      cloneDNA.mutate(0.01);
      return new Microbe(this.pos.copy(), this.type, cloneDNA);
    } else {
      return null;
    }
  }
  
  // There's a small chance food will appear randomly
  //   if (random(1) < 0.001) {
  
  
  //     this.microbes.push(position, 6, dna);
  //   }
  // }
  
}
