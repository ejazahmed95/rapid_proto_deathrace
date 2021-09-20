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
    Sound: "SOUND"
}

export const Images = {
    Player: "car",
    Grave: "cross",
    Zombie: "car",
    Square: "placeholder_square",
    Cross: "cross",
    Button: "button",
    Frame: "frame",
    Background: "background"
}

export const Spritesheets = {
    GraveSpawn: {
        "name": "grave_spawn",
        "frameWidth": 32,
        "frameHeight": 32,
        "framesNum": 10,
        "frameRate": 5,
        "repeat": false
    },
    ZombieIdle: {
        "name": "zombie_idle",
        "frameWidth": 32,
        "frameHeight": 32,
        "framesNum": 3,
        "frameRate": 3,
        "repeat": false
    },
    PedRun: {
        "name": "ped_run",
        "frameWidth": 48,
        "frameHeight": 48,
        "framesNum": 8,
        "frameRate": 4,
        "repeat": false
    },
    PedStand: {
        "name": "ped_stand",
        "frameWidth": 48,
        "frameHeight": 48,
        "framesNum": 8,
        "frameRate": 4,
        "repeat": false
    },
    PedDead: {
        "name": "ped_dead",
        "frameWidth": 48,
        "frameHeight": 48,
        "framesNum": 6,
        "frameRate": 3,
        "repeat": false
    },
    PlayerIdle: {
        "name": "player_idle",
        "frameWidth": 64,
        "frameHeight": 64,
        "framesNum": 6,
        "frameRate": 3,
        "repeat": false
    },
    PlayerMove: {
        "name": "player_move",
        "frameWidth": 64,
        "frameHeight": 64,
        "framesNum": 8,
        "frameRate": 6,
        "repeat": false
    }
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
                "y": 400,
                "speed": 4,
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
                "x": 200,
                "y": 200,
                "speed": 6,
                "scale": 1.0
            }
        ]
    }
}

