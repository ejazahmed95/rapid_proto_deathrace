export const GameEvents = {
    ButtonDown: "ButtonDown",
    ButtonUp: "ButtonUp",
    KilledPedestrian: "Killed_Pedestrian",
    OnGrave: "OnGrave",
    OffGrave: "OffGrave",
    KilledZombie: "Killed_Zombie",
}

export interface PedestrianKillInfo {
    PedestrianId: number
}

export interface ButtonPressInfo {
    IsDown: boolean,
    Key: string,
}


