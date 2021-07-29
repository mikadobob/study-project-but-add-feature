// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// const { ccclass, property } = cc._decorator;

export namespace NamespaceDataManager {
  let monster_position: number[][] = [];
  let lifePlayer = 0;
  let score = 0;
  let gameStatus = 1;
  let countToEvent = 0;
  let supportType = 0;
  let triggerFamily = false;
  let testMode = false;

  //////////////////////////////////////////////////////////////////////////////////////////

  let posy = 348;
  for (let i = 0; i < 6; i++) {
    let posx = -200;
    for (let j = 0; j < 5; j++) {
      monster_position.push([posx, posy, 0, 0]);
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

  export function setTriggerFamily(trigger: boolean) {
    triggerFamily = trigger;
  }

  export function getTriggerFamily() {
    return triggerFamily;
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////////////

  export function setSupportType(type: number) {
    supportType = type;
  }

  export function getSupportType() {
    return supportType;
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  export function resetCountEvent() {
    countToEvent = 0;
  }

  export function getCountEvent() {
    return countToEvent;
  }

  export function addCountEvent(numberCountEventAdd: number) {
    countToEvent += numberCountEventAdd;
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
    if (supportType == 0) {
      addCountEvent(1);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////
  // ANCHOR
  export function setTestMode(mode: boolean) {
    testMode = mode;
  }

  export function resetLifePlayer() {
    lifePlayer = 3;
  }

  export function decreaseLifePlayer() {
    if (!testMode) {
      lifePlayer -= 1;
    }
    // else if (testMode) {
    //   lifePlayer -= 0;
    // }
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

  export function resetMonster() {
    let posy = 348;
    monster_position = [];
    for (let i = 0; i < 6; i++) {
      let posx = -200;
      for (let j = 0; j < 5; j++) {
        monster_position.push([posx, posy, 0]);
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
