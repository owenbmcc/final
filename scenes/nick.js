class nick extends Scene {

	preload() {
//		this.character.img = loadImage('images/character.png');
		// sprite sheet - src, width, height, number of sprites
		this.walk = loadSpriteSheet('images/nick/walk.png', 48, 68, 3);
		this.idle = loadSpriteSheet('images/nick/idle.png', 48, 68, 4);
		
        /* 
		this.bg = loadSound('sounds/owen/ketsa.mp3');
		
		this.walkSounds = [];
		this.walkSounds[0] = loadSound('sounds/owen/walk0.wav');
		this.walkSounds[1] = loadSound('sounds/owen/walk1.wav');
		this.walkSounds[2] = loadSound('sounds/owen/walk2.wav');
		
		this.walkSounds[0].playMode('sustain');
		this.walkSounds[1].playMode('sustain');
		this.walkSounds[2].playMode('sustain');
*/
		this.map = new Map();
		this.map.preload('data/nick.json');
        
        var spriteSheet = loadSpriteSheet('images/nick/ben.png', 32, 32, 1);
		this.sceneLink = new NPC(800, -100, spriteSheet, "Yo! Let's Battle! *Hit Enter To Battle!*");

	}
	
	setup() {
		const animations = {
			walk: loadAnimation(this.walk),
			idle: loadAnimation(this.idle)
		};
		this.character = new Character(animations);
		this.character.changeAnimation('idle');
		
		this.map.setup();
        this.sceneLink.setup();

	}
	
	start() {
//		this.bg.play();
//		this.bg.loop();
		this.map.start();
	}
	
	end() {
//		this.bg.pause();	
	}
	
	draw() {
		background(220);

		/* some instructions */
		textAlign(CENTER);
		textSize(20);
		text('move the character with arrows', width/2, 100);
		
		
		/* user input - move character around */
		var isWalking = false;
		if (keyIsDown(RIGHT_ARROW)) {
			this.character.speedX = 5;
			isWalking = true;
		} else if (keyIsDown(LEFT_ARROW)) {
			this.character.speedX = -5;
			isWalking = true;
		} else {
			this.character.speedX = 0;
		}
		
		if (keyIsDown(DOWN_ARROW)) {
			this.character.speedY = 5;
			isWalking = true;
		} else if (keyIsDown(UP_ARROW)) {
			this.character.speedY = -5;	
			isWalking = true;
		} else {
			this.character.speedY = 0;
		}
		
		if (isWalking) {
			this.character.changeAnimation('walk');

		} else {
			this.character.changeAnimation('idle');
		}
		
        
		/* check npcs */
		this.sceneLink.display();
		if (this.sceneLink.overlap(this.character)) {
			/* style dialog */
			textSize(30);
			textFont("Arial");
			fill('red');
			stroke('black');
			strokeWeight(4);
			this.sceneLink.displayDialog();
			
			if (keyIsDown(ENTER)) {
				changeScene('paralax');
			}
		}
        
        
        
        
        
		/* update map */
		this.map.collide(this.character);
		this.map.move(this.character);
//		this.map.update(this.character);
		this.map.display();

		/* update character */
		this.character.update();
		this.character.display();

	}
}
