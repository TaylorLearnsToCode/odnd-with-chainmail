export class LanguageSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ['system-styles', 'sheet', 'item'],
      template:
        'systems/odnd-with-chainmail/templates/odnd-language-sheet.html',
      width: 300,
      height: 150
    });
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.languageData = context.data.data;
    return context;
  }
}
