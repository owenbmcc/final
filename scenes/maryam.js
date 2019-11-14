class maryam extends Scene {

	preload() {
		this.character = new Character();
		this.character.img = loadImage('images/orange.png');
	}
	
	draw() {
		background('blue');
		
        
		this.character.update();
		this.character.move();
		this.character.display();
	}
    
}