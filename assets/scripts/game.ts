// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import { MonsterBullet } from "./monster-bullet";
import { EliteMonsterBullet } from "./elite-monster-bullet";
import { NamespaceDataManager } from "./namespace-data";
import { SupportFromAbove } from "./support-from-above";

const { ccclass, property } = cc._decorator;

@ccclass
export class Game extends cc.Component {
  @property(cc.Prefab)
  private monsterPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  private eliteMonsterPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  private bulletPrefab: cc.Prefab = null;

  @property(cc.Prefab)
  private eliteBulletPrefab: cc.Prefab = null;

  @property(cc.Node)
  public jet: cc.Node = null;

  @property(cc.Node)
  public spread: cc.Node = null;

  @property(cc.Node)
  public machineGun: cc.Node = null;

  @property(cc.Node)
  public littleHelp: cc.Node = null;

  @property(cc.Node)
  public shotgunShell: cc.Node = null;

  @property(cc.Node)
  public tentacle: cc.Node = null;

  @property(cc.Node)
  private heart1: cc.Node = null;

  @property(cc.Node)
  private heart2: cc.Node = null;

  @property(cc.Node)
  private heart3: cc.Node = null;

  @property(cc.Node)
  private family1: cc.Node = null;

  @property(cc.Node)
  private family2: cc.Node = null;

  @property(cc.Node)
  private family3: cc.Node = null;

  @property(cc.Node)
  private family4: cc.Node = null;

  @property(cc.Node)
  private family5: cc.Node = null;

  @property(cc.Node)
  private squid: cc.Node = null;

  @property(cc.Label)
  score: cc.Label = null;

  @property(cc.Label)
  gameOver: cc.Label = null;

  @property(cc.Node)
  restart: cc.Node = null;

  @property(cc.AudioClip)
  gameOverSound: cc.AudioClip = null;

  private supportType: number = 0;

  gameOverFunction() {
    cc.audioEngine.setVolume(
      cc.audioEngine.playEffect(this.gameOverSound, false),
      0.5
    );
    this.enabled = false;
    this.jet.active = false;
    this.gameOver.enabled = true;
    this.restart.active = true;
    NamespaceDataManager.setGameStatus(0);
  }

  checkGameOver() {
    if (NamespaceDataManager.getLifePlayer() == 0) {
      this.gameOverFunction();
    }
  }

  updateScore() {
    this.score.string = "SCORE: " + NamespaceDataManager.getScore().toString();
  }

  firstSpawnMonster() {
    let monster_position = NamespaceDataManager.getMonsterPosition();
    for (let i = 0; i < 20; i++) {
      var newMonster = cc.instantiate(this.monsterPrefab);
      this.node.addChild(newMonster, i, "Monster" + i.toString());

      newMonster.setPosition(monster_position[i][0], monster_position[i][1]);

      NamespaceDataManager.setSpawnMonster(i, 1);
    }
  }

  spawnMonster() {
    let monster_position = NamespaceDataManager.getMonsterPosition();
    var emptyLocation: number[] = [];
    for (let i = 0; i < 30; i++) {
      if (monster_position[i][2] == 0) {
        emptyLocation.push(i);
      }
    }
    if (emptyLocation.length != 0) {
      var typeMonster: number = 1;
      var newLocation =
        emptyLocation[Math.floor(Math.random() * emptyLocation.length)];
      if (Math.floor(Math.random() * 100) != 7) {
        var newMonster = cc.instantiate(this.monsterPrefab);
        this.node.addChild(
          newMonster,
          newLocation,
          "Monster" + newLocation.toString()
        );

        newMonster.setPosition(
          monster_position[newLocation][0],
          monster_position[newLocation][1]
        );
      } else {
        typeMonster = 2;
        var newMonster = cc.instantiate(this.eliteMonsterPrefab);
        this.node.addChild(
          newMonster,
          newLocation,
          "Monster" + newLocation.toString()
        );

        newMonster.setPosition(
          monster_position[newLocation][0],
          monster_position[newLocation][1]
        );
      }
      NamespaceDataManager.setSpawnMonster(newLocation, typeMonster);
    }
  }

  monsterAttack() {
    let monster_position = NamespaceDataManager.getMonsterPosition();
    var aliveMonster: number[] = [];
    for (let i = 0; i < 30; i++) {
      if (monster_position[i][2] == 1) {
        aliveMonster.push(i);
      }
    }
    if (aliveMonster.length != 0) {
      var posBullet =
        aliveMonster[Math.floor(Math.random() * aliveMonster.length)];
      if (monster_position[posBullet][3] == 1) {
        var newBullet = cc.instantiate(this.bulletPrefab);
        this.node.addChild(
          newBullet,
          posBullet,
          "MonsterBullet" + posBullet.toString()
        );

        let bulletMonster: MonsterBullet =
          newBullet.getComponent(MonsterBullet);
        newBullet.setPosition(
          monster_position[posBullet][0],
          monster_position[posBullet][1]
        );
        bulletMonster.monsterShoot(this.jet.x, this.jet.y);
      } else if (monster_position[posBullet][3] == 2) {
        var newBullet = cc.instantiate(this.eliteBulletPrefab);
        this.node.addChild(
          newBullet,
          posBullet,
          "MonsterBullet" + posBullet.toString()
        );

        let bulletMonster: EliteMonsterBullet =
          newBullet.getComponent(EliteMonsterBullet);

        newBullet.setPosition(
          monster_position[posBullet][0],
          monster_position[posBullet][1]
        );
        bulletMonster.monsterShoot(this.jet.x, this.jet.y);
      }
    }
  }

  setShowHeart() {
    if (NamespaceDataManager.getLifePlayer() == 3) {
      this.heart1.active = true;
      this.heart2.active = true;
      this.heart3.active = true;
    }
    if (NamespaceDataManager.getLifePlayer() == 2) {
      if (cc.isValid(this.heart1)) {
        this.heart1.active = false;
        this.heart2.active = true;
        this.heart3.active = true;
      }
    }
    if (NamespaceDataManager.getLifePlayer() == 1) {
      if (cc.isValid(this.heart2)) {
        this.heart1.active = false;
        this.heart2.active = false;
        this.heart3.active = true;
      }
    }
    if (NamespaceDataManager.getLifePlayer() == 0) {
      if (cc.isValid(this.heart3)) {
        this.heart1.active = false;
        this.heart2.active = false;
        this.heart3.active = false;
        this.gameOverFunction();
      }
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  eventCheck() {
    let countEvent = NamespaceDataManager.getCountEvent();
    // ANCHOR
    if (countEvent >= 50) {
      NamespaceDataManager.resetCountEvent();
      this.randomSupportFromAbove();
    }
  }

  checkSupportToReset() {
    if (this.supportType != NamespaceDataManager.getSupportType()) {
      this.supportType = NamespaceDataManager.getSupportType();

      this.scheduleOnce(() => {
        NamespaceDataManager.setSupportType(0);
      }, 20);
      this.scheduleOnce(() => {
        this.supportType = 0;
      }, 20);
    }
  }

  randomSupportFromAbove() {
    // ANCHOR
    let randomSupport = Math.floor(Math.random() * 10);
    // let randomSupport = 9;
    let support: SupportFromAbove = null;
    if (randomSupport <= 2) {
      // this.spread.active = false;
      this.spread.setPosition(250, 950);
      this.spread.active = true;
      support = this.spread.getComponent(SupportFromAbove);
    } else if (randomSupport <= 5) {
      // this.machineGun.active = false;
      this.machineGun.setPosition(250, 950);
      this.machineGun.active = true;
      support = this.machineGun.getComponent(SupportFromAbove);
    } else if (randomSupport <= 8) {
      // this.shotgunShell.active = false;
      this.shotgunShell.setPosition(250, 950);
      this.shotgunShell.active = true;
      support = this.shotgunShell.getComponent(SupportFromAbove);
    } else if (randomSupport == 9) {
      this.littleHelp.setPosition(250, 950);
      this.littleHelp.active = true;
      support = this.littleHelp.getComponent(SupportFromAbove);
    }
    support.dropSupport();
  }

  checkCountMonsterAndSpawn() {
    if (NamespaceDataManager.countAliveMonster() < 20) this.spawnMonster();
  }

  scheduleMonsterSpawnAndAttack() {
    this.schedule(this.spawnMonster, 1, cc.macro.REPEAT_FOREVER, 1);
    this.schedule(this.monsterAttack, 0.5, cc.macro.REPEAT_FOREVER, 3);
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  checkTriggerFamily() {
    if (NamespaceDataManager.getTriggerFamily()) {
      this.triggerFamily();

      NamespaceDataManager.setTriggerFamily(false);
    }
  }

  triggerFamily() {
    this.family1.active = true;
    this.family2.active = true;
    this.family3.active = true;
    this.family4.active = true;
    this.family5.active = true;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  collisionEnable() {
    var manager = cc.director.getCollisionManager();
    manager.enabled = true;
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  start() {
    this.firstSpawnMonster();

    NamespaceDataManager.resetLifePlayer();

    NamespaceDataManager.setGameStatus(1);

    /////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  onLoad() {
    this.collisionEnable();

    this.scheduleMonsterSpawnAndAttack();
  }

  update(dt) {
    this.checkCountMonsterAndSpawn();

    this.updateScore();

    this.checkGameOver();

    this.setShowHeart();

    this.eventCheck();

    this.checkTriggerFamily();

    this.checkSupportToReset();
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  // Button
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  onStartGame() {
    NamespaceDataManager.resetScore();
    NamespaceDataManager.resetMonster();
    NamespaceDataManager.resetCountEvent();
    NamespaceDataManager.setSupportType(0);

    this.heart1.active = true;
    this.heart2.active = true;
    this.heart3.active = true;

    cc.director.loadScene("game");

    this.score.string = "SCORE: " + NamespaceDataManager.getScore().toString();
  }
}
