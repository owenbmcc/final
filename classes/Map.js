class Map {
	constructor(src) {
		this.sprites = { scenery: {}, characters: {}, obstacles: {} };
		this.src = src;
		this.isColliding = false;
	}

	preload() {
		var _this = this;
		fetch(this.src)
			.then(function(response) {
				return response.json();
			}).then(function(data) {
				
				var scenery = data.scenery;
				for (var key in scenery) {

					var img = loadImage(scenery[key].img);
					_this.sprites.scenery[key] = [];
					for (var i = 0; i < scenery[key].positions.length; i++) {
						var position = scenery[key].positions[i];
						_this.sprites.scenery[key].push(new Scenery(position.x, position.y, img));
					}
				}

				var obstacles = data.obstacles;
				for (var key in obstacles) {
					var obs = obstacles[key];
					var spriteSheet = loadSpriteSheet(obs.img, obs.width, obs.height, obs.frames);
					_this.sprites.obstacles[key] = [];
					for (var i = 0; i < obs.positions.length; i++) {
						_this.sprites.obstacles[key].push(new Scenery(position.x, position.y, spriteSheet));
					}
				}

				var characters = data.characters;
				for (var key in characters) {
					var character = characters[key];
					var img = loadImage(character.img);
					_this.sprites.characters[key] = new NPC(character.x, character.y, img, character.dialog);
				}
			});
	}

	setup() {
		this.x = width/2;
		this.y = height/2;
		this.speedX = 0;
		this.speedY = 0;

		for (var key in this.sprites.obstacles) {
			var list = this.sprites.obstacles[key];
			for (var i = 0; i < list.length; i++) {
				list[i].setup();
			}
		}

		for (var key in this.sprites.scenery) {
			var list = this.sprites.scenery[key];
			for (var i = 0; i < list.length; i++) {
				list[i].setup();
			}
		}


		for (var key in this.sprites.characters) {
			this.sprites.characters[key].setup();
		}

	}

	collide(other) {
		for (var key in this.sprites.obstacles) {
			var list = this.sprites.obstacles[key];
			for (var i = 0; i < list.length; i++) {
				if (other.sprite.collide(list[i].sprite)) {
					this.isColliding = true; /* *** */
				}
			}
		}
		

		

		for (var key in this.sprites.characters) {
			var character = this.sprites.characters[key];
			character.displayDialog = character.sprite.overlap(other.sprite);
		}
	}

	draw() {
		
		for (var key in this.sprites.obstacles) {
			var list = this.sprites.obstacles[key];
			for (var i = 0; i < list.length; i++) {
				list[i].display();
			}
		}

		for (var key in this.sprites.scenery) {
			var list = this.sprites.scenery[key];
			for (var i = 0; i < list.length; i++) {
				list[i].display();
			}
		}

		for (var key in this.sprites.characters) {
			this.sprites.characters[key].display();
		}
	}

	update() {
		if (!this.isColliding) {
			this.x += this.speedX;
			this.y += this.speedY;
		}

		
		for (var key in this.sprites.obstacles) {
			var list = this.sprites.obstacles[key];
			for (var i = 0; i < list.length; i++) {
				list[i].sprite.position.x = list[i].x + this.x;
				list[i].sprite.position.y = list[i].y + this.y;
			}
		}

		for (var key in this.sprites.scenery) {
			var list = this.sprites.scenery[key];
			for (var i = 0; i < list.length; i++) {
				list[i].sprite.position.x = list[i].x + this.x;
				list[i].sprite.position.y = list[i].y + this.y;
			}
		}

		for (var key in this.sprites.characters) {
			const ch = this.sprites.characters[key]
			ch.sprite.position.x = ch.x + this.x;
			ch.sprite.position.y = ch.y + this.y;
		}
	}
}