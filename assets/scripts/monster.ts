// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// import { Game } from "./game";
import { NamespaceDataManager } from "./namespace-data";

const { ccclass, property } = cc._decorator;

@ccclass
export class Monster extends cc.Component {
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
      NamespaceDataManager.setDeadMonster(this.node.zIndex);
      NamespaceDataManager.addScore(1);
      cc.audioEngine.setVolume(
        cc.audioEngine.playEffect(this.monsterDestroySound, false),
        0.2
      );
      this.node.destroy();
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  update(dt) {
    if (NamespaceDataManager.getGameStatus() == 0) {
      this.node.destroy();
    }
  }
}
