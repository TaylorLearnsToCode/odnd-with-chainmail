import { ArmorSheet } from './armor-sheet.mjs';
import { OdndItemSheet } from './item-sheet.mjs';
import { LanguageSheet } from './language-sheet.mjs';
import { OdndActor } from './odnd-actor.mjs';
import { OdndSheet } from './odnd-sheet.mjs';
import { OdndSpellSheet } from './spell-sheet.mjs';
import { WeaponSheet } from './weapon-sheet.mjs';

const ODND = {};

/** Init Function */
Hooks.once('init', async function () {
  // add utility classes (e.g. Actors and Macros)
  game.odnd = {
    OdndActor
  };

  // import and assign config constants
  CONFIG.ODND = ODND;

  // initiative formula
  CONFIG.Combat.initiative = {
    formula: '1d6',
    decimals: 0
  };

  // define custom document classes
  CONFIG.Actor.documentClass = OdndActor;

  // register odnd sheet
  Actors.unregisterSheet('core', ActorSheet);
  Actors.registerSheet('odnd', OdndSheet, { makeDefault: true });
  Items.registerSheet('odnd', LanguageSheet, { makeDefault: false });
  Items.registerSheet('odnd', WeaponSheet, { makeDefault: false });
  Items.registerSheet('odnd', OdndItemSheet, { makeDefault: false });
  Items.registerSheet('odnd', ArmorSheet, { makeDefault: false });
  Items.registerSheet('odnd', OdndSpellSheet, { makeDefault: false });

  // Handlebars Helpers
  Handlebars.registerHelper('isSpellLevel', function (a, b, o) {
    if (a.data.isSpell && a.data.level === b) {
      return o.fn(this);
    }
    return o.inverse(this);
  });

  // add cached templates (child HTMLs) for performance
  return loadTemplates([]);
});
