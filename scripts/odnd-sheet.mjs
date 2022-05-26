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
    context.editable = true;
    context.sheetData = context.data.data;
    const actorData = this.actor.data.toObject(false);
    // context.data = actorData.data;
    // context.flags = actorData.flags;

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
    html.find('.sheet-tabs').click(event => {
      console.log(event);
    });
  }

  /** @override */
  _getSubmitData(updateData) {
    const formData = super._getSubmitData(updateData);
    Object.keys(formData).forEach((key, value) => {
      if (!!this.actor.data.data[key]) {
        this.actor.data.data[key].value = value;
      }
    });
    return formData;
  }
}
