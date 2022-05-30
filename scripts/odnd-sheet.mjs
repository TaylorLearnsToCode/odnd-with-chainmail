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
  }

  _addLanguage(event) {
    event.preventDefault();
    const language = getDocumentClass('Item');
    return language.create(
      {
        name: 'New Language',
        type: 'language'
      },
      {
        parent: this.actor
      }
    );
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
