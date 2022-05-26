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
    // process character data
  }

  _prepareMonsterData(actorData) {
    if (actorData.type !== 'monster') {
      return;
    }
    // process monster data
  }
}
