'use strict';

const gulp = require(`gulp`);
const SimpleBuild = require(`simple-build`);
const Logger = SimpleBuild.Logger;

let simpleBuild = new SimpleBuild({
  logger: new Logger({ level: Logger.Levels.into })
}, gulp);

simpleBuild.taskGroups.lint(simpleBuild);
