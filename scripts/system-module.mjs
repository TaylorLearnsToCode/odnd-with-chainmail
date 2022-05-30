import { LanguageSheet } from './language-sheet.mjs';
import { OdndActor } from './odnd-actor.mjs';
import { OdndSheet } from './odnd-sheet.mjs';

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

  // add cached templates (child HTMLs) for performance
  return loadTemplates([]);
});
