class Scenery extends Thing {
	constructor(x, y, img) {
		super(x, y, 100);
		this.img = img;
	}

	display(x, y) {
		image(this.img, this.x + x, this.y + y);
	}
}