class Character extends Thing {
	constructor(img) {
		super(width/2, height - 100, 100, 0, 0);
		this.img = img;
	}
	
	display() {
		stroke(255, 0, 255);
		noFill();
		strokeWeight(1);
		image(this.img, this.x, this.y);
		
//		noStroke();
		fill(0, 0, 255);
		triangle(
			this.x, this.y - this.size/2, 
			this.x + this.size/2, this.y + this.size/2, 
			this.x - this.size/2, this.y + this.size/2
		);
	}
	
	move() {
		if (keyIsDown(RIGHT_ARROW)) {
			this.speedX = 5;
		} else if (keyIsDown(LEFT_ARROW)) {
			this.speedX = -5;
		} else {
			this.speedX = 0;
		}
		
		if (keyIsDown(DOWN_ARROW)) {
			this.speedY = 5;
		} else if (keyIsDown(UP_ARROW)) {
			this.speedY = -5;	
		} else {
			this.speedY = 0;	
		}
	}
}