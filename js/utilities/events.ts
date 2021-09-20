export const GameEvents = {
    ButtonDown: "ButtonDown",
    ButtonUp: "ButtonUp",
    KilledPedestrian: "Killed_Pedestrian",
    OnGrave: "OnGrave",
    OffGrave: "OffGrave",
    KilledZombie: "Killed_Zombie",
    PedestrianPosUpdate: "PedestrianPosUpdate",
    PedestrianConverted: "PedestrianConverted",
	InputChange: "InputChange",
}

export interface InputChangeInfo {
	Key: string,
	IsDown: boolean,
	IsUp: boolean,
}

export interface PedestrianKillInfo {
    PedestrianId: number,
    PositionX: number,
    PositionY: number
}

export interface ZombieKillInfo {
    ZombieId: number
}

export interface ButtonPressInfo {
    IsDown: boolean,
    Key: string,
}

export interface PedestrianPositionInfo {
    X: number,
    Y: number,
    ID: number
}
