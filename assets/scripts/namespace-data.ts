// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const { ccclass, property } = cc._decorator;

export namespace NamespaceData {

    let monster_position: number[][] = [];
    let lifePlayer = 0;
    let score = 0;
    let gameStatus = 1;

    let posy = 348;
    for (let i = 0; i < 6; i++) {
        let posx = -200
        for (let j = 0; j < 5; j++) {
            monster_position.push([posx, posy, 0, 0])
            posx += 100;
        }
        posy -= 85;
    }
    //////////////////////////////////////////////////////////////////////////////////////////
    export function setGameStatus(status: number) {
        gameStatus = status;
    }

    export function getGameStatus() {
        return gameStatus;
    }
    //////////////////////////////////////////////////////////////////////////////////////////

    export function resetScore() {
        score = 0;
    }

    export function getScore() {
        return score;
    }

    export function addScore(scoreAdd: number) {
        score += scoreAdd;
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    export function resetLifePlayer() {
        lifePlayer = 3;
    }

    export function decreaseLifePlayer() {
        lifePlayer -= 1;
    }

    export function getLifePlayer() {
        return lifePlayer;
    }

    //////////////////////////////////////////////////////////////////////////////////////////
    export function setSpawnMonster(indexMonster: number, typeMonster: number) {
        monster_position[indexMonster][2] = 1;
        monster_position[indexMonster][3] = typeMonster;
    }

    export function setDeadMonster(indexMonster: number) {
        monster_position[indexMonster][2] = 0;
    }

    export function getMonsterPosition() {
        return monster_position;
    }

    // export function getBulletType(index:number) {
    //     return monster_position[index][3];
    // }

    export function resetMonster() {
        let posy = 348;
        monster_position = [];
        for (let i = 0; i < 6; i++) {
            let posx = -200
            for (let j = 0; j < 5; j++) {
                monster_position.push([posx, posy, 0])
                posx += 100;
            }
            posy -= 85;
        }
    }

    export function countAliveMonster() {
        let count = 0;
        for (let i = 0; i < 30; i++) {
            if (monster_position[i][2] == 1) count++;
        }
        return count;
    }



}
