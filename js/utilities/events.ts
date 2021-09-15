export const GameEvents = {
  ButtonDown: "ButtonDown",
  ButtonUp: "ButtonUp",
  KilledPedestrian: "Killed_Pedestrian",
  OnGrave: "OnGrave",
  OffGrave: "OffGrave"
}

export interface PedestrianKillInfo {
  PedestrianId: number
}

export interface ButtonPressInfo {
  IsDown: boolean,
  Key: string,
}


