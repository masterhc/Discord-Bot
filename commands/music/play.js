/**
 * Created by Julian/Wolke on 07.11.2016.
 */
let Command = require('../../structures/command');
let winston = require('winston');
let Selector = require('../../structures/selector');
let track_error = !remConfig.no_error_tracking;
/**
 * The play command
 * plays a song duh.
 * @extends Command
 *
 */
class Play extends Command {
    /**
     * Create the command
     * @param {Function} t - the translation module
     * @param {Object} v - the voice manager
     * @param mod The module manager
     */
    constructor({t, v, mod}) {
        super();
        this.cmd = 'play';
        this.cat = 'music';
        this.needGuild = true;
        this.t = t;
        this.v = v;
        this.r = mod.getMod('raven');
        this.accessLevel = 0;
    }

    async run(msg) {
        let msgSplit = msg.content.split(' ').splice(1);
        if (msgSplit.length === 0) return msg.channel.createMessage(this.t('qa.empty-search', {lngs: msg.lang}));
        let uwu = this.checkNext(msgSplit);
        let next = uwu.next;
        msgSplit = uwu.msgSplit;
        msg.content = msgSplit.join(' ').trim();
        try {
            let res = await this.v.addToQueue(msg, !next, next);
            if (Object.prototype.toString.call(res) === '[object Array]') {
                return this.searchResult(msg, res, next);
            } else {
                if (next) return msg.channel.createMessage(this.t('play.next', {
                    song: res.title,
                    lngs: msg.lang, user: `${msg.author.username}#${msg.author.discriminator}`
                }));
                msg.channel.createMessage(this.t('play.success', {
                    song: res.title,
                    lngs: msg.lang,
                    user: `${msg.author.username}#${msg.author.discriminator}`
                }));
            }
        } catch (err) {
            console.error(err);
            if (err instanceof TranslatableError) {
                msg.channel.createMessage(this.t(err instanceof TranslatableError ? err.t : 'generic.error', {lngs: msg.lang}));
            } else {
                if (track_error) {
                    this.r.captureException(err, {
                        extra: {
                            userId: msg.author.id,
                            guildId: msg.channel.guild.id,
                            msg: msg.content,
                            msgId: msg.id
                        }
                    });
                }
                msg.channel.createMessage(this.t('generic.error', {lngs: msg.lang}));
            }
        }
    }

    checkNext(msgSplit) {
        let next = false;
        let index = msgSplit.indexOf('-next');
        if (index > -1) {
            msgSplit.splice(index, 1);
            next = true;
        }
        return {next, msgSplit};
    }

    searchResult(msg, results, next) {
        let selector = new Selector(msg, results, this.t, (err, number) => {
            if (err) {
                return msg.channel.createMessage(this.t(err, {lngs: msg.lang}));
            }
            msg.content = `!w.play https://youtube.com/watch?v=${results[number - 1].id}`;
            if (next) {
                msg.content += ' -next';
            }
            this.run(msg);
        });
    }
}
module.exports = Play;