import { COIN_ABBREVIATIONS } from './character-constants.mjs';

export class OdndItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['system-styles', 'sheet', 'item'],
      template: 'systems/odnd-with-chainmail/templates/odnd-item-sheet.html',
      width: 400,
      height: 400
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.itemData = context.data.data;
    context.COIN_ABBREVIATIONS = COIN_ABBREVIATIONS;
    return context;
  }
}
