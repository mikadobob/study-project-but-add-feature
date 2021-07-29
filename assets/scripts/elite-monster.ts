// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { NamespaceDataManager } from "./namespace-data";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  private life = 15;

  @property(cc.AudioClip)
  monsterDestroySound: cc.AudioClip = null;

  onCollisionEnter(otherCollider, selfCollider) {
    this.hitByBullet(otherCollider);
  }

  hitByBullet(collider: any) {
    if (
      collider.name == "jet_bullet<PolygonCollider>" ||
      collider.name == "ball_bullet<PolygonCollider>" ||
      collider.name == "family_bullet<PolygonCollider>"
    ) {
      cc.audioEngine.setVolume(
        cc.audioEngine.playEffect(this.monsterDestroySound, false),
        0.2
      );
      this.life -= 1;
    }
  }

  checkDestroy() {
    if (this.life <= 0) {
      NamespaceDataManager.resetLifePlayer();
      this.node.destroy();
      NamespaceDataManager.addScore(20);
      NamespaceDataManager.setDeadMonster(this.node.zIndex);
    }
  }

  checkEndGame() {
    if (NamespaceDataManager.getGameStatus() == 0) {
      this.node.destroy();
    }
  }

  update(dt) {
    this.checkDestroy();

    this.checkEndGame();
  }
}
