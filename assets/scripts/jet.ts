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
  jet_bullet: cc.Prefab = null;

  @property(cc.Prefab)
  ball_bullet: cc.Prefab = null;

  @property
  moveSpeed: number = 0;

  @property
  fireRate: number = 5;

  @property(cc.AudioClip)
  fireSound: cc.AudioClip = null;

  @property(cc.AudioClip)
  shotgunSound: cc.AudioClip = null;

  @property(cc.AudioClip)
  machinegunSound: cc.AudioClip = null;

  private isFire: boolean = false;
  private fire: boolean = false;
  private accLeft: boolean = false;
  private accRight: boolean = false;
  private supportType = NamespaceDataManager.getSupportType();

  fireBullets() {
    if (
      NamespaceDataManager.getSupportType() == 0 ||
      NamespaceDataManager.getSupportType() == 1 ||
      NamespaceDataManager.getSupportType() == 4
    ) {
      var jetBullet = cc.instantiate(this.jet_bullet);
      jetBullet.setPosition(this.node.position.x, this.node.position.y);
      this.node.parent.addChild(jetBullet);
      cc.audioEngine.setVolume(
        cc.audioEngine.playEffect(this.fireSound, false),
        0.2
      );
    } else if (NamespaceDataManager.getSupportType() == 2) {
      var jetBullet = cc.instantiate(this.jet_bullet);
      jetBullet.setPosition(this.node.position.x, this.node.position.y);
      this.node.parent.addChild(jetBullet);
      cc.audioEngine.setVolume(
        cc.audioEngine.playEffect(this.machinegunSound, false),
        0.2
      );
    } else if (NamespaceDataManager.getSupportType() == 3) {
      for (let i = 0; i <= 10; i++) {
        var shotgunBullet = cc.instantiate(this.ball_bullet);
        shotgunBullet.setPosition(
          this.node.position.x,
          this.node.position.y + Math.floor(Math.random() * 50)
        );
        this.node.parent.addChild(shotgunBullet);
      }
      cc.audioEngine.setVolume(
        cc.audioEngine.playEffect(this.shotgunSound, false),
        0.2
      );
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

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
      case cc.macro.KEY.up: // ANCHOR
        NamespaceDataManager.setTestMode(true);
        break;
      case cc.macro.KEY.down:
        NamespaceDataManager.setTestMode(false);
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  checkSupportToChangeFireRate() {
    NamespaceDataManager.getSupportType();
    if (this.supportType != NamespaceDataManager.getSupportType()) {
      this.supportType = NamespaceDataManager.getSupportType();
      this.fire = false;
    }
    if (
      NamespaceDataManager.getSupportType() == 0 ||
      NamespaceDataManager.getSupportType() == 1 ||
      NamespaceDataManager.getSupportType() == 4
    ) {
      this.fireRate = 5;
    }
    if (NamespaceDataManager.getSupportType() == 2) {
      this.fireRate = 15;
    }
    if (NamespaceDataManager.getSupportType() == 3) {
      this.fireRate = 2;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  movement() {
    if (this.accLeft) {
      this.node.x -= this.moveSpeed;
    } else if (this.accRight) {
      this.node.x += this.moveSpeed;
    }
  }

  toggleFire() {
    if (this.isFire != this.fire) {
      if (this.fire) {
        this.schedule(
          this.fireBullets,
          1 / this.fireRate,
          cc.macro.REPEAT_FOREVER,
          0
        );
      } else if (!this.fire) {
        this.unschedule(this.fireBullets);
      }
      this.isFire = this.fire;
    }
  }

  isThatExitTheScene() {
    if (this.node.x > this.node.parent.width / 2) {
      this.node.x = this.node.parent.width / 2;
    } else if (this.node.x < -this.node.parent.width / 2) {
      this.node.x = -this.node.parent.width / 2;
    }
  }

  setStartGame() {
    this.accLeft = false;
    this.accRight = false;
    this.node.x = 0;

    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  onLoad() {
    this.setStartGame();
  }

  update(dt) {
    this.movement();

    this.toggleFire();

    this.isThatExitTheScene();

    // if (this.fire) {
    //     this.schedule(this.fireBullets, 1 / this.fireRate, 0, 0);
    // }

    this.checkSupportToChangeFireRate();
  }
}
