
class DNA {
  constructor() {
   this.genes = random(1) > 0.1 ? 1 : 0;
    this.health = 100;
    }
  
  
 copy() {
    let newDNA = new DNA();
    newDNA.genes = this.genes;
    return newDNA;
  }

mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = random(0, 1);
      }
    }
  }
}
