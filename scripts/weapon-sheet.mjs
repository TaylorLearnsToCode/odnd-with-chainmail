import { COIN_ABBREVIATIONS, TROOP_TYPES } from './character-constants.mjs';

export class WeaponSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['system-styles', 'sheet', 'item'],
      template: 'systems/odnd-with-chainmail/templates/odnd-weapon-sheet.html',
      width: 410,
      height: 450
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.weaponData = context.data.data;
    context.COIN_ABBREVIATIONS = COIN_ABBREVIATIONS;
    context.TROOP_TYPES = TROOP_TYPES;
    return context;
  }
}
