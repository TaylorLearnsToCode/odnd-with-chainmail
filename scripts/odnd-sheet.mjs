import { ALIGNMENTS, CHARACTER_CLASSES } from './character-constants.mjs';

export class OdndSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['system-styles', 'sheet', 'actor'],
      template: 'systems/odnd-with-chainmail/templates/odnd-sheet.html',
      width: 600,
      height: 600,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'record'
        }
      ]
    });
  }

  /** @override */
  get template() {
    return `systems/odnd-with-chainmail/templates/odnd-${this.actor.data.type.toLowerCase()}-sheet.html`;
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.sheetData = context.data.data;
    context.sheetItems = context.data.items;
    context.CHARACTER_CLASSES = CHARACTER_CLASSES;
    context.ALIGNMENTS = ALIGNMENTS;
    const actorData = this.actor.data.toObject(false);

    if (actorData.type == 'character') {
      this._prepareCharacterData(context);
    } else if (actorData.type == 'monster') {
      this._prepareMonsterData(context);
    }

    return context;
  }

  _prepareCharacterData(context) {
    // handle character stuff, like labeling ability scores
  }

  _prepareMonsterData(context) {
    // handle character stuff: the example does items only
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find('.add-language').click(event => {
      this._addLanguage(event);
    });
    html.find('.edit-language').click(event => {
      this._editLanguage(event);
    });
    html.find('.remove-language').click(event => {
      this._removeLanguage(event);
    });
    html.find('.add-melee').click(event => {
      this._addWeapon(event, true);
    });
    html.find('.add-missile').click(event => {
      this._addWeapon(event, false);
    });
    html.find('.edit-weapon').click(event => {
      this._editWeapon(event);
    });
    html.find('.remove-weapon').click(event => {
      this._removeWeapon(event);
    });
    html.find('.add-item').click(event => {
      this._addItem(event);
    });
    html.find('.edit-item').click(event => {
      this._editItem(event);
    });
    html.find('.remove-item').click(event => {
      this._removeItem(event);
    });
    html.find('.add-armor').click(event => {
      this._addArmor(event);
    });
    html.find('.edit-armor').click(event => {
      this._editArmor(event);
    });
    html.find('.remove-armor').click(event => {
      this._removeArmor(event);
    });
  }

  async _addItem(event) {
    event.preventDefault();
    const item = getDocumentClass('Item');
    const createdItem = await item.create(
      { name: 'New Item', type: 'item' },
      { parent: this.actor }
    );
    createdItem.sheet.render(true);
  }

  async _addArmor(event) {
    event.preventDefault();
    const armor = getDocumentClass('Item');
    const createdArmor = await armor.create(
      { name: 'New Armor', type: 'armor' },
      { parent: this.actor }
    );
    createdArmor.sheet.render(true);
  }

  async _addWeapon(event, isMelee) {
    event.preventDefault();
    const weapon = getDocumentClass('Item');
    const weaponType = isMelee ? 'meleeWeapon' : 'missileWeapon';
    const createdWeapon = await weapon.create(
      { name: 'New Weapon', type: weaponType },
      { parent: this.actor }
    );
    createdWeapon.sheet.render(true);
  }

  _editWeapon(event) {
    event.preventDefault();
    const weapon = this.actor.items.get(event.currentTarget.dataset.target);
    weapon.sheet.render(true);
  }

  _editArmor(event) {
    event.preventDefault();
    const armor = this.actor.items.get(event.currentTarget.dataset.target);
    armor.sheet.render(true);
  }

  _editItem(event) {
    event.preventDefault();
    const item = this.actor.items.get(event.currentTarget.dataset.target);
    item.sheet.render(true);
  }

  _removeWeapon(event) {
    event.preventDefault();
    const weapon = this.actor.items.get(event.currentTarget.dataset.target);
    weapon.delete();
  }

  _removeArmor(event) {
    event.preventDefault();
    const armor = this.actor.item.get(event.currentTarget.dataset.target);
    armor.delete();
  }

  _removeItem(event) {
    event.preventDefault();
    const item = this.actor.items.get(event.currentTarget.dataset.target);
    item.delete();
  }

  async _addLanguage(event) {
    event.preventDefault();
    const language = getDocumentClass('Item');
    const createdLanguage = await language.create(
      {
        name: 'New Language',
        type: 'language'
      },
      {
        parent: this.actor
      }
    );
    createdLanguage.sheet.render(true);
  }

  _editLanguage(event) {
    event.preventDefault();
    const language = this.actor.items.get(event.currentTarget.dataset.target);
    language.sheet.render(true);
  }

  async _removeLanguage(event) {
    event.preventDefault();
    const language = this.actor.items.get(event.currentTarget.dataset.target);
    language.delete();
  }

  /** @override */
  _getSubmitData(updateData) {
    const formData = super._getSubmitData(updateData);
    return formData;
  }
}
