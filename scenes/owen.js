class owen extends Scene {

	preload() {
		
//		this.character.img = loadImage('images/character.png');
		// sprite sheet - src, width, height, number of sprites
		this.walk = loadSpriteSheet('images/owen/walk.png', 68, 104, 5);
		this.idle = loadSpriteSheet('images/owen/idle.png', 68, 104, 12);
		
		this.bg = loadSound('sounds/owen/ketsa.mp3');
		
		this.walkSounds = [];
		this.walkSounds[0] = loadSound('sounds/owen/walk0.wav');
		this.walkSounds[1] = loadSound('sounds/owen/walk1.wav');
		this.walkSounds[2] = loadSound('sounds/owen/walk2.wav');
		
		this.walkSounds[0].playMode('sustain');
		this.walkSounds[1].playMode('sustain');
		this.walkSounds[2].playMode('sustain');

		this.map = new Map();
		this.map.preload('data/owen.json');
		
		var spriteSheet = loadSpriteSheet('images/owen/cat.png', 100, 88, 1);
		this.npc = new NPC(100, 400, spriteSheet, "Hit Enter");

	}
	
	setup() {
		const animations = {
			walk: loadAnimation(this.walk),
			idle: loadAnimation(this.idle)
		};
		this.character = new Character(animations);
		this.character.changeAnimation('idle');
		
		this.map.setup();
		this.npc.setup();
		
		this.npc.fontStyle = function() {
			textSize(50);
			fill('yellow');
			noStroke();
		};

	}
	
	start() {
//		this.bg.play();
//		this.bg.loop();
		this.map.start();
	}
	
	end() {
		this.bg.pause();	
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
			if (this.walkSounds.every(sound => sound.isPlaying() == false)) {
				random(this.walkSounds).play();
			}
		} else {
			this.character.changeAnimation('idle');
		}
		
		this.npc.display();
		if (this.npc.overlap(this.character)) {
			this.npc.displayDialog = true;
			if (keyIsDown(ENTER)) {
				changeScene('marsii');	
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



