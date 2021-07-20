// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    onLoad() {
        var moveStill = this.moveStillAction();
        cc.tween(this.node)
            .to(0.5, { position: cc.v3(139, 195) })
            .then(moveStill)
            .call(() => { this.node.destroy() })
            .start()
    }

    moveStillAction() {

        var moveUp = cc.tween().by(2, { y: 20 }, { easing: 'sineOut' });

        var moveDown = cc.tween().by(2, { y: -20 }, { easing: 'sineIn' });


        var tween = cc.tween().sequence(moveUp, moveDown);

        return cc.tween().repeat(1, tween).to(1, { position: cc.v2(0, -100), rotation: -130 });
    }




}
