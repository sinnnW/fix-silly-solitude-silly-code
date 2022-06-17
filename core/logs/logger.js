const prompt = require('prompt-sync')();
const gradient = require('gradient-string');

module.exports = {
  ask: (query) => {
    return prompt(gradient('cyan', 'lime')(query));
  },
  warn: (warning) => {
    console.log(gradient('yellow', 'orange')(warning));
  },
  showMenu: () => {
   console.log(gradient('yellow', 'lime')(`\n\n[1]: Create Channels\n[2]: Delete Channels\n[3]: ID Massban\n[4]: Real Massban\n[5]: Mass Unban\n[6]: Community Spam\n\n`));
               return prompt(gradient('yellow', 'lime')(`[?]: Your Option :: `))
  },
  success: (message) => {
    console.log(gradient('cyan','lime')(message))
  }
}