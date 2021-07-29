// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import { NamespaceDataManager } from "./namespace-data";

@ccclass
export class SupportFromAbove extends cc.Component {
  @property(cc.Prefab)
  little_help_bullet: cc.Prefab = null;

  onCollisionEnter(otherCollider, selfCollider) {
    this.checkSupportTypeOnCollisionEnter(selfCollider);

    this.returnPosition();
  }

  checkSupportTypeOnCollisionEnter(collider: any) {
    if (collider.name == "spread<CircleCollider>") {
      this.takeSupportSpread();
    }
    if (collider.name == "machine-gun<PolygonCollider>") {
      this.takeSupportMachineGun();
    }
    if (collider.name == "shotgun-shell<PolygonCollider>") {
      this.takeSupportShotgunShell();
    }
    if (collider.name == "little-help<PolygonCollider>") {
      this.takeSupportLittleHelp();
      NamespaceDataManager.setTriggerFamily(true);
    }
  }

  takeSupportSpread() {
    NamespaceDataManager.setSupportType(1);
  }
  takeSupportMachineGun() {
    NamespaceDataManager.setSupportType(2);
  }
  takeSupportShotgunShell() {
    NamespaceDataManager.setSupportType(3);
  }

  takeSupportLittleHelp() {
    NamespaceDataManager.setSupportType(4);
    this.helpEvent();
  }

  returnPosition() {
    this.node.stopAllActions();
    this.node.setPosition(250, 950);
    this.node.active = false;
  }

  helpEvent() {
    for (let i = 0; i < 100; i++) {
      let posx = Math.floor(Math.random() * 250) + 550;
      let posy = Math.floor(Math.random() * 450) + 350;
      var familyBullet = cc.instantiate(this.little_help_bullet);
      familyBullet.setPosition(posx, posy);
      this.node.parent.addChild(familyBullet);
    }
  }

  public dropSupport() {
    let lastx = Math.floor(Math.random() * 500);
    let tween = cc
      .tween(this.node)
      .to(3, {
        position: cc.v3(Math.floor(Math.random() * 500), this.node.y - 200),
        angle: 360,
      })
      .to(2, {
        position: cc.v3(Math.floor(Math.random() * 500), this.node.y - 400),
        angle: 0,
      })
      .to(1, {
        position: cc.v3(lastx, this.node.y - 600),
        angle: 360,
      })
      .to(1, {
        position: cc.v3(lastx, this.node.y - 1000),
        angle: 0,
      })
      .start();
  }
}
