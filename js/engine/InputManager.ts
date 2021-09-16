import {Keys} from '../const'

export default class InputManager {
    constructor(scene: Phaser.Scene){
        //@ts-ignore
        this.keys = scene.input.keyboard.addKeys('W,S,A,D,R');
        this.input = new Set();
    }

    update(deltaTime: number)
    {
        this.input.clear();
        if(this.keys.A.isDown)
            this.input.add(Keys.Left);
        if(this.keys.D.isDown)
            this.input.add(Keys.Right);
        if(this.keys.W.isDown)
            this.input.add(Keys.Up);
        if(this.keys.S.isDown)
            this.input.add(Keys.Down);
        if(this.keys.R.isDown)
            this.input.add(Keys.Reset);
    }

    getInput(){
        return this.input;
    }
}