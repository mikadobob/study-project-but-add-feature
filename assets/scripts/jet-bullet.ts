// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import { NamespaceDataManager } from "./namespace-data";

@ccclass
export default class NewClass extends cc.Component {
  @property(cc.Prefab)
  spread_bullet: cc.Prefab = null;

  @property(cc.AudioClip)
  spread_sound: cc.AudioClip = null;

  @property
  moveSpeed: number = 1000;

  onCollisionEnter(otherCollider, selfCollider) {
    this.checkSupportToSpread();

    this.node.destroy();
  }

  checkSupportToSpread() {
    if (NamespaceDataManager.getSupportType() == 1) {
      cc.audioEngine.setVolume(
        cc.audioEngine.playEffect(this.spread_sound, false),
        0.2
      );
      for (let i = 0; i <= 5; i++) {
        var spreadBullet = cc.instantiate(this.spread_bullet);
        spreadBullet.setPosition(this.node.position.x, this.node.position.y);
        this.node.parent.addChild(spreadBullet);
      }
    }
  }

  moveBullet() {
    let duration = 2;
    if (NamespaceDataManager.getSupportType() == 2) {
      duration = 1.5;
    }
    let tween = cc
      .tween(this.node)
      .to(duration, { position: cc.v3(this.node.x, this.node.y + 1000) })
      .call(() => {
        this.node.destroy();
      })
      .start();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  start() {
    this.moveBullet();
  }
}
