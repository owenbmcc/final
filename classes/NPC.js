class NPC extends Scenery {
	constructor(x, y, anim, dialog) {
		super(x, y, anim);
		this.dialog = dialog;
		this.displayDialog = false;
	}

	display() {
		super.display();
		this.fontStyle();
		if (this.displayDialog) {
			text(this.dialog, this.x + this.sprite.width, this.y);
		}
	}
	
	fontStyle() {
		textSize(20);
		fill(0);
		noStroke();
	}
}