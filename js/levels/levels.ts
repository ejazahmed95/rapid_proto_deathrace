import {LevelConfig} from "../types/types";

const Level1Config: LevelConfig = {
	Player: {
		"x": 200,
		"y": 300,
		"speed": 15,
		"angleSpeed": 10
	},
	Zombies: [
		{
			"x": 300,
			"y": 400,
			"speed": 4,
		},
		{
			"x": 350,
			"y": 400,
			"speed": 4,
		},
	],
	Graves: [
		{
			"x": 400,
			"y": 400
		},
		{
			"x": 300,
			"y": 320
		},
	],
	Pedestrians: [
		{
			"x": 200,
			"y": 200,
			"speed": 6,
		},
		{
			"x": 400,
			"y": 200,
			"speed": 6,
		},
		{
			"x": 500,
			"y": 320,
			"speed": 6,
		}
	],
	Eggs: [
		{
			"x": 200,
			"y": 150
		}
	]
}

const Level2Config: LevelConfig = {
	Player: {
		"x": 200,
		"y": 300,
		"speed": 15,
		"angleSpeed": 10
	},
	Zombies: [
		{
			"x": 300,
			"y": 400,
			"speed": 8,
		},
		{
			"x": 350,
			"y": 300,
			"speed": 4,
		},
		{
			"x": 350,
			"y": 100,
			"speed": 4,
		},
		{
			"x": 350,
			"y": 150,
			"speed": 4,
		}
	],
	Graves: [
		{
			"x": 420,
			"y": 280
		},
		{
			"x": 300,
			"y": 320
		},
		{
			"x": 200,
			"y": 150
		},
		{
			"x": 180,
			"y": 100
		}
	],
	Pedestrians: [
		{
			"x": 200,
			"y": 200,
			"speed": 6,
		},
		{
			"x": 400,
			"y": 200,
			"speed": 6,
		},
		{
			"x": 500,
			"y": 320,
			"speed": 6,
		}
	],
	Eggs: []
}

const Level3Config: LevelConfig = {
	Player: {
		"x": 200,
		"y": 300,
		"speed": 20,
		"angleSpeed": 20
	},
	Zombies: [
		{
			"x": 300,
			"y": 400,
			"speed": 20,
		},
		{
			"x": 350,
			"y": 400,
			"speed": 20,
		},
	],
	Graves: [
		{
			"x": 400,
			"y": 400
		}
	],
	Pedestrians: [
		{
			"x": 100,
			"y": 100,
			speed: 10,
		}
	],
	Eggs: []
}
const Level4Config: LevelConfig = {
	Player: {
		"x": 200,
		"y": 300,
		"speed": 20,
		"angleSpeed": 20
	},
	Zombies: [
		{
			"x": 300,
			"y": 400,
			"speed": 20,
		},
		{
			"x": 350,
			"y": 400,
			"speed": 20,
		},
	],
	Graves: [
		{
			"x": 400,
			"y": 400
		}
	],
	Pedestrians: [
		{
			"x": 100,
			"y": 100,
			speed: 10,
		}
	],
	Eggs: []
}

const Level5Config: LevelConfig = {
	Player: {
		"x": 200,
		"y": 300,
		"speed": 20,
		"angleSpeed": 20
	},
	Zombies: [
		{
			"x": 300,
			"y": 400,
			"speed": 20,
		},
		{
			"x": 350,
			"y": 400,
			"speed": 20,
		},
	],
	Graves: [
		{
			"x": 400,
			"y": 400
		}
	],
	Pedestrians: [
		{
			"x": 100,
			"y": 100,
			speed: 10,
		}
	],
	Eggs: []
}

export default [
	Level1Config,
	Level2Config,
	Level3Config,
	Level4Config,
	Level5Config
]
