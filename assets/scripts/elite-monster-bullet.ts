// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { NamespaceDataManager } from "./namespace-data";
// import { Game } from "./game";

const { ccclass, property } = cc._decorator;

@ccclass
export class EliteMonsterBullet extends cc.Component {
  private life: number = 2;

  @property(cc.AudioClip)
  hitJetSound: cc.AudioClip = null;

  onCollisionEnter(otherCollider, selfCollider) {
    this.hitJet(otherCollider);

    this.hitJetBullet(otherCollider);
  }

  hitJetBullet(collider: any) {
    if (
      collider.name == "jet_bullet<PolygonCollider>" ||
      collider.name == "family_bullet<PolygonCollider>"
    ) {
      this.life -= 1;
      if (this.life <= 0) {
        this.node.destroy();
      }
    }
  }

  hitJet(collider: any) {
    if (collider.name == "jet<PolygonCollider>") {
      NamespaceDataManager.decreaseLifePlayer();
      cc.audioEngine.setVolume(
        cc.audioEngine.playEffect(this.hitJetSound, false),
        0.2
      );
      this.node.destroy();
    }
    if (collider.name == "family1<PolygonCollider>") {
      this.node.destroy();
    } else if (collider.name == "family2<PolygonCollider>") {
      this.node.destroy();
    } else if (collider.name == "family3<PolygonCollider>") {
      this.node.destroy();
    } else if (collider.name == "family4<PolygonCollider>") {
      this.node.destroy();
    } else if (collider.name == "family5<PolygonCollider>") {
      this.node.destroy();
    }
  }

  public monsterShoot(posx: number, posy: number) {
    if (posx > 0) {
      posx += 20;
    } else if (posx < 0) {
      posx -= 20;
    }

    if (Math.floor(Math.random() * 2) == 1) {
      let tween = cc
        .tween(this.node)
        .to(1, { position: cc.v3(posx, posy - 100), angle: 360 })
        .start();
    } else {
      let tween = cc
        .tween(this.node)
        .to(0.5, { position: cc.v3(this.node.x, posy - 100), angle: 360 })
        .start();
    }
  }

  checkExitTheScene() {
    if (this.node.position.y <= -this.node.parent.getContentSize().height) {
      this.node.destroy();
    }
  }

  update(dt) {
    this.checkExitTheScene();
  }
}
