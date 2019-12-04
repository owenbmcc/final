class CombatScene extends Scene {
	preload() {
		this.playerIdle = loadSpriteSheet('images/owen/idle.png', 68, 104, 12);
		this.npcIdle =  loadSpriteSheet('images/owen/bird.png', 180, 200, 1);

		this.attackSpriteSheet = loadSpriteSheet('images/owen/tree.png', 88, 112, 1);
	}

	setup() {

		var playerAnimations = {
			idle: this.playerIdle
		};
		this.player = new Character(playerAnimations, 200, height - 200);

		var npcAnimations = {
			idle: this.npcIdle
		};
		this.npc = new Character(npcAnimations, width - 200, 200);

		// player, npc, npc Name, timeout 
		this.combat = new Combat(this.player, this.npc, "Jerry", 100);

		this.combat.addMetric('health', 100, 0, function(isPlayer, combat) {
			if (isPlayer) {
				combat.state = 'win';
				combat.message = "You won.";
			} else {
				combat.state = 'lose';
				combat.message = "You lost.";
			}
		});

		this.combat.addPlayerAttack(this.attackSpriteSheet, 'health', 0.5, -50);
		this.combat.addNPCAttack('health', 0.5, -50);

		this.combat.onWin = function() {
			changeScene('owen');
		};

		this.combat.onLose = function() {
			changeScene('owen');
		};
	}

	draw() {
		background(220)

		this.combat.update();
		this.combat.display();

		/* display this.combat.message */
		textSize(40);
		fill('plum');
		stroke('blue');
		strokeWeight(4);
		textAlign(CENTER, CENTER);
		text(this.combat.message, width/2, height - 100);

		/* vistualize this.combat.counter */
		noStroke();
		fill('green');
		ellipse(width - 100, height - 100, 100);
		fill('blue');
		ellipse(width - 100, height - 100, this.combat.counter);

		/* stats this.player.health this.npc.health*/
		fill('red');
		
		rectMode(CENTER);
		rect(this.player.x, this.player.y - 100, this.player.health, 10);
		rect(this.npc.x, this.npc.y - 100, this.npc.health, 10);
	}

}