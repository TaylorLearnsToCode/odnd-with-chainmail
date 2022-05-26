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

  // register initiative setting
  game.settings.register('odnd', 'initFormula', {
    name: 'Initiative Formula',
    hint: 'Initiative Formula',
    scope: 'odnd',
    type: String,
    default: '1d6',
    config: true,
    onChange: formula => _simpleUpdateInit(formula, true)
  });

  function _simpleUpdateInit(formula, notify = false) {
    const isValid = Roll.validate(formula);
    if (!isValid) {
      if (notify) ui.notifications.error(`Invalid: ${formula}`);
      return;
    }
    CONFIG.Combat.initiative.formula = formula;
  }

  // add cached templates (child HTMLs) for performance
  return loadTemplates([]);
});
