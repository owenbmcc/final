class Combat extends Scene {
	preload() {
		this.playerIdle = loadSpriteSheet('images/owen/idle.png', 68, 104, 12);
		this.npcIdle =  loadSpriteSheet('images/owen/bird.png', 180, 200, 1);
	}

	setup() {
		this.turn = 'player'; // or 'npc'
		this.counter = 100;
		this.message = 'Click to attack.'
		this.messageCounter = 0;

		var playerAnimations = {
			idle: this.playerIdle
		};
		this.player = new Character(playerAnimations);
		this.player.x = 200;
		this.player.y = height - 200;
		this.player.health = 100;

		var npcAnimations = {
			idle: this.npcIdle
		};
		this.npc = new Character(npcAnimations);
		console.log(this.npc);
		this.npc.x = width - 200;
		this.npc.y = 200;
		this.npc.health = 100;
		this.npc.name = 'Jerry';

		this.option1 = createSprite(this.player.x, this.player.y + 100, 50, 50);
		this.option1.onMousePressed = this.attack.bind(this);

	}

	attack() {
		if (random(5) > 2) {
			this.npc.health -= 10;
			this.message = "You damaged " + this.npc.name;
		} else {
			this.message = "You missed " + this.npc.name;
		}
		this.turn = 'npc';
		this.messageCounter = 50;
	}

	npcAttack() {
		if (random(6) > 2) {
			this.player.health -= 10;
			this.message = "You got hit by " + this.npc.name;
		} else {
			this.message = "You were missed by " + this.npc.name;
		}
		this.turn = 'player';
		this.messageCounter = 50;
	}

	draw() {
		background(220)

		this.player.display();
		this.npc.display();

		if (this.messageCounter > 0) {
			this.messageCounter--;
			if (this.messageCounter <= 0) {
				if (this.turn == 'player') {
					this.message = 'It is your turn to attack';
				} else {
					this.message = 'Wait for ' + this.npc.name;
					this.counter = 100;
				}
			}
		} else if (this.turn == 'player') {
			this.option1.display();
		} else {
			this.counter--;
			if (this.counter <= 0) {
				this.counter = 100;
				this.npcAttack();
			}
		}

		/* message */
		textSize(40);
		fill('pink');
		stroke(0);
		strokeWeight(2);
		textAlign(CENTER, CENTER);
		text(this.message, width/2, height - 100);

		/* stats */
		fill('red');
		noStroke();
		rectMode(CENTER);
		rect(this.player.x, this.player.y - 100, this.player.health, 10);
		rect(this.npc.x, this.npc.y - 100, this.npc.health, 10);
	}

}