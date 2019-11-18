class ekaterina extends Scene {
	
	preload() {
//		this.gif_createImg = createImg("images/LION.gif");
		this.character = new Character();
		this.character.img = loadImage('images/LION.gif');
		this.character.sound = loadSound('sounds/Roar.mp3');
	}
	
	start() {
		this.character.sound.play();	
	}
	
	draw() {
      background(141, 148, 255);
//  	  gif_createImg.position(width / 2, 280);
      textSize(100);
      strokeWeight(10);
      stroke(17, 0, 255);
      fill(0, 154, 255);
      textAlign(CENTER, CENTER);
      text("Ekaterina's Scene", width / 2, 80);
      strokeWeight(10);
      stroke('yellow');
      fill('red');
      text("...meow...", width / 2, 200);
		
		this.character.update();
		this.character.move();
		this.character.display();
	}
    
}