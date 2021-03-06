// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  loadSceneGameAndTouchEvent() {
    cc.director.preloadScene("game");
    this.node.on(
      cc.Node.EventType.TOUCH_START,
      function (event) {
        cc.director.loadScene("game");
      },
      this
    );
  }

  onLoad() {
    this.loadSceneGameAndTouchEvent();
  }
}
