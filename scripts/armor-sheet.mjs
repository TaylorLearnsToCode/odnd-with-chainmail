import { COIN_ABBREVIATIONS, TROOP_TYPES } from './character-constants.mjs';

export class ArmorSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['system-styles', 'sheet', 'item'],
      template: 'systems/odnd-with-chainmail/templates/odnd-armor-sheet.html',
      width: 400,
      height: 400
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.armorData = context.data.data;
    context.COIN_ABBREVIATIONS = COIN_ABBREVIATIONS;
    context.TROOP_TYPES = TROOP_TYPES;
    return context;
  }
}
