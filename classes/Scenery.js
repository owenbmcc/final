class Scenery extends Thing {
	constructor(x, y, img) {
		super(x, y, 100);
		this.img = img;
	}

	display() {
		image(this.img, this.x, this.y);
	}
}