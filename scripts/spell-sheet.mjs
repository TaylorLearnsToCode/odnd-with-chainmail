export class OdndSpellSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['system-styles', 'sheet', 'item'],
      template: 'systems/odnd-with-chainmail/templates/odnd-spell-sheet.html',
      width: 400,
      height: 400
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.spellData = context.data.data;
    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    html.find('.sheet-spell-cast').click(event => {
      this._castSpell(event);
    });
    html.find('.spell-effect').on('change', event => {
      this._updateSpellEffect(event);
    });
  }

  /** @override */
  submit(options) {
    this.item.data.data.level = parseInt(this.item.data.data.level);
    if (this.item.data.data.level < 1 || this.item.data.data.level > 6) {
      this.item.delete();
    }
    return super.submit(options);
  }

  _castSpell(event) {
    event.preventDefault();
    this.item.update({
      [`data.memorized`]: !this.item.data.data.memorized
    });
  }

  async _updateSpellEffect(event) {
    event.preventDefault();
    await this.item.update({
      ['data.effect']: event.currentTarget.value
    });
    console.warn(this.item);
  }
}
