// Libraries
const gradient = require('gradient-string');
const fs = require('fs');

// Constants
const nukerFunctions = require('./core/bot/functions');
const client = require('./core/bot/nuker');
const logger = require('./core/logs/logger');


const ids = fs.readFileSync('./data/members/ids.txt', 'utf-8').split('\n');

// Once Ready...
client.on('ready', () => {
  console.clear();
  logger.success(`\n\n{!}; Logged in as ${client.user.tag}\n{!}; Bot is in ${client.guilds.cache.size} servers.\n`);

  let id = logger.ask(`[?]: Guild ID :: `);
  let guild = client.guilds.cache.get(id);
  if (!guild) logger.warn(`[!]: Provide a valid Guild ID!`)
  if (guild) {
    logger.success(`[>]: Guild Name :: ${guild.name}`)
    let option = logger.showMenu();
    if (option === '1') {
      let name = logger.ask(`[?]: Name :: `);
      let amount = logger.ask(`[?]: Amount :: `);

      if (!name) name = 'gangbanged'
      if (!parseInt(amount)) amount = 500;
      console.log('\n\n')
      nukerFunctions.createChannels(guild, name, amount);
    } else if (option === '2') {

      nukerFunctions.deleteChannels(guild)

    } else if (option === '3') {
      console.log(gradient('lime', 'yellow')(`\n{!}: About to start fake massban...\n{!}: Loading ${ids.length} IDs...\n{!}: Please be patient.\n\n`));
      nukerFunctions.fakeMassBan(guild, ids)
    } else if (option === '4') {
      console.log(gradient('lime', 'yellow')(`[!]; Scraping Guild IDs...\n\n`))
      nukerFunctions.realMassban(guild);
    } else if (option === '5') {
      nukerFunctions.massUnban(guild);
    } else if (option === '6') {
      nukerFunctions.communitySpam(guild);
    } else {
      logger.warn(`[!]; Choose a valid option.`)
    }
  }
});

// log in
const token = process.env.token;
client.login(token).catch(() => {
  logger.warn(`{!}: The token is invalid or it is missing intents.`)
});



// #1
process.on("unhandledRejection", (reason, promise) => {
  console.log("[-]: " + reason);
});

// #2
process.on("uncaughtException", (err, origin) => {
  console.log("[-]: " + err);
});