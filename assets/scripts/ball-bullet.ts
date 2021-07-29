// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  private posx = Math.floor(Math.random() * 800) - 400;

  onCollisionEnter(otherCollider, selfCollider) {
    this.node.destroy();
  }

  moveBullet() {
    let tween = cc
      .tween(this.node)
      .to(1, { position: cc.v3(this.node.x + this.posx, 1000), angle: 360 })
      .call(() => {
        this.node.destroy();
      })
      .start();
  }

  start() {
    this.moveBullet();
  }
}
