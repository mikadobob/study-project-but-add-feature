// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { NamespaceData } from "./namespace-data";
import { Game } from "./game";

const { ccclass, property } = cc._decorator;

@ccclass
export class MonsterBullet extends cc.Component {

    // private game: Game = null;

    @property
    moveSpeed: number = 200;
    
    @property(cc.AudioClip)
    hitJetSound: cc.AudioClip = null;

    onCollisionEnter(otherCollider, selfCollider) {
        this.node.stopAllActions();
        if (otherCollider.name == "jet<PolygonCollider>") {
            NamespaceData.decreaseLifePlayer();
            cc.audioEngine.playEffect(this.hitJetSound, false);
        }
        this.node.destroy();
    }

    public monsterShoot(posx: number, posy: number) {

        if (posx > 0) {
            posx += 20;
        }
        else if (posx < 0) {
            posx -= 20;
        }

        if (Math.floor(Math.random() * 2) == 1) {
            let tween = cc.tween(this.node)
                .to(1, { position: cc.v3(posx, posy - 100), angle: 360 })
                .start()
        }
        else {
            let tween = cc.tween(this.node)
                .to(0.5, { position: cc.v3(this.node.x, posy - 100), angle: 360 })
                .start()
        }
    }

    update(dt) {
        // console.log(this.game);
        // this.node.setPosition(this.node.position.x, this.node.position.y -= this.moveSpeed * dt);

        if (this.node.position.y <= -(this.node.parent.getContentSize().height)) {
            this.node.destroy();

            // }

        }
    }
}
