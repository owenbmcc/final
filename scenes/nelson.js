class nelson extends Scene {

	preload() {
		this.walk = loadSpriteSheet('images/nelson/walking.png', 68, 104, 5);
		this.idle = loadSpriteSheet('images/nelson/standing.png', 68, 104, 12);

		//this.bg = loadSound('sounds/nelson/');

		this.walkSounds = [];
		this.walkSounds[0] = loadSound('sounds/nelson/walking.wav');
		//this.walkSounds[1] = loadSound('sounds/nelson/walk1.wav');
		//this.walkSounds[2] = loadSound('sounds/nelson/walk2.wav');

		this.walkSounds[0].playMode('sustain');
		//this.walkSounds[1].playMode('sustain');
		//this.walkSounds[2].playMode('sustain');
	}

	setup() {
		const animations = {
			walking: loadAnimation(this.walking),
			standing: loadAnimation(this.standing)
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
		this.bg.pause();
	}

	draw() {
			background(220);

			/*instructions*/
			textAlign(CENTER);
			textSize(20);
			text('move the character with arrows', width / 2, 100);


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
				this.character.changeAnimation('walking');
				if (this.walkSounds.every(sound => sound.isPlaying() == false)) {
					random(this.walkSounds).play();
				}
			} else {
				this.character.changeAnimation('standing');
			}
	}
}