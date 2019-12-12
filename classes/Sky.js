class Sky {
	constructor(src) {
		this.sprites = {
			scenery: {},
			characters: {},
			obstacles: {}
		};
	}

	preload(src) {
		var _this = this;
		fetch(src)
			.then(function (response) {
				return response.json();
			}).then(function (data) {

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


			});
	}

	setup() {
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
    

	display() {

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

	
	addSprite(label, sprite, type) {
		this.sprites[type][label] = [];
		this.sprites[type][label].push(sprite);
	}

}