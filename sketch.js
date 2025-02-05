let particles = [];
const numParticles = 100;

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5-container');
    
    
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(10, 10, 10, 20);
    
     
    for (let particle of particles) {
        particle.update();
        particle.display();
    }
    
     
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let distance = dist(particles[i].position.x, particles[i].position.y, particles[j].position.x, particles[j].position.y);
            if (distance < 100) {
                stroke(255, 255, 255, 150 - distance);
                line(particles[i].position.x, particles[i].position.y, particles[j].position.x, particles[j].position.y);
            }
        }
    }
}

class Particle {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = createVector(random(-1, 1), random(-1, 1));
        this.size = random(2, 5);
        this.color = color(255);  
    }
    
    update() {
        // Add mouse interaction
        let mouse = createVector(mouseX, mouseY);
        let dir = p5.Vector.sub(mouse, this.position);
        let distance = dir.mag();
        
        if (distance < 100) {
            dir.normalize();
            dir.mult(0.5);
            this.velocity.add(dir);
        }
        
        this.velocity.mult(0.98);  
        this.position.add(this.velocity);
        
        // Wrap around edges
        if (this.position.x < 0) this.position.x = width;
        if (this.position.x > width) this.position.x = 0;
        if (this.position.y < 0) this.position.y = height;
        if (this.position.y > height) this.position.y = 0;
    }
    
    display() {
        noStroke();
        fill(this.color);
        circle(this.position.x, this.position.y, this.size);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function saveSketch() {
    let now = new Date();
    let time = `${now.getSeconds()}${now.getMinutes()}${now.getHours()}`;
    let filename = `cct_${time}-${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
    saveCanvas(filename, 'jpg');
}
