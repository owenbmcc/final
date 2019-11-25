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
					var s = scenery[key];
					var spriteSheet = loadSpriteSheet(s.img, s.width, s.height, s.frames);
					_this.sprites.scenery[key] = [];
					for (var i = 0; i < s.positions.length; i++) {
						var position = s.positions[i];
						_this.sprites.scenery[key].push(new Scenery(position.x, position.y, spriteSheet));
					}
				}

				var obstacles = data.obstacles;
				for (var key in obstacles) {
					var o = obstacles[key];
					var spriteSheet = loadSpriteSheet(o.img, o.width, o.height, o.frames);
					_this.sprites.obstacles[key] = [];
					for (var i = 0; i < o.positions.length; i++) {
						var position = o.positions[i];
						_this.sprites.obstacles[key].push(new Scenery(position.x, position.y, spriteSheet));
					}
				}

				var characters = data.characters;
				for (var key in characters) {
					var c = characters[key];
					var spriteSheet = loadSpriteSheet(c.img, c.width, c.height, c.frames);
					_this.sprites.characters[key] = new NPC(c.x, c.y, spriteSheet, c.dialog);
				}
			});
	}

	setup() {
		this.x = 0;
		this.y = 0;
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
		this.isColliding = false;
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

	move(character) {
		console.log(character.x);
		if (character.x < 0) {
			this.x += width/2;
			character.x = width/2;
		}

	}

	offset(character) {
		if (!this.isColliding) {
			this.x += this.speedX;
			this.y += this.speedY;
			
			var deltaX = character.x - character.sprite.position.x;
			if (deltaX > 2 || deltaX < -2) {
				character.sprite.position.x += deltaX > 0 ? 5/2 : -5/2;
			}
			
			var deltaY = character.y - character.sprite.position.y;
			if (deltaY > 2 || deltaY < -2) {
				character.sprite.position.y += deltaY > 0 ? 5/2 : -5/2;
			}
		}
	}

	update() {
		
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