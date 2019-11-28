class NPC extends Scenery {
	constructor(x, y, spriteSheet, dialog) {
		super(x, y, spriteSheet);
		this.dialog = dialog;
	}

	display() {
		super.display();
	}
	
	displayDialog() {
		text(this.dialog, this.sprite.position.x, this.sprite.position.y, this.sprite.width);
	}
}