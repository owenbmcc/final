class owen extends Scene {

	preload() {
		this.character = new Character();
		this.character.img = loadImage('images/character.png');
	}
	
	draw() {
		background(51);
		textSize(100);
		textAlign(CENTER, CENTER);
		text("Owen's Scene", width/2, height/2);
		text("BLAH BLAH BLAH", width/2, height/2 + 100);
		
		
		this.character.update();
		this.character.move();
		this.character.display();
	}
}