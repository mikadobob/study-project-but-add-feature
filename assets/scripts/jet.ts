// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    jet_bullet: cc.Prefab = null;

    @property
    moveSpeed: number = 0;

    @property
    fireRate: number = 5;

    @property(cc.AudioClip)
    fireSound: cc.AudioClip = null;

    @property(cc.Label)
    fireRateLabel: cc.Label = null;

    private isFire: boolean = false;
    private fire: boolean = false;
    private accLeft: boolean = false;
    private accRight: boolean = false;


    onLoad() {

        this.accLeft = false;
        this.accRight = false;
        this.node.x = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    shootBullets() {
        var bullet = cc.instantiate(this.jet_bullet);
        bullet.setPosition(this.node.position.x, this.node.position.y);
        this.node.parent.addChild(bullet);
        cc.audioEngine.playEffect(this.fireSound, false);
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.accLeft = true;
                break;
            case cc.macro.KEY.right:
                this.accRight = true;
                break;
            case cc.macro.KEY.space:
                this.fire = true;
                break;
            case cc.macro.KEY.z:
                this.fireRate += 1;
                break;
            case cc.macro.KEY.x:
                this.fireRate -= 1;
                break;
        }
    }


    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
            case cc.macro.KEY.space:
                this.fire = false;
                break;
        }
    }



    update(dt) {
        this.fireRateLabel.string = "Rate of Fire: " + this.fireRate.toString();
        if (this.accLeft) {
            this.node.x -= this.moveSpeed;
        } else if (this.accRight) {
            this.node.x += this.moveSpeed;
        }

        if (this.fire) {
            this.schedule(this.shootBullets, 1 / this.fireRate, 0, 0);
        }
        // if (this.isFire != this.fire) {
        //     if (this.fire) {
        //         this.schedule(this.shootBullets, 1 / this.fireRate, 0, 0);
        //     }
        //     else if (!this.fire) {
        //         this.unschedule(this.shootBullets);
        //     }
        //     this.isFire = this.fire;
        // }

        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
        } else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
        }
    }
}
