export const GameEvents = {
    ButtonDown: "ButtonDown",
    ButtonUp: "ButtonUp",
    KilledPedestrian: "Killed_Pedestrian",
    OnGrave: "OnGrave",
    OffGrave: "OffGrave",
    KilledZombie: "Killed_Zombie",
	InputChange: "InputChange"
}

export interface InputChangeInfo {
	Key: string,
	IsDown: boolean,
	IsUp: boolean,
}

export interface PedestrianKillInfo {
    PedestrianId: number
}

export interface ButtonPressInfo {
    IsDown: boolean,
    Key: string,
}


