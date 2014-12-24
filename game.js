window.onload = function() {
	// ==========================
	// Variables

	// Core
	var game = new Phaser.Game(640, 480, Phaser.AUTO, '', { create: create, preload: preload, update: update });

	// Menu
	var menu;
	var rules;
	var btnPlay;
	var btnMusic;
	var btnHelp;
	var btnBack;
	var music;

	// Game
	var level;
	var inGame;
	var map;
	var background;
	var btnReset;
	var lblLevel;
	var actors;
	var player;
	var robotA;
	var robotB;
	var robotC;
	var robotD;
	var robotE;
	var lvls = [
		[ [4, 4], [4, 0], [2, 1], [1, 2], [3, 3] ],
		[ [1, 4], [2, 0], [4, 1], [1, 2], [3, 3] ],
		[ [4, 4], [3, 0], [1, 1], [3, 3], [1, 4] ],
		[ [1, 4], [0, 0], [4, 0], [3, 1], [2, 3] ],
		[ [1, 4], [3, 0], [1, 1], [3, 4] ],

		[ [2, 0], [0, 0], [4, 3], [1, 4] ],
		[ [1, 4], [2, 0], [0, 1], [3, 2], [3, 4] ],
		[ [3, 3], [0, 0], [3, 0], [1, 1], [0, 4] ],
		[ [2, 0], [4, 0], [2, 2], [1, 3], [3, 4] ],
		[ [4, 4], [1, 1], [4, 2], [0, 4], [2, 4] ],


		[ [2, 1], [2, 0], [0, 1], [4, 1], [2, 2], [2, 3] ],
		[ [4, 4], [1, 0], [4, 1], [1, 4] ],
		[ [3, 3], [1, 0], [3, 1], [0, 3], [2, 4] ],
		[ [1, 4], [2, 0], [4, 1], [0, 2], [3, 3], [0, 4] ],
		[ [4, 4], [4, 0], [1, 1], [4, 2], [2, 3] ],

		[ [2, 0], [0, 0], [1, 2], [4, 2], [1, 4] ],
		[ [1, 4], [2, 0], [4, 0], [1, 2], [3, 3] ],
		[ [2, 0], [0, 4], [2, 4], [4, 4] ],
		[ [4, 4], [1, 0], [2, 1], [3, 2], [0, 3], [2, 4] ],
		[ [3, 3], [1, 0], [4, 1], [0, 2], [1, 4] ],


		[ [2, 0], [2, 1], [2, 2], [4, 2], [0, 3], [3, 4] ],
		[ [4, 4], [0, 1], [4, 1], [3, 3], [0, 4] ],
		[ [1, 4], [1, 0], [0, 1], [3, 1], [4, 3] ],
		[ [0, 4], [3, 1], [1, 2], [3, 4], [4, 4] ],
		[ [1, 4], [0, 1], [2, 1], [3, 1], [4, 4] ],

		[ [2, 0], [0, 0], [4, 1], [0, 2], [3, 3] ],
		[ [4, 4], [1, 0], [4, 0], [0, 2], [3, 2], [0, 4] ],
		[ [4, 4], [1, 0], [4, 0], [4, 2], [0, 3] ],
		[ [2, 0], [0, 0], [4, 0], [0, 4], [4, 4] ],
		[ [2, 0], [0, 1], [4, 1], [0, 2], [1, 4], [3, 4] ],


		[ [3, 3], [0, 0], [2, 0], [4, 1], [0, 2], [1, 4] ],
		[ [1, 4], [1, 0], [4, 1], [0, 4], [2, 4] ],
		[ [4, 4], [0, 0], [1, 0], [4, 1], [0, 3], [3, 4] ],
		[ [4, 4], [2, 0], [4, 0], [0, 2], [3, 3], [0, 4] ],
		[ [2, 0], [0, 0], [4, 0], [2, 1], [0, 4], [4, 4] ],

		[ [2, 0], [0, 1], [4, 1], [0, 3], [4, 3], [2, 4] ],
		[ [3, 3], [0, 0], [3, 0], [4, 0], [0, 3] ],
		[ [1, 4], [2, 0], [4, 0], [0, 2], [1, 2], [4, 4] ],
		[ [4, 4], [0, 0], [2, 0], [4, 0], [0, 2], [0, 4] ],
		[ [1, 4], [0, 0], [2, 0], [4, 0], [4, 3] ]
	];

	// ==========================
	// Phaser functions

	function preload() {
		game.load.audio('music', ['assets/snd/music.ogg']);
		game.load.image('background', 'assets/img/background.png');
		game.load.image('menu', 'assets/img/menu.png');
		game.load.image('rules', 'assets/img/rules.png');
		game.load.spritesheet('btnplay', 'assets/img/btn_play.png', 128, 128);
		game.load.spritesheet('btnmusic', 'assets/img/btn_music.png', 128, 128);
		game.load.spritesheet('btnhelp', 'assets/img/btn_help.png', 128, 128);
		game.load.spritesheet('btnback', 'assets/img/btn_back.png', 128, 128);
		game.load.spritesheet('btnreset', 'assets/img/btn_reset.png', 128, 128);
		game.load.image('map', 'assets/img/map.png');
		game.load.image('p', 'assets/img/p.png');
		game.load.image('a', 'assets/img/a.png');
		game.load.image('b', 'assets/img/b.png');
		game.load.image('c', 'assets/img/c.png');
		game.load.image('d', 'assets/img/d.png');
		game.load.image('e', 'assets/img/e.png');
	}

	function create() {
		music = game.add.audio('music', 1, true);
		if (getCookie('music') !== 'false') {
			music.play('', 0, 1, true);
		}

		game.stage.backgroundColor = '#ffffff';
		generateGUI();
		inGame = false;
		game.physics.startSystem(Phaser.Physics.ARCADE);

		if (getCookie('level') === '') {
			setCookie('level', '0', 365);
		}

		level = parseInt(getCookie('level'));
	}

	// ==========================
	// Game Logic

	var movingActor = null;
	var isMoving = false;
	var isTouched = false;
	var touchPos = { x: -1, y: -1 };
	var goalReached = false;

	function update() {
		if (inGame && !goalReached) {
			actors.forEach(function(actor) {
				if (!actor.inWorld) {
					resetBoard();
				}
			});

			checkGoalReached();

			game.physics.arcade.collide(actors);

			isMoving = false;
			actors.forEach(function(actor) {
				isMoving = isMoving || (actor.body.velocity.x !== 0) || (actor.body.velocity.y !== 0);
			});

			if (!isMoving && !isTouched) {
				movingActor = null;
				actors.forEach(function(actor) {
					actor.body.immovable = true;
				});
			}

			if (game.input.activePointer.isUp) {
				isTouched = false;
			}

			actors.forEach(function(actor) {
				if (game.input.activePointer.isDown && actor.body.hitTest(game.input.activePointer.x, game.input.activePointer.y)) {
					isTouched = true;
					touchPos.x = game.input.activePointer.x;
					touchPos.y = game.input.activePointer.y;
					movingActor = actor;
				}
			});

			if (isTouched && !isMoving) {
				if (game.input.activePointer.x > touchPos.x + 20) {
					isMoving = true;
					movingActor.body.immovable = false;
					movingActor.body.velocity.x = 150;
				} else if (game.input.activePointer.x < touchPos.x - 20) {
					isMoving = true;
					movingActor.body.immovable = false;
					movingActor.body.velocity.x = -150;
				} else if (game.input.activePointer.y > touchPos.y + 20) {
					isMoving = true;
					movingActor.body.immovable = false;
					movingActor.body.velocity.y = 150;
				} else if (game.input.activePointer.y < touchPos.y - 20) {
					isMoving = true;
					movingActor.body.immovable = false;
					movingActor.body.velocity.y = -150;
				}
			}

			updateShadows();
		}
	}

	function checkGoalReached() {
		if (player.x === 320 && player.y === 200 && player.body.velocity.x === 0 && player.body.velocity.y === 0) {
			nextLevel();
		}
	}

	function nextLevel() {
		if (level === 39) {
			level = 0;
			setCookie('level', level.toString(), 365);
			onBackGameClicked();
		} else {
			destroyBoard();
			level++;
			setCookie('level', level.toString(), 365);
			lblLevel.setText("Level: " + (level + 1));
			generateBoard();
		}
	}

	function onPlayClicked() {
		destroyGUI();
		generateGame();
		inGame = true;
	}

	function onBackGameClicked() {
		inGame = false;
		destroyGame();
		generateGUI();
	}

	function onHelpClicked() {
		menu.visible = false;
		btnPlay.visible = false;
		btnMusic.visible = false;
		btnHelp.visible = false;
		rules.visible = true;
		btnBack.visible = true;
	}

	function onBackHelpClicked() {
		menu.visible = true;
		btnPlay.visible = true;
		btnMusic.visible = true;
		btnHelp.visible = true;
		rules.visible = false;
		btnBack.visible = false;
	}

	function onMusicClicked() {
		if (music.isPlaying) {
			music.stop();
			setCookie('music', 'false', 365);
		} else {
			music.play('', 0, 1, true);
			setCookie('music', 'true', 365);
		}
	}

	// ==========================
	// Screens System

	function generateGUI() {
		menu = game.add.sprite(0, 0, 'menu');
		rules = game.add.sprite(0, 0, 'rules');
		rules.visible = false;
		btnPlay = game.add.button(game.world.centerX / 2, game.world.height * 3 / 4, 'btnplay', onPlayClicked, this, 0, 0, 1, 0);
		btnPlay.anchor.x = 0.5;
		btnPlay.anchor.y = 0.5;
		btnMusic = game.add.button(game.world.centerX, game.world.height * 3 / 4, 'btnmusic', onMusicClicked, this, 0, 0, 1, 0);
		btnMusic.anchor.x = 0.5;
		btnMusic.anchor.y = 0.5;
		btnHelp = game.add.button(game.world.width * 3 / 4, game.world.height * 3 / 4, 'btnhelp', onHelpClicked, this, 0, 0, 1, 0);
		btnHelp.anchor.x = 0.5;
		btnHelp.anchor.y = 0.5;
		btnBack = game.add.button(6, 6, 'btnback', onBackHelpClicked, this, 0, 0, 1, 0);
		btnBack.visible = false;
	}

	function destroyGUI() {
		menu.visible = false;
		rules.visible = false;
		btnPlay.visible = false;
		btnMusic.visible = false;
		btnHelp.visible = false;
		btnBack.visible = false;
	}

	function generateGame() {
		background = game.add.sprite(0, 0, 'background');
		map = game.add.sprite(160, 40, 'map');
		btnBack = game.add.button(game.world.width / 8, game.world.height / 4, 'btnback', onBackGameClicked, this, 0, 0, 1, 0);
		btnBack.anchor.y = 0.5;
		btnBack.anchor.x = 0.5;
		btnReset = game.add.button(game.world.width / 8, game.world.height / 2, 'btnreset', resetBoard, this, 0, 0, 1, 0);
		btnReset.anchor.y = 0.5;
		btnReset.anchor.x = 0.5;
		lblLevel = game.add.text(game.world.width / 8, game.world.height * 3 / 4, "Level: " + (level + 1));
		lblLevel.anchor.y = 0.5;
		lblLevel.anchor.x = 0.5;
		lblLevel.font = 'Verdana';
		lblLevel.fontSize = 20;
		lblLevel.align = 'center';
		lblLevel.fill = '#eeeeee';
		lblLevel.stroke = '#222222';
		lblLevel.strokeThickness = 5;

		generateBoard();
	}

	function destroyGame() {
		background.visible = false;
		map.visible = false;
		btnBack.visible = false;
		btnReset.visible = false;
		lblLevel.visible = false;
		destroyBoard();
	}

	function generateBoard() {
		var numRobots = lvls[level].length;
		actors = game.add.group();

		if (numRobots >= 1) {
			player = actors.create(lvls[level][0][0] * 80 + 160, lvls[level][0][1] * 80 + 40, 'p');
			game.physics.arcade.enable(player);
			player.inputEnabled = true;
			player.body.immovable = true;
			player.body.collideWorldBounds = false;
		}

		if (numRobots >= 2) {
			robotA = actors.create(lvls[level][1][0] * 80 + 160, lvls[level][1][1] * 80 + 40, 'a');
			game.physics.arcade.enable(robotA);
			robotA.inputEnabled = true;
			robotA.body.immovable = true;
			robotA.body.collideWorldBounds = false;
		}

		if (numRobots >= 3) {
			robotB = actors.create(lvls[level][2][0] * 80 + 160, lvls[level][2][1] * 80 + 40, 'b');
			game.physics.arcade.enable(robotB);
			robotB.inputEnabled = true;
			robotB.body.immovable = true;
			robotB.body.collideWorldBounds = false;
		}

		if (numRobots >= 4) {
			robotC = actors.create(lvls[level][3][0] * 80 + 160, lvls[level][3][1] * 80 + 40, 'c');
			game.physics.arcade.enable(robotC);
			robotC.inputEnabled = true;
			robotC.body.immovable = true;
			robotC.body.collideWorldBounds = false;
		}

		if (numRobots >= 5) {
			robotD = actors.create(lvls[level][4][0] * 80 + 160, lvls[level][4][1] * 80 + 40, 'd');
			game.physics.arcade.enable(robotD);
			robotD.inputEnabled = true;
			robotD.body.immovable = true;
			robotD.body.collideWorldBounds = false;
		}

		if (numRobots >= 6) {
			robotE = actors.create(lvls[level][5][0] * 80 + 160, lvls[level][5][1] * 80 + 40, 'e');
			game.physics.arcade.enable(robotE);
			robotE.inputEnabled = true;
			robotE.body.immovable = true;
			robotE.body.collideWorldBounds = false;
		}

		createShadows();
	}

	function destroyBoard() {
		destroyShadows();
		actors.setAll('visible', false);
	}

	function resetBoard() {
		destroyBoard();
		generateBoard();
	}

	// ==========================
	// Memory Card

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');

		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ')
				c = c.substring(1);
			if (c.indexOf(name) != -1)
				return c.substring(name.length, c.length);
		}

		return "";
	}

	// ===================================
	// | /                             \ |
	// ||          Shadows !!!          ||
	// | \                             / |
	// ===================================

	var light;
	var bitmap;
	var lightBitmap;

	function createShadows() {
		light = new Phaser.Point(360, 240);

		bitmap = game.add.bitmapData(game.width, game.height);
		bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		bitmap.context.strokeStyle = 'rgb(255, 255, 255)';

		lightBitmap = game.add.image(0, 0, bitmap);
		lightBitmap.blendMode = Phaser.blendModes.MULTIPLY;
	}

	function destroyShadows() {
		lightBitmap.visible = false;
	}

	function updateShadows() {
		bitmap.context.fillStyle = 'rgb(225, 225, 225)';
		bitmap.context.fillRect(0, 0, game.width, game.height);

		var points = [];
		var ray = null;
		var intersect;
		var i;
		var stageCorners = [
			new Phaser.Point(0, 0),
			new Phaser.Point(game.width, 0),
			new Phaser.Point(game.width, game.height),
			new Phaser.Point(0, game.height)
		];


		actors.forEach(function(actor) {
			var corners = [
				new Phaser.Point(actor.x + 0.1, actor.y + 0.1),
				new Phaser.Point(actor.x - 0.1, actor.y - 0.1),
				new Phaser.Point(actor.x - 0.1 + actor.width, actor.y + 0.1),
				new Phaser.Point(actor.x + 0.1 + actor.width, actor.y - 0.1),
				new Phaser.Point(actor.x - 0.1 + actor.width, actor.y - 0.1 + actor.height),
				new Phaser.Point(actor.x + 0.1 + actor.width, actor.y + 0.1 + actor.height),
				new Phaser.Point(actor.x + 0.1, actor.y - 0.1 + actor.height),
				new Phaser.Point(actor.x - 0.1, actor.y + 0.1 + actor.height)
			];

			for(i = 0; i < corners.length; i++) {
				var c = corners[i];
				var slope = (c.y - light.y) / (c.x - light.x);
				var b = light.y - slope * light.x;
				var end = null;

				if (c.x === light.x) {
					if (c.y <= light.y) {
						end = new Phaser.Point(light.x, 0);
					} else {
						end = new Phaser.Point(light.x, game.height);
					}
				} else if (c.y === light.y) {
					if (c.x <= light.x) {
						end = new Phaser.Point(0, light.y);
					} else {
						end = new Phaser.Point(game.width, light.y);
					}
				} else {
					var left = new Phaser.Point(0, b);
					var right = new Phaser.Point(game.width, slope * game.width + b);
					var top = new Phaser.Point(-b / slope, 0);
					var bottom = new Phaser.Point((game.height - b) / slope, game.height);

					if (c.y <= light.y && c.x >= light.x) {
						if (top.x >= 0 && top.x <= game.width) {
							end = top;
						} else {
							end = right;
						}
					} else if (c.y <= light.y && c.x <= light.x) {
						if (top.x >= 0 && top.x <= game.width) {
							end = top;
						} else {
							end = left;
						}
					} else if (c.y >= light.y && c.x >= light.x) {
						if (bottom.x >= 0 && bottom.x <= game.width) {
							end = bottom;
						} else {
							end = right;
						}
					} else if (c.y >= light.y && c.x <= light.x) {
						if (bottom.x >= 0 && bottom.x <= game.width) {
							end = bottom;
						} else {
							end = left;
						}
					}
				}

				ray = new Phaser.Line(light.x, light.y, end.x, end.y);
				intersect = getWallIntersection(ray);

				if (intersect) {
					points.push(intersect);
				} else {
					points.push(ray.end);
				}
			}
		}, this);

		for(i = 0; i < stageCorners.length; i++) {
			ray = new Phaser.Line(light.x, light.y, stageCorners[i].x, stageCorners[i].y);
			intersect = getWallIntersection(ray);

			if (!intersect) {
				points.push(stageCorners[i]);
			}
		}

		var center = { x: light.x, y: light.y };

		points = points.sort(function(a, b) {
			if (a.x - center.x >= 0 && b.x - center.x < 0)
				return 1;

			if (a.x - center.x < 0 && b.x - center.x >= 0)
				return -1;

			if (a.x - center.x === 0 && b.x - center.x === 0) {
				if (a.y - center.y >= 0 || b.y - center.y >= 0)
					return 1;

				return -1;
			}

			var det = (a.x - center.x) * (b.y - center.y) - (b.x - center.x) * (a.y - center.y);

			if (det < 0)
				return 1;

			if (det > 0)
				return -1;

			var d1 = (a.x - center.x) * (a.x - center.x) + (a.y - center.y) * (a.y - center.y);
			var d2 = (b.x - center.x) * (b.x - center.x) + (b.y - center.y) * (b.y - center.y);

			return 1;
		});

		bitmap.context.beginPath();
		bitmap.context.fillStyle = 'rgb(255, 255, 255)';
		bitmap.context.moveTo(points[0].x, points[0].y);

		for(var j = 0; j < points.length; j++) {
			bitmap.context.lineTo(points[j].x, points[j].y);
		}

		bitmap.context.closePath();
		bitmap.context.fill();
		bitmap.dirty = true;
	}

	function getWallIntersection(ray) {
		var distanceToWall = Number.POSITIVE_INFINITY;
		var closestIntersection = null;

		actors.forEach(function(actor) {
			var lines = [
				new Phaser.Line(actor.x, actor.y, actor.x + actor.width, actor.y),
				new Phaser.Line(actor.x, actor.y, actor.x, actor.y + actor.height),
				new Phaser.Line(actor.x + actor.width, actor.y, actor.x + actor.width, actor.y + actor.height),
				new Phaser.Line(actor.x, actor.y + actor.height, actor.x + actor.width, actor.y + actor.height)
			];

			for(var i = 0; i < lines.length; i++) {
				var intersect = Phaser.Line.intersects(ray, lines[i]);

				if (intersect) {
					distance = game.math.distance(ray.start.x, ray.start.y, intersect.x, intersect.y);

					if (distance < distanceToWall) {
						distanceToWall = distance;
						closestIntersection = intersect;
					}
				}
			}
		}, this);

		return closestIntersection;
	}
};
