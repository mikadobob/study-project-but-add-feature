// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NamespaceData } from "./namespace-data";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    private life = 15;

    @property(cc.AudioClip)
    monsterDestroySound: cc.AudioClip = null;

    onCollisionEnter(otherCollider, selfCollider) {
        if (otherCollider.name == "jet_bullet<PolygonCollider>") {
            cc.audioEngine.playEffect(this.monsterDestroySound, false);
            this.life -= 1;
        }
    }

    update(dt) {
        if (NamespaceData.getGameStatus() == 0) {
            this.node.destroy();
        }
        if (this.life <= 0) {
            NamespaceData.resetLifePlayer();
            this.node.destroy();
            NamespaceData.addScore(20);
            NamespaceData.setDeadMonster(this.node.zIndex);
        }
    }






}
