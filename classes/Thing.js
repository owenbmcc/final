class Thing {
	constructor(x, y, size, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speedX = speedX;
		this.speedY = speedY;
	}
		
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
	}
	
	collide(other) {
		var d = dist(this.x, this.y, other.x, other.y);
		var s = this.size + other.size;
		if (d < s/2) {
			return true;
		} else {
			return false;
		}
	}
}