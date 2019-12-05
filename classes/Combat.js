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

	addPlayerAttack(spriteSheet, metric, probability, delta, successMsg, failMsg) {
		const sprite = createSprite(this.player.x, this.player.y + this.player.attacks.length * 100 + 100, 50, 50);
		sprite.addAnimation('default', spriteSheet);

		this.player.attacks.push({ sprite: sprite });

		sprite.onMousePressed = function() {
			this.attack(this.npc, {
				metric: metric, 
				probability: probability, 
				delta: delta, 
				successMsg: successMsg, 
				failMsg: failMsg
			});
		}.bind(this);
	}

	addNPCAttack(metric, probability, delta, successMsg, failMsg) {
		this.npc.attacks.push({
			metric: metric,
			probability: probability,
			delta: delta,
			successMsg: successMsg,
			failMsg: failMsg 
		});

	}

	attack(character, attack) {
		if (random(1) < attack.probability) {
			character[attack.metric] += attack.delta;
			this.message = attack.successMsg || "Success!";
		} else {
			this.message = attack.failMsg || "Failed.";
		}

		this.state = 'message';
		this.turn = character.isPlayer ? 'player' : 'npc';
		this.counter = this.timeout;

		if (character[attack.metric] <= this.metrics[attack.metric].min) {
			this.metrics[attack.metric].callback(character.isPlayer, this);
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
					this.attack(this.player, random(this.npc.attacks));
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