import { CHARACTER_CLASSES } from './character-constants.mjs';

export class OdndActor extends Actor {
  /** @override */
  prepareDerivedData() {
    // ability modifiers, etc.
    super.prepareDerivedData();
    const actorData = this.data;

    this._prepareCharacterData(actorData);
    this._prepareMonsterData(actorData);
  }

  _prepareCharacterData(actorData) {
    if (actorData.type !== 'character') {
      return;
    }
    this._calculateEarnedExperienceBonus(actorData.data);
    this._calculateWithstandAdversity(actorData.data);
    this._calculateHitDieBonus(actorData.data);
    this._calculateMissileBonus(actorData.data);
    this._calculateCarriedWeight(actorData);
    this._calculateEncumbranceThreshold(actorData.data);
  }

  _prepareMonsterData(actorData) {
    if (actorData.type !== 'monster') {
      return;
    }
    // process monster data
  }

  _calculateEarnedExperienceBonus(data) {
    let primeReq;
    switch (CHARACTER_CLASSES.indexOf(data.class)) {
      case 0:
        primeReq = data.str;
        primeReq += this._addXfor1(data.int, 2);
        primeReq += this._addXfor1(data.wis, 3);
        break;
      case 1:
        primeReq = data.int;
        primeReq += this._addXfor1(data.wis, 2);
        break;
      case 2:
        primeReq = data.wis;
        primeReq += this._addXfor1(data.str, 3);
        primeReq += this._addXfor1(data.int, 2);
        break;
      default:
        primeReq = 10;
    }

    if (primeReq >= 15) {
      data.xpBonus = 10;
    } else if (primeReq >= 13) {
      data.xpBonus = 5;
    } else if (primeReq <= 6) {
      data.xpBonus = -20;
    } else if (primeReq <= 8) {
      data.xpBonus = -10;
    } else {
      data.xpBonus = 0;
    }
  }

  _addXfor1(score, x) {
    let adj = score - x;
    let bonus = 0;
    while (adj > 9) {
      bonus += 1;
      adj -= x;
    }
    return bonus;
  }

  _calculateWithstandAdversity(data) {
    const con = data.con;
    if (con >= 13) {
      data.withstandAdversity = 100;
    } else if (con >= 7) {
      data.withstandAdversity = 40 + (con - 7) * 10;
    } else {
      data.withstandAdversity = 40;
    }
  }

  _calculateHitDieBonus(data) {
    const con = data.con;
    if (con >= 15) {
      data.hdBonus = 1;
    } else if (con <= 6) {
      data.hdBonus = -1;
    } else {
      data.hdBonus = 0;
    }
  }

  _calculateMissileBonus(data) {
    const dex = data.dex;
    if (dex > 12) {
      data.missileBonus = 1;
    } else if (dex < 9) {
      data.missileBonus = -1;
    } else {
      data.missileBonus = 0;
    }
  }

  _calculateCarriedWeight(data) {
    let netWeight = 0;
    if (!!data.items) {
      for (const item of data.items.values()) {
        if (!item.isLanguage && !item.isSpell) {
          netWeight += !!item.data.data.weight ? item.data.data.weight : 0;
        }
      }
    }
    data.data.carriedWeight = netWeight;
  }

  _calculateEncumbranceThreshold(data) {
    // yeah, yeah - this is from Greyhawk: I get it...
    const str = data.str;
    let range = [750, 1000, 1500, 3000];
    let modifier;
    if (str == 18) {
      modifier = 500;
    } else if (str >= 17) {
      modifier = 300;
    } else if (str >= 16) {
      modifier = 150;
    } else if (str >= 13) {
      modifier = 100;
    } else if (str >= 10) {
      modifier = 50;
    } else if (str >= 7) {
      modifier = 0;
    } else if (str >= 5) {
      modifier = -50;
    } else {
      modifier = -100;
    }
    data.encumbrance = {
      light: range[0] + modifier,
      heavy: range[1] + modifier,
      armored: range[2] + modifier,
      max: range[3] + modifier
    };
  }
}
