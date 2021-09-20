export const Scenes = {
    MENU: "MENU",
    GAMEPLAY: "GAMEPLAY",
    GAME_OVER: "GAME_OVER",
    CONTROLS: "CONTROLS",
}

export const Tags = {
    Menu: "MENU",
    Infra: "INFRA",
    Asset: "ASSET",
    Controls: "CONTROLS",
    Sound: "SOUND",
    Input: "INPUT",
}

export const Images = {
    Player: "car",
    Grave: "cross",
    Zombie: "car",
    Square: "placeholder_square",
    Cross: "cross",
    Button: "button",
    Frame: "frame",
}

export const Spritesheets = {
    Pedestrian: {
        "name": "pedestrian",
        "frameWidth": 32,
        "frameHeight": 32,
        "framesNum": 2,
        "repeat": true
    },
    GraveSpawn: {
        "name": "grave_spawn",
        "frameWidth": 32,
        "frameHeight": 32,
        "framesNum": 10,
        "frameRate": 5,
        "repeat": false
    },
	Zombie: {
		"name": "pedestrian",
		"frameWidth": 32,
		"frameHeight": 32,
		"framesNum": 2,
		"repeat": true
	},
}

export const Audio = {
    BgMusic: "BgMusic",
}


export const ObjTags = {
    Player: 0,
    Zombie: 1,
    Pedestrian: 2,
    Grave: 3
}

export const Keys = {
    Left: 'A', // Rotate left
    Right: 'D', // Rotate right
    Up: 'W', // Move Forward
    Down: 'S', // Move backwards
    Reset: 'R', // debug
    Action: 'SPACE',
}

export const LevelConfig = {
    Level1: {
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
                "y": 100
            }
        ]
    }
}

