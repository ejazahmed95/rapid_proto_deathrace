import {Scenes, Tags} from "../const";
import Score from "../ui/Score";
import BlinkingText from "../ui/BlinkingText";
import Timer from "../ui/Timer";
import TextStyle = Phaser.GameObjects.TextStyle;
import EventManager from "../utilities/EventManager";
import DI from "../utilities/DI";
import GameInfra from "../utilities/GameInfra";
import Logger from "../utilities/logger";
import {GameEvents, ZombieKillInfo} from "../utilities/events";

export default class HUDScene extends Phaser.Scene {
	private score!: Score;
	private timer!: Timer;
	private levelText!: Phaser.GameObjects.Text;
	private centerText!: BlinkingText;
	private highScores!: Phaser.GameObjects.Text;

	private eventManager: EventManager;
	private gameInfra: GameInfra;
	constructor() {
		super({
			key: Scenes.HUD,
		});
		// this.scene.bringToTop();
		this.eventManager = DI.Get("EventManager") as EventManager;
		this.gameInfra = DI.Get("GameInfra") as GameInfra;

		this.eventManager.addHandler(GameEvents.KilledZombie, this.OnZombieKilled.bind(this));
		this.eventManager.addHandler(GameEvents.KilledPedestrian, this.OnPedestrianKilled.bind(this));
	}

	init() {

	}

	preload() {
		this.load.json('hs', "./assets/highscores.json");
	}

	create() {
		Logger.i("HUD created", Tags.HUD);
		let layout = this.gameInfra.layout;
		this.score = new Score(this, layout.Border*2, layout.Border*2, `Score: 0`, {fontFamily: "arcade-basic", fontSize: `32px`} as TextStyle);
		this.score.setOrigin(0,0);

		// this.add.text(layout.Border*2, layout.Border*2, "0", {fontFamily: "arcade-basic", fontSize: `32px`});

		this.timer = new Timer(this, layout.TotalWidth - layout.Border*2, layout.Border*2, "30", {fontFamily: "arcade-basic", fontSize: `32px`} as TextStyle);
		this.levelText = this.add.text(layout.TotalWidth/2, layout.Border*2, "Level 1", {fontFamily: "arcade-basic", fontSize: `32px`} as TextStyle);
		// this.timer.setOrigin(this.timer.displayWidth, 0);

		let hs = this.cache.json.get("hs");
		console.log(JSON.stringify(hs));
		// hs.Scores.push({
		// 	Name: "Ejaz",
		// 	Score: 25,
		// })
		// console.log(JSON.stringify(hs));
		// this.cache.json.add("hs", hs);
	}


	update(time: number, delta: number) {
		super.update(time, delta);
		// this.centerText.updateText();
	}

	private OnZombieKilled(info: ZombieKillInfo) {
		this.score.add(100);
	}

	private OnPedestrianKilled() {

	}
}
