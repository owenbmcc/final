class Combat {
	constructor(player, npc, npcName, timeout) {
		this.state = 'turn'; // states turn, message, win, lose
		this.turn = 'player';
		this.timeout = timeout;
		this.counter = timeout;
		this.message = 'Choose an attack.';

		this.player = player;
		this.player.isPlayer = true;
		this.player.attacks = [];
		
		this.npc = npc;
		this.npc.name = npcName;
		this.npc.isPlayer = false;
		this.npc.attacks = [];

		this.metrics = {};
	}

	addMetric(label, value, min, callback) {
		this.player[label] = value;
		this.npc[label] = value;

		this.metrics[label] = {
			min: min,
			callback: callback
		};
	}

	addPlayerAttack(spriteSheet, metric, probability, delta) {
		const sprite = createSprite(this.player.x, this.player.y + this.player.attacks.length * 100 + 100, 50, 50);
		sprite.addAnimation('default', spriteSheet);

		this.player.attacks.push({ sprite: sprite });

		sprite.onMousePressed = function() {
			this.attack(this.npc, metric, probability, delta);
		}.bind(this);
	}

	addNPCAttack(metric, probability, delta) {
		this.npc.attacks.push({
			metric: metric,
			probability: probability,
			delta: delta
		});

	}

	attack(character, metric, probability, delta) {
		if (random(1) < probability) {
			character[metric] += delta;
			this.message = character.isPlayer ? 
				`You were hit by ${this.npc.name}.` :
				`You damaged ${this.npc.name}.`;
		} else {
			this.message = character.isPlayer ? 
				`${this.npc.name} missed you.` :
				`You missed ${this.npc.name}.`; 
		}

		this.state = 'message';
		this.turn = character.isPlayer ? 'player' : 'npc';
		this.counter = this.timeout;

		if (character[metric] <= this.metrics[metric].min) {
			this.metrics[metric].callback(character.isPlayer, this);
		}
	}

	display() {
		camera.off();
		this.player.display();
		this.npc.display();
		if (this.turn == 'player' && this.state == 'turn') {
			for (let i = 0; i < this.player.attacks.length; i++) {
				this.player.attacks[i].sprite.display();
			}
		}
	}

	update() {
		if (this.state == 'message') {
			this.counter--;
			if (this.counter <= 0) {
				if (this.turn == 'player') {
					this.message = this.message = 'It is your turn.';
					this.counter = this.timeout;
				} else {
					this.message = this.npc.name + "'s turn.";
					this.counter = this.timeout;
				}
				this.state = 'turn';
			}
		} else if (this.state == 'turn') {
			if (this.turn == 'npc') {
				this.counter--;
				if (this.counter <= 0) {
					const attack = random(this.npc.attacks);
					this.attack(this.player, attack.metric, attack.probability, attack.delta);
				}
			}
		} else if (this.state == 'win') {
			this.counter--;
			if (this.counter <= 0) this.onWin();
		} else if (this.state == 'lose') {
			this.counter--;
			if (this.counter <= 0) this.onLose();
		}
	}
}