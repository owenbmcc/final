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
		
		var spriteSheet = loadSpriteSheet('images/owen/bird.png', 180, 200, 1);
		this.sceneLink = new NPC(100, 400, spriteSheet, "Hit Enter to go somewhere new!");
        //this.sceneLink.dialogCount = 0;
		
		var jerrySheet = loadSpriteSheet('images/owen/bird.png', 180, 200, 1);
		this.jerry = new NPC(200, 600, jerrySheet, "Hit Enter to fight Jerry.");
		
	}
	
	setup() {
        //this.hitEnter = false;
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
		// this.bg.pause();	
		this.map.end();
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
		
		
		/* check npcs */
		this.sceneLink.display();
		if (this.sceneLink.overlap(this.character)) {
			/* style dialog */
			textSize(30);
			textFont("Comic Sans MS");
			fill('pink');
			stroke('blue');
			strokeWeight(4);
			this.sceneLink.displayDialog(); 
            if (keyIsDown(ENTER)) {
                
				changeScene('paralax');
			}
            /*
            var dialog;
            if (this.sceneLink.dialogCount == 0) {
                dialog = 'hello';
            } else if (this.sceneLink.dialogCount == 1) {
                dialog = 'donut';
            }
            text(dialog, this.sceneLink.x, this.sceneLink.y);
			
            fill(255);
            text("hit enter", this.sceneLink.x, this.sceneLink.y + 50);
            
			if (keyIsDown(ENTER) && !this.hitEnter) {
				this.sceneLink.dialogCount++;
                this.hitEnter = true;
			} else if (!keyIsDown(ENTER)) {
                this.hitEnter = false;
            }
            */
		}
        
		
		this.jerry.display();
		if (this.jerry.overlap(this.character)) {
			/* style dialog */
			textSize(30);
			textFont("Comic Sans MS");
			fill('pink');
			stroke('blue');
			strokeWeight(4);
			this.jerry.displayDialog();
			
			if (keyIsDown(ENTER)) {
				changeScene('combat');
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



