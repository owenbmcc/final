class collosseum extends Scene {

	preload() {

		this.walk = loadSpriteSheet('images/jonathan/walk.png', 299, 437, 3);
		this.stand = loadSpriteSheet('images/jonathan/idle.png', 414, 506, 1);
        this.attack = loadSpriteSheet('images/jonathan/attack.png', 533, 510, 2);
		this.map = new Map();
        this.characterKnight.idle2 = loadSpriteSheet('images/jonathan/knight_idle', 416, 448, 3);
        this.characterKnight.walk = loadSpriteSheet('images/jonathan/knight_walk', 416, 432, 3);
        this.characterKnight.attack = loadSpriteSheet('images/jonathan/knight_attack', 414, 477, 2);
        this.map = new Map();
	//	this.map.preload('data/jonathan.json');

	//	this.bg = loadSound('sounds/nelson/retromusic4.m4a');


	//	this.walkSound = loadSound('sounds/nelson/walking.wav');


	//	this.walkSound.playMode();


		//        this.woodsSheet = loadSpriteSheet('images/Nelson/background.png', 224, 224, 2);
	//	var npcSheet = loadSpriteSheet('images/Nelson/monster1.png', 48, 204, 4);
	//	this.npc = new NPC(500, 500, npcSheet);
	//	var npcSheet = loadSpriteSheet('images/Nelson/monster2.png', 192, 352, 5);
	//	this.npc = new NPC(800, 800, npcSheet);
	//	var npcSheet = loadSpriteSheet('images/Nelson/monster3.png', 192, 282, 4);
	//	this.npc = new NPC(600, 600, npcSheet);
		//make sure to change name of npcsheetand this.npc
	}

	setup() {

		const animations = {
			walking: loadAnimation(this.walk),
			standing: loadAnimation(this.stand),
            attack: loadAnimation(this.attack),
            
            knight_walk: loadAnimation(this.characterKnight.walk),
            knight_idle: loadAnimation(this.characterKnight.idle),
            knight_attack: loadAnimation(this.characterKnight.attack)
		};
		this.character = new Character(animations, 500,500);
        //this.characterKnight = new Character(animations, 500,500);
		//this.character.changeAnimation('idle');

		this.map.setup();
		//this.sceneLink.setup();
		//this.woods = new Scenery(width / 2, height / 2, this.woodsSheet);
		//this.woods.sprite.scale = 3;
		//this.woods.setup();

	//	this.npc.setup();
	//	this.npc.speedX = 5;

	}

	start() {
		//		this.bg.play();
    //BGmusic   this.bg.loop();
		this.map.start();
	}

	end() {
		this.bg.pause();
		this.map.end();
	}

	draw() {
		background('tan');
		//this.sand.display();

		/*instructions*/
		textAlign(CENTER);
		textSize(30);
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
            
		}
        else if (keyIsDown(32)){
            this.character.changeAnimation('attack');
            
        }
        
        else {
			this.character.changeAnimation('standing');
		}


		this.character.update();
		this.character.display();
        
        
        
        //Knight controls
        var isWalking = false;
        if (keyIsDown(68)) {
            this.characterKnight.walk.speedX = 1;
            isWalkingRightKnight = true;
        } else if (keyIsDown(65)) {
            this.characterKnight.walk.speedX = -1;
            isWalkingLeftKnight = true;
        } else {
            this.characterKnight.walk.speedX = 0;
        }

        
		if (keyIsDown(83)) {
			this.characterKnight.walk.speedY = 5;
			isWalking = true;
		} else if (keyIsDown(87)) {
			this.characterKnight.walk.speedY = -5;
			isWalking = true;
		} else {
			this.characterKnight.walk.speedY = 0;
		}

		if (isWalking) {
			 this.characterKnight.walk.changeAnimation('knight_walk');
            
		}
        else if (keyIsDown(16)){
            this.characterKnight.attack.changeAnimation('knight_attack');
            
        }
        
        else {
			this.characterKnight.idle.changeAnimation('knight_idle');
		}


		this.character.update();
		this.character.display();
		//this.npc.update();
		//if (this.npc.x > width * 2) {
		//	this.npc.x = 0;
		
		//make sure to change name of npcsheetand this.npc
//
//		this.npc.display();
//		if (this.npc.overlap(this.character)) {
//			console.log('you died');
//		}
//		//make sure to change name of npcsheetand this.npc

		/* update map */
		this.map.collide(this.character);
		//this.map.move(this.character);
		this.map.update(this.character);
		this.map.display();
	}
}