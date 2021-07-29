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
  familyBullet: cc.Prefab = null;

  @property(cc.AudioClip)
  familyFire: cc.AudioClip = null;

  private posx: number = 0;
  private duration: number = 0;
  private exitPosx: number = 0;
  private exitPosy: number = 0;

  private defaultPosx: number = 0;
  private defaultPosy: number = 0;

  toPositionAndFire() {
    if (this.node.name == "family1") {
      this.posx = -200;
    } else if (this.node.name == "family2") {
      this.posx = -100;
    } else if (this.node.name == "family3") {
      this.posx = 0;
    } else if (this.node.name == "family4") {
      this.posx = 100;
    } else if (this.node.name == "family5") {
      this.posx = 200;
    }

    this.duration = Math.floor((Math.random() * 20) / 10) + 1;

    let tween = cc
      .tween(this.node)
      .to(this.duration, { position: cc.v3(this.posx, -250) })
      .start();
  }

  scheduleAllAction() {
    this.scheduleOnce(this.toPositionAndFire, 1);
    this.scheduleOnce(this.autoFiring, 0.5);
    this.scheduleOnce(this.exitTheScene, 18);
  }

  fireBulletFromFamily() {
    var family_Bullet = cc.instantiate(this.familyBullet);
    family_Bullet.setPosition(this.node.position.x, this.node.position.y);
    this.node.parent.addChild(family_Bullet);
    cc.audioEngine.setVolume(
      cc.audioEngine.playEffect(this.familyFire, false),
      0.1
    );
  }

  autoFiring() {
    this.schedule(
      this.fireBulletFromFamily,
      0.1,
      cc.macro.REPEAT_FOREVER,
      this.duration - 0.5
    );
  }

  stopFiring() {
    this.unschedule(this.fireBulletFromFamily);
  }

  exitTheScene() {
    if (this.node.name == "family1") {
      this.exitPosx = -500;
      this.exitPosy = 240;
    } else if (this.node.name == "family2") {
      this.exitPosx = -520;
      this.exitPosy = 50;
    } else if (this.node.name == "family3") {
      this.exitPosx = -200;
      this.exitPosy = -500;
    } else if (this.node.name == "family4") {
      this.exitPosx = 520;
      this.exitPosy = 230;
    } else if (this.node.name == "family5") {
      this.exitPosx = 520;
      this.exitPosy = 130;
    }

    let tween = cc
      .tween(this.node)
      .to(2, { position: cc.v3(this.exitPosx, this.exitPosy) })
      .call(() => {
        this.stopFiring();
        this.node.setPosition(this.defaultPosx, this.defaultPosy);
        this.node.active = false;
      })
      .start();
  }

  getDefaultPosition() {
    this.defaultPosx = this.node.x;
    this.defaultPosy = this.node.y;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onEnable() {
    this.getDefaultPosition();
    this.scheduleAllAction();
  }
}
