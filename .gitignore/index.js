// MODULE
const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const fs = require("fs");
//

// NEW CLIENT
const client = new Discord.Client();
const bot = new Discord.Client();
//

// BOT INFO
const version = "V.1.3.0"
const PREFIX = "*";
//

// EMOJI
const emoji_instaID = "457965848301404162"
, emoji_twitterID = "457957941883043871"
, emoji_facebookID = "457965866051698688"
, emoji_snapID = "457975117818101791"
, emoji_youtubeID = "475071414932865065"

const emoji_insta = "<:emoji_insta:" + emoji_instaID + ">"
, emoji_twitter = "<:emoji_twitter:" + emoji_twitterID + ">"
, emoji_facebook = "<:emoji_facebook:" + emoji_facebookID + ">"
, emoji_snap = "<:emoji_snap:" + emoji_snapID + ">"
, emoji_youtube = "<:emoji_youtube:" + emoji_youtubeID + ">"
//

// MUSIQUE 
const servers = {};
const queue = new Map();

function play(connection, message) {
 var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}
//

bot.on("ready", function () {
    bot.user.setActivity("IlianBOT - *help", {
        'type': 'STREAMING',
        'url': "https://www.twitch.tv/supers_fanne"
}),
    bot.user.setUsername("IlianBOT")
    bot.user.setStatus("dnd")
    console.log("IlianBOT - Connecté");

        var connection_embed = new Discord.RichEmbed()
            .setTitle("Je suis connecté")
            .setTimestamp()
            .setColor("#36393E")

    bot.channels.findAll("name", "commandes-logs").map(channel => channel.send(connection_embed));
});

// VCS
bot.on("message", async function (message) {
    if(message.channel.name !== "vcs-ilianbot") return;
    if(message.author.id === bot.user.id) return;
    if(message.author.bot) return;
    if(message.content.startsWith(" ")) return;
    if (message.author.id === "193092758267887616") {
        const fondateur_embed = new Discord.RichEmbed()
            .setColor("#DB1414")
            .setAuthor("Fondateur – VCS", message.guild.iconURL)
            .setDescription(message.content)
                .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                .addField("Message de : ", message.author.toString())
                .setThumbnail(message.author.avatarURL)
            .setFooter("Ilian's Community | IlianBOT - " + version)
            .setTimestamp()
        message.delete()
        return bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(fondateur_embed));
    } 
    if (message.author.id === "336291226297040908") {
        const monbb_embed = new Discord.RichEmbed()
            .setColor("#FF69B4")
            .setAuthor("❤ ♥Baby♥ ❤ – VCS", message.guild.iconURL)
            .setDescription(message.content)
                .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                .addField("Message de : ", message.author.toString() + "  ( ID : " + message.author.id + " )")
                .setThumbnail(message.author.avatarURL)
            .setFooter("Ilian's Community | IlianBOT - " + version)
            .setTimestamp()
        message.delete()
        return bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(monbb_embed));
    } 
        if (message.author.id === "370593040706043905") {
        const fondadracobot_embed = new Discord.RichEmbed()
            .setColor("#2EFE2E")
            .setAuthor("Créateur de DracoBot – VCS", message.guild.iconURL)
            .setDescription(message.content)
                .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                .addField("Message de : ", message.author.toString() + "  ( ID : " + message.author.id + " )")
                .setThumbnail(message.author.avatarURL)
            .setFooter("Ilian's Community | IlianBOT - " + version)
            .setTimestamp()
        message.delete()
        return bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(fondadracobot_embed));
    } 
	if (message.author.id === "472012503178805279") {
        const cofondadracobot_embed = new Discord.RichEmbed()
            .setColor("#B92525")
            .setAuthor("Co-Créateur de DracoBot – VCS", message.guild.iconURL)
            .setDescription(message.content)
                .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                .addField("Message de : ", message.author.toString() + "  ( ID : " + message.author.id + " )")
                .setThumbnail(message.author.avatarURL)
            .setFooter("Ilian's Community | IlianBOT - " + version)
            .setTimestamp()
        message.delete()
        return bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(cofondadracobot_embed));
    } 
 /*   if (message.author.id === "") {
        const ban_embed = new Discord.RichEmbed()
            .setColor("#2A00FF")
            .setAuthor("Banni(e) – VCS", message.guild.iconURL)
            .setDescription("Nous somme désolé mais vous avez été bannie du vcs.")
            .setThumbnail(message.author.avatarURL)
            .setFooter("Ilian's Community | IlianBOT - " + version)
            .setTimestamp()
        message.delete()
        return bot.channels.send(ban_embed);
    } */
    {
        const vcs_embed = new Discord.RichEmbed()
            .setColor("#2A00FF")
            .setAuthor("Utilisateur – VCS", message.guild.iconURL)
            .setDescription(message.content)
                .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                .addField("Message de : ", message.author.toString() + "  ( ID : " + message.author.id + " )")
                .setThumbnail(message.author.avatarURL)
            .setFooter("Ilian's Community | IlianBOT - " + version)
            .setTimestamp()
        message.delete()
        bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(vcs_embed));
    }
})
//

bot.on('message', function(message) {
       if(message.content === 'Ta mère la grosse pute') { // # cencure
            message.reply('Surveille ton language jeune insolents !')
            message.delete()
           console.log("C'est quoi ce language " + message.author.username + " !")
       }
});

bot.on("guildMemberAdd", function(message) {
        var join_embed = new Discord.RichEmbed()
            .setAuthor("Arrivée :", message.guild.avatarURL)
            .setDescription("Bienvenue @" + message.user.username + "#" + message.user.discriminator + " sur " + message.guild.name + "`` ! :white_check_mark:")
            .setColor("#3333cc")
            .setThumbnail(message.user.avatarURL)
            .setTimestamp()
    message.guild.channels.find("name", "🤖bot-logs🤖").send(join_embed);
    message.addRole(message.guild.roles.find("name", "Membre"));
});
    
bot.on("guildMemberRemove", function(message) {
        var leave_embed = new Discord.RichEmbed()
            .setAuthor("Départ :", message.guild.avatarURL)
            .setDescription("A bientôt @" + message.user.username + "#" + message.user.discriminator + " sur ``" + message.guild.name + "`` !")
            .setColor("#3333cc")
            .setThumbnail(message.user.avatarURL)
            .setTimestamp()
    message.guild.channels.find("name", "🤖bot-logs🤖").send(leave_embed);
    message.guild.channels.find("name", "🤖bot-logs🤖").send("A bientôt " + message.toString() + " sur ``" + message.guild.name + "`` !");
});
    
    
bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;

    var roleban = member.guild.roles.find("name", "Banni(e)")

    var rolekick = member.guild.roles.find("name", "Kick")

    var rolemembre = member.guild.roles.find("name", "Membre")
    
    var roleMute = member.guild.roles.find("name", "Mute")

    var foother = "Demande de @" + message.author.username + "#" + message.author.discriminator + " ! | IlianBOT - " + version

    var footheren = "Request by @" + message.author.username + "#" + message.author.discriminator + " ! | IlianBOT - " + version
    
    var modlog = member.guild.channels.find("name", "🤖bot-logs🤖")
    
    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
        case "play":
        if (!args[1]) {  
                var nolink_embedfr = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                    .setDescription("Vous n'avez pas entrez de lien !")
                    .setColor("#FF0000")
                    .setFooter(foother)
                var nolink_embeden = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Music - Error⚠", message.author.avatarURL)
                    .setDescription("You have not entered a link !")
                    .setColor("#FF0000")
                    .setFooter(footheren)    
            const nolinkerror = await message.channel.send(nolink_embedfr);
            await nolinkerror.react("🇫🇷");
            await nolinkerror.react("🇬🇧");
            const nolinkerrorpannier = nolinkerror.createReactionCollector((reaction, user) => user.id === message.author.id);
            nolinkerrorpannier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🇫🇷") {
                    nolinkerror.edit(nolink_embedfr);
                }      
                if (reaction.emoji.name === "🇬🇧") {
                    nolinkerror.edit(nolink_embeden);
                }        
                await reaction.remove(message.author.id);
            })
            console.log(PREFIX +"play par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "play " + args + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
            console.log(message.author.username + " à oubliée de mettre un liens")
            return;
        }
        if(!message.member.voiceChannel) {
                var noinchannel_embedfr = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                    .setDescription("Vous n'êtes pas dans un salon vocal !")
                    .setColor("#FF0000")
                    .setFooter(foother)
                var noinchannel_embeden = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Music - Error⚠", message.author.avatarURL)
                    .setDescription("You are not in a vocal channel !")
                    .setColor("#FF0000")
                    .setFooter(footheren)    
            const noinchannelerror = await message.channel.send(noinchannel_embedfr);
            await noinchannelerror.react("🇫🇷");
            await noinchannelerror.react("🇬🇧");
            const noinchannelerrorpannier = noinchannelerror.createReactionCollector((reaction, user) => user.id === message.author.id);
            noinchannelerrorpannier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🇫🇷") {
                    noinchannelerror.edit(noinchannel_embedfr);
                }      
                if (reaction.emoji.name === "🇬🇧") {
                    noinchannelerror.edit(noinchannel_embeden);
                }        
                await reaction.remove(message.author.id);
            })
            console.log(PREFIX +"play par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "play " + args + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
            console.log(message.author.username + " à oubliée d'allée dans un salon vocal.") 
            return;
        }

        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue: []
        };

            var noytblink_embedfr = new Discord.RichEmbed()
                .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                .setDescription("Vous devez mettre un lien YouTube !")
                .setColor("#FF0000")
                .setFooter(foother)
        var validate = YTDL.validateURL(args[1]);
        if(!validate) return message.channel.send(noytblink_embedfr)

        /* var info = YTDL.getInfo(args[1]);
        message.channel.send(`**${info.title} ajouté !**`) */
        var server = servers[message.guild.id];
            var play_embedfr = new Discord.RichEmbed()
                .setAuthor("Lancement de la musique :", message.author.avatarURL)
                    .addField("Titre", "[**EN DEV**](" + args[1] + ")")
                    .addField("Uploader par", "**EN DEV**", true)
                    .addField("Lancer par", message.author.toString(), true)
                    .addField("Durée: EN DEV", "```css\n▶ 🔘──────────────────────────── 00:00:00\n```")
                .setColor("#6495ED")
                .setFooter(foother)
            var play_embeden = new Discord.RichEmbed()
                .setAuthor("Launch of the music :", message.author.avatarURL)
                    .addField("Title", "[**IN DEV**](" + args[1] + ")")
                    .addField("Upload by", "**IN DEV**", true)
                    .addField("Start by", message.author.toString(), true)
                    .addField("Length: IN DEV", "```css\n▶ 🔘──────────────────────────── 00:00:00\n```")
                .setColor("#6666ff")
                .setFooter(footheren)
            const playreac = await message.channel.send(play_embedfr);
            await playreac.react("🇫🇷");
            await playreac.react("🇬🇧");
            const playreacpannier = playreac.createReactionCollector((reaction, user) => user.id === message.author.id);
            playreacpannier.on('collect', async(reaction) => {
            if (reaction.emoji.name === "🇫🇷") {
                playreac.edit(play_embedfr);
            }      
            if (reaction.emoji.name === "🇬🇧") {
                playreac.edit(play_embeden);
            }        
            await reaction.remove(message.author.id);
            })        
            server.queue.push(args[1]);
    
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message) 
            });
        break;
    
        case "p":
            if (!args[1]) {  
                    var nolink_embedfr = new Discord.RichEmbed()
                        .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                        .setDescription("Vous n'avez pas entrez de lien !")
                        .setColor("#FF0000")
                        .setFooter(foother)
                    var nolink_embeden = new Discord.RichEmbed()
                        .setAuthor("⚠IlianBOT Music - Error⚠", message.author.avatarURL)
                        .setDescription("You have not entered a link !")
                        .setColor("#FF0000")
                        .setFooter(footheren)    
                const noplinkerror = await message.channel.send(nolink_embedfr);
                await noplinkerror.react("🇫🇷");
                await noplinkerror.react("🇬🇧");
                const nolinpkerrorpannier = noplinkerror.createReactionCollector((reaction, user) => user.id === message.author.id);
                nolinpkerrorpannier.on('collect', async(reaction) => {
                    if (reaction.emoji.name === "🇫🇷") {
                        noplinkerror.edit(nolink_embedfr);
                    }      
                    if (reaction.emoji.name === "🇬🇧") {
                        noplinkerror.edit(nolink_embeden);
                    }        
                    await reaction.remove(message.author.id);
                })
                console.log(PREFIX +"p par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "p " + args + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                console.log(message.author.username + " à oubliée de mettre un liens")
                return;
            }
            if(!message.member.voiceChannel) {
                    var noinchannel_embedfr = new Discord.RichEmbed()
                        .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                        .setDescription("Vous n'êtes pas dans un salon vocal !")
                        .setColor("#FF0000")
                        .setFooter(foother)
                    var noinchannel_embeden = new Discord.RichEmbed()
                        .setAuthor("⚠IlianBOT Music - Error⚠", message.author.avatarURL)
                        .setDescription("You are not in a vocal channel !")
                        .setColor("#FF0000")
                        .setFooter(footheren)    
                const noinpchannelerror = await message.channel.send(noinchannel_embedfr);
                await noinpchannelerror.react("🇫🇷");
                await noinpchannelerror.react("🇬🇧");
                const noinpchannelerrorpannier = noinpchannelerror.createReactionCollector((reaction, user) => user.id === message.author.id);
                noinpchannelerrorpannier.on('collect', async(reaction) => {
                    if (reaction.emoji.name === "🇫🇷") {
                        noinpchannelerror.edit(noinchannel_embedfr);
                    }      
                    if (reaction.emoji.name === "🇬🇧") {
                        noinpchannelerror.edit(noinchannel_embeden);
                    }        
                    await reaction.remove(message.author.id);
                })
                console.log(PREFIX +"p par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "p " + args + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                console.log(message.author.username + " à oubliée d'allée dans un salon vocal.") 
                return;
            }

            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

                var noytblink_embedfr = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                    .setDescription("Vous devez mettre un lien YouTube !")
                    .setColor("#FF0000")
                    .setFooter(foother)
            var validate = YTDL.validateURL(args[1]);
            if(!validate) return message.channel.send(noytblink_embedfr)
 
           /* var info = YTDL.getInfo(args[1]);
	        message.channel.send(`**${info.title} ajouté !**`) */
            var server = servers[message.guild.id];
                var play_embedfr = new Discord.RichEmbed()
                    .setAuthor("Lancement de la musique :", message.author.avatarURL)
                        .addField("Titre", "[**EN DEV**](" + args[1] + ")")
                        .addField("Uploader par", "**EN DEV**", true)
                        .addField("Lancer par", message.author.toString(), true)
                        .addField("Durée: EN DEV", "```css\n▶ 🔘──────────────────────────── 00:00:00\n```")
                    .setColor("#6495ED")
                    .setFooter(foother)
                var play_embeden = new Discord.RichEmbed()
                    .setAuthor("Launch of the music :", message.author.avatarURL)
                        .addField("Title", "[**IN DEV**](" + args[1] + ")")
                        .addField("Upload by", "**IN DEV**", true)
                        .addField("Start by", message.author.toString(), true)
                        .addField("Length: IN DEV", "```css\n▶ 🔘──────────────────────────── 00:00:00\n```")
                    .setColor("#6666ff")
                    .setFooter(footheren)
            const playpreac = await message.channel.send(play_embedfr);
            await playpreac.react("🇫🇷");
            await playpreac.react("🇬🇧");
            const playpreacpannier = playpreac.createReactionCollector((reaction, user) => user.id === message.author.id);
            playpreacpannier.on('collect', async(reaction) => {
            if (reaction.emoji.name === "🇫🇷") {
                playpreac.edit(play_embedfr);
            }      
            if (reaction.emoji.name === "🇬🇧") {
                playpreac.edit(play_embeden);
            }        
            await reaction.remove(message.author.id);
            })        
            server.queue.push(args[1]);
    
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
                play(connection, message) 
            });
        break;

        case "skip":
            if(!message.member.voiceChannel) {
                var noinchannel_embedfr = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                    .setDescription("Vous n'êtes pas dans un salon vocal !")
                    .setColor("#FF0000")
                    .setFooter(foother)
                var noinchannel_embeden = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Music - Error⚠", message.author.avatarURL)
                    .setDescription("You are not in a vocal channel !")
                    .setColor("#FF0000")
                    .setFooter(footheren)    
            const noinchannelerror = await message.channel.send(noinchannel_embedfr);
            await noinchannelerror.react("🇫🇷");
            await noinchannelerror.react("🇬🇧");
            const noinchannelerrorpannier = noinchannelerror.createReactionCollector((reaction, user) => user.id === message.author.id);
            noinchannelerrorpannier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🇫🇷") {
                    noinchannelerror.edit(noinchannel_embedfr);
                }      
                if (reaction.emoji.name === "🇬🇧") {
                    noinchannelerror.edit(noinchannel_embeden);
                }        
                await reaction.remove(message.author.id);
            })
            console.log(PREFIX +"skip par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "skip`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
            console.log(message.author.username + " à oubliée d'allée dans un salon vocal.") 
            return;
        }
        var server = servers[message.guild.id];
        var skip_embedfr = new Discord.RichEmbed()
            .setAuthor("⚠IlianBOT - Musique⚠", message.author.avatarURL)
            .setDescription("Passage à la musique suivante !")
            .setColor("#ffd11a")
            .setFooter(foother)
        var skip_embeden = new Discord.RichEmbed()
            .setAuthor("⚠IlianBOT - Music⚠", message.author.avatarURL)
            .setDescription("Switch to the next music !")
            .setColor("#b38f00")
            .setFooter(footheren)    
        const skiperror = await message.channel.send(skip_embedfr);
        await skiperror.react("🇫🇷");
        await skiperror.react("🇬🇧");
        const skiperrorpannier = skiperror.createReactionCollector((reaction, user) => user.id === message.author.id);
        skiperrorpannier.on('collect', async(reaction) => {
        if (reaction.emoji.name === "🇫🇷") {
            skiperror.edit(skip_embedfr);
        }      
        if (reaction.emoji.name === "🇬🇧") {
            skiperror.edit(skip_embeden);
        }        
        await reaction.remove(message.author.id);
        })
            if(server.dispatcher) server.dispatcher.end();
            console.log(PREFIX +"skip par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "skip`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;  

        case "s":
            if(!message.member.voiceChannel) {
                    var noinchannel_embedfr = new Discord.RichEmbed()
                        .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                        .setDescription("Vous n'êtes pas dans un salon vocal !")
                        .setColor("#FF0000")
                        .setFooter(foother)
                    var noinchannel_embeden = new Discord.RichEmbed()
                        .setAuthor("⚠IlianBOT Music - Error⚠", message.author.avatarURL)
                        .setDescription("You are not in a vocal channel !")
                        .setColor("#FF0000")
                        .setFooter(footheren)    
                const noinchannelserror = await message.channel.send(noinchannel_embedfr);
                await noinchannelserror.react("🇫🇷");
                await noinchannelserror.react("🇬🇧");
                const noinchannelserrorpannier = noinchannelserror.createReactionCollector((reaction, user) => user.id === message.author.id);
                noinchannelserrorpannier.on('collect', async(reaction) => {
                    if (reaction.emoji.name === "🇫🇷") {
                        noinchannelserror.edit(noinchannel_embedfr);
                    }      
                    if (reaction.emoji.name === "🇬🇧") {
                        noinchannelserror.edit(noinchannel_embeden);
                    }        
                    await reaction.remove(message.author.id);
                })
                console.log(PREFIX +"s par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "s`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                console.log(message.author.username + " à oubliée d'allée dans un salon vocal.") 
                return;
            }
            var server = servers[message.guild.id];
                var skip_embedfr = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT - Musique⚠", message.author.avatarURL)
                    .setDescription("Passage à la musique suivante !")
                    .setColor("#ffd11a")
                    .setFooter(foother)
                var skip_embeden = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT - Music⚠", message.author.avatarURL)
                    .setDescription("Switch to the next music !")
                    .setColor("#b38f00")
                    .setFooter(footheren)    
            const skipserror = await message.channel.send(skip_embedfr);
            await skipserror.react("🇫🇷");
            await skipserror.react("🇬🇧");
            const skiperrsorpannier = skipserror.createReactionCollector((reaction, user) => user.id === message.author.id);
            skiperrsorpannier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🇫🇷") {
                    skipserror.edit(skip_embedfr);
                }      
                if (reaction.emoji.name === "🇬🇧") {
                    skipserror.edit(skip_embeden);
                }        
                await reaction.remove(message.author.id);
            })
            if(server.dispatcher) server.dispatcher.end();
            console.log(PREFIX +"skip par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "s`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break; 

        case "stop":
            if(!message.member.voiceChannel) {
                var noinchannel_embedfr = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Musique - Erreur⚠", message.author.avatarURL)
                    .setDescription("Vous n'êtes pas dans un salon vocal !")
                    .setColor("#FF0000")
                    .setFooter(foother)
                var noinchannel_embeden = new Discord.RichEmbed()
                    .setAuthor("⚠IlianBOT Music - Error⚠", message.author.avatarURL)
                    .setDescription("You are not in a vocal channel !")
                    .setColor("#FF0000")
                    .setFooter(footheren)    
            const noinchannelerror = await message.channel.send(noinchannel_embedfr);
            await noinchannelerror.react("🇫🇷");
            await noinchannelerror.react("🇬🇧");
            const noinchannelerrorpannier = noinchannelerror.createReactionCollector((reaction, user) => user.id === message.author.id);
            noinchannelerrorpannier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🇫🇷") {
                    noinchannelerror.edit(noinchannel_embedfr);
                }      
                if (reaction.emoji.name === "🇬🇧") {
                    noinchannelerror.edit(noinchannel_embeden);
                }        
                await reaction.remove(message.author.id);
            })
            console.log(PREFIX +"stop par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "stop`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
            console.log(message.author.username + " à oubliée d'allée dans un salon vocal.") 
            return;
            }
          /*  const serverQueue = queue.get(message.guild.id);
            if(server.dispatcher) server.dispatcher.end()
            if(!message.guild.voiceConnection) message.member.voiceChannel.leave().then(function(connection) {
                stop(connection, message) 
            }); */
	        message.member.voiceChannel.leave();
            var stop_embedfr = new Discord.RichEmbed()
                .setAuthor("⚠IlianBOT - Musique⚠", message.author.avatarURL)
                .setDescription("Fin de la sessions de musique !")
                .setColor("#006633")
                .setFooter(foother)
            var stop_embeden = new Discord.RichEmbed()
                .setAuthor("⚠IlianBOT - Music⚠", message.author.avatarURL)
                .setDescription("End of the music sessions !")
                .setColor("#1aff8c")
                .setFooter(footheren)    
            const stopmessage = await message.channel.send(stop_embedfr);
            await stopmessage.react("🇫🇷");
            await stopmessage.react("🇬🇧");
            const stoppannier = stopmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
            stoppannier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🇫🇷") {
                    stopmessage.edit(stop_embedfr);
                }      
                if (reaction.emoji.name === "🇬🇧") {
                    stopmessage.edit(stop_embeden);
                }        
                await reaction.remove(message.author.id);
            })
            console.log(PREFIX +"stop par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "stop`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break; 

        case "unmute":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            if(!modlog) return message.reply("Je ne trouve pas de channel log.");
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je retire la sanction: ``Mute`` ?")
            member.removeRole(roleMute)
            message.channel.send(user.toString() + " a bien été unmute ✅")
            console.log(PREFIX +"unmute par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "unmute " + user.username.toString() + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));

            var unmute_embed = new Discord.RichEmbed()
                    .addField("Commande :", "UnMute")
                    .addField("Utilisateur :", user.username)
                    .addField("Modérateur :", message.author.username)
                    .addField("Heure:", message.channel.createdAt)
                .setColor("#3333cc")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "🤖bot-logs🤖").send(unmute_embed);
        break;
       
        case "mute":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas la permission d'exécuter la commande. :x:");
            if(!modlog) return message.reply("Je ne trouve pas de channel log.");  
            if(!reasontimed) return message.reply("Tu as oublié la raison ! :D")
            if(!roleMute) return message.reply("Le rôle Mute est introuvable !")
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je dois mettre la sanction: ``Mute``")
            message.channel.send(member.toString() + " a bien été mute. ✅")
            member.addRole(roleMute)
            console.log(PREFIX +"mute par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "mute " + user.username.toString() +" `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
             
            var mute_embed = new Discord.RichEmbed()
                    .addField("Action :", "Mute")
                    .addField("Utilisateur :", user.toString())
                    .addField("Modérateur :", message.author.toString())
                    .addField("Raison :", reasontimed)
                .setColor("#FFFF00")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "🤖bot-logs🤖").send(mute_embed);
        break;

        case "shelp":
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
        message.delete()
        console.log(PREFIX +"shelp par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
        bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "shelp`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        var language_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
            .setColor("#36393E")
            .setFooter(foother + "/" + footheren)
        var startfr_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Menu d'aide🇫🇷🛠 !")
            .setDescription("**Pour naviguer dans le menu d'aide du staff, utilisez les réactions si-dessous.**")
            .setColor("#36393E")
            .setFooter(foother)
        var shelp1fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷Commande qui demande au moins le modo ( sauf pour le kick )🇫🇷")
            .setColor("#cc0000")
                .addField(PREFIX + "purge", "Cette commande permet de supprimé des messages beaucoup plus rapidement ! Pour l'utiliser, faites " + PREFIX + "purge (nombredemessages)")
                .addField(PREFIX + "mute", "Cette commande permet de muté un utilisateur pendant un certain temps. Pour l'utiliser, faites " + PREFIX + "mute @(utilisateur) + (raison)")
                .addField(PREFIX + "unmute", "Cette commande permet d'unmute un utilisateur. Pour l'utiliser, faites " + PREFIX + "unmute @(utilisateur)")
                .addField(PREFIX + "modehelp", "Cette commande permet d'afficher l'aide pour la modération. ( Vous comprendrez mieux sont fonctionnement )")
            .setFooter("Page 1/3 | " + foother)
        var shelp2fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷Commande d'annonce ( Permission requise : kick )🇫🇷")
                .setColor("#cc0000")
                .addField(PREFIX + "annonce", "Cette commande permet de faire une annonce avec une embed. **(** __*sans mention everyone*__ **)** l'annonce ce ferra dans le channel ``#annonce``")
                .addField(PREFIX + "annonce@", "Cette commande permet de faire une annonce avec une embed. **(** __*avec mention everyone*__ **)** l'annonce ce ferra dans le channel ``#annonce``")
            .setFooter("Page 2/3 | " + foother)                
        var shelp3fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷Commande qui demande au moins l'admin ( sauf pour le kick )🇫🇷")
            .setColor("#cc0000")
                .addField(PREFIX + "kick", "Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites " + PREFIX + "kick @(utilisateur) + (raison)")
                .addField(PREFIX + "ban", "Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites " + PREFIX + "ban @(utilisateur) + (raison)")
                .addField(PREFIX + "unkick", "Cette commande permet de unkick un utilisateur ! Pour l'utiliser, faites " + PREFIX + "unkick @(utilisateur)")
                .addField(PREFIX + "unban", "Cette commande permet de unban un utilisateur ! Pour l'utiliser, faites " + PREFIX + "unban @(utilisateur)")
                .addField(PREFIX + "install", "Cette commande permet d'afficher le panel d'installation.")
            .setFooter("Page 3/3 | " + foother)
        var starten_embed = new Discord.RichEmbed()
            .setTitle("🛠🇬🇧Help menu🇬🇧🛠 !")
            .setDescription("**To navigate the help menu of the staff, use the reactions below.**")
            .setColor("#36393E")
            .setFooter(footheren)
        var shelp1en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧Command that requires at least the modo (except for the kick)🇬🇧")
            .setColor("#cc0000")
                .addField(PREFIX + "purge", "This command allows you to delete messages much faster! To use it, do " + PREFIX + "purge (number of messages)")
                .addField(PREFIX + "mute", "This command allows to mute a user for a certain time. To use it, do " + PREFIX + "mute @(user) + (reason)")
                .addField(PREFIX + "unmute", "This command allows to unmute a user. To use it, do " + PREFIX + "unmute @(user)")
                .addField(PREFIX + "modehelp", "This command displays the help for moderation. ( You will understand better are working )")
          .setFooter("Page 1/3 | " + footheren)
        var shelp2en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧Annoucement command (Permission required: kick)🇬🇧")
            .setColor("#cc0000")
                .addField(PREFIX + "annonce", "This command allows to make an announcement with an embed. **(** __*without mention everyone*__ **)** the announcement will be in the channel ``#annonce``")
                .addField(PREFIX + "annonce@", "This command allows to make an announcement with an embed. **(** __*with mention everyone*__ **)** the announcement will be in the channel ``#annonce``")
            .setFooter("Page 2/3 | " + footheren)                
        var shelp3en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧Command that requires at least the admin (except for the kick)🇬🇧")
            .setColor("#cc0000")
                .addField(PREFIX + "kick", "This command is used to kick a user ! To use it, do " + PREFIX + "kick @(user) + (reason)")
                .addField(PREFIX + "ban", "This command is used to ban a user ! To use it, do " + PREFIX + "ban @(user) + (reason)")
                .addField(PREFIX + "unkick", "This command is used to unkick a user ! To use it, do " + PREFIX + "unkick @(user)")
                .addField(PREFIX + "unban", "This command is used to unban a user ! To use it, do " + PREFIX + "unban @(user)")
                .addField(PREFIX + "install", "This command displays the installation panel.")
            .setFooter("Page 3/3 | " + footheren)
        const srhelpmessage = await message.channel.send(language_embed);
        await srhelpmessage.react("🇫🇷");
        await srhelpmessage.react("🇬🇧");
        const repanierr = srhelpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
        repanierr.on('collect', async(reaction) => {
        if (reaction.emoji.name === "🇫🇷") {
        srhelpmessage.edit(startfr_embed);
        srhelpmessage.clearReactions();
        await srhelpmessage.react("1⃣");
        await srhelpmessage.react("2⃣");
        await srhelpmessage.react("3⃣");
        const theri = srhelpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
        theri.on('collect', async(reaction) => {
            if (reaction.emoji.name === "1⃣") {
                srhelpmessage.edit(shelp1fr_embed);
            }
            if (reaction.emoji.name === "2⃣") {
                srhelpmessage.edit(shelp2fr_embed);
            }
            if (reaction.emoji.name === "3⃣") {
                srhelpmessage.edit(shelp3fr_embed);
            }
            await reaction.remove(message.author.id);
            })
            }
            if (reaction.emoji.name === "🇬🇧") {
                srhelpmessage.edit(starten_embed);
                srhelpmessage.clearReactions();
                await srhelpmessage.react("1⃣");
                await srhelpmessage.react("2⃣");
                await srhelpmessage.react("3⃣");
                const theriz = srhelpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                theriz.on('collect', async(reaction) => {
                if (reaction.emoji.name === "1⃣") {
                    srhelpmessage.edit(shelp1en_embed);
                }
                if (reaction.emoji.name === "2⃣") {
                    srhelpmessage.edit(shelp2en_embed);
                }
                if (reaction.emoji.name === "3⃣") {
                    srhelpmessage.edit(shelp3en_embed);
                }
                await reaction.remove(message.author.id);
                })
            }
        })
        break;       

        case "help":
        message.delete()
        console.log(PREFIX +"help par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
        bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "help`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        var language_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
            .setColor("#36393E")
            .setFooter(foother + "/" + footheren)
        var startfr_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Menu d'aide🇫🇷🛠 !")
                .addField("Si tu as un problème avec les réactions ( qui sont toute enlever ) ajoute les toi-même ! ( :one: :two: :three: )", "**Pour naviguer dans le menu d'aide, utilisez les réactions ci-dessous.**")
            .setColor("#36393E")
            .setFooter(foother)
        var help1fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷🎵Musique🎵🇫🇷")
            .setColor("#0000ff")
                .addField(PREFIX + "play", "**Jouer une musique** !  Pour l'utiliser, faites *" + PREFIX + "play (lien youtube)* !")
                .addField(PREFIX + "skip", "**Sauter une musique**  Pour l'utiliser, faite *" + PREFIX + "skip* !")
                .addField(PREFIX + "stop", "**Arreter la musique**  Pour l'utiliser, faites *" + PREFIX + "stop* !")
            .setFooter("Page 1/3 | " + foother)
        var help2fr_embed = new Discord.RichEmbed()
            .setTitle("🇫🇷💩Autre💩🇫🇷")
            .setColor("#0000ff")
                .addField(PREFIX + "botinfo", "**Grâce à cette commande, tu pourras savoir** __**mes info**__ !") 
                .addField(PREFIX + "reseau", "**Avec cette commande tu pourras voir les __**réseau sociaux**__ **de mon créateur** !")
                .addField(PREFIX + "trad", "**Pour affichier l'aide des** __**traductions**__ !")
                .addField(PREFIX + "userinfo", "**Grâce à cette commande, tu pourras savoir tes** __**informations**__ !")
                .addField(PREFIX + "servinfo", "**Grâce à cette commande, tu pourras savoir les** __**informations du serveur**__ !")
                .addField(PREFIX + "servlist", "**Grâce à cette commande, tu pourras savoir la** __**liste des serveurs où je suis.**__ !")
                .addField(PREFIX + "ask", "**Si vous avez une question, utilisé cet commande** __**qui enverra un mp a mon créateur.**__ **tout spam/abus seront sanctionné d'une interdiction d'utilisation de commande** !")
                .addField(PREFIX + "google", "**Avec cette commande, tu pourras faire des** __**recherches google**__. **Pour l'utiliser, faites** *" + PREFIX + "google (recherche)* !")
            .setFooter("Page 2/3 | " + foother)                
        var help3fr_embed = new Discord.RichEmbed()
                .setTitle("🇫🇷⚙Administration🛠🇫🇷")
                .setColor("#cc0000")
                    .addField(PREFIX + "shelp", "❌__**Afficher les commandes du staff. Mais seule ceux qui ont la perm de kick pourrons y accèder**__.❌")
            .setFooter("Page 3/3 | " + foother)
        var starten_embed = new Discord.RichEmbed()
            .setTitle("🛠🇬🇧Help menu🇬🇧🛠 !")
            .addField("If you have a problem with the reactions (which are all removed) add the same yourself ! ( :one: :two: :three: )", "**To navigate the help menu, use the reactions below.**")
            .setColor("#36393E")
            .setFooter(footheren)
        var help1en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧🎵Music🎵🇬🇧")
            .setColor("#0000ff")
                .addField(PREFIX + "play", "**Playing a music** !  To use it, do *" + PREFIX + "play (youtube link)* !")
                .addField(PREFIX + "skip", "**Skip a music** ! To use it, do *" + PREFIX + "skip* !")
                .addField(PREFIX + "stop", "**Stop the music** ! To use it, do *" + PREFIX + "stop* !")
          .setFooter("Page 1/3 | " + footheren)
        var help2en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧💩Other💩🇬🇧")
            .setColor("#0000ff")
                .addField(PREFIX + "botinfo", "**With this command, you will be able to know** __**my information**__ !") 
                .addField(PREFIX + "reseau", "**With this command you will be able to see the** __**social networks**__ **of my creator** !")
                .addField(PREFIX + "trad", "**With this command you will be able to see the __**translation panel**__ !")
                .addField(PREFIX + "userinfo", "**Thanks to this command you can know your** __**informations**__ !")
                .addField(PREFIX + "servinfo", "**With this command, you will be able to know the** __**information of the server**__ !")
                .addField(PREFIX + "servlist", "**Thanks to this command, you will be able to know the** __** ist of the servers where I am.**__!")
                .addField(PREFIX + "ask", "**If you have a question, use this command** __**which will send a mp to my creator.** __ **any spam / abuse will be punished with a prohibition of use of command** !")
                .addField(PREFIX + "google", "**With this command, you will be able to do** __**google searches**__. **To use it, do** *" + PREFIX + "google (searche)* !")
            .setFooter("Page 2/3 | " + footheren)                
        var help3en_embed = new Discord.RichEmbed()
            .setTitle("🇬🇧⚙Administration🛠🇬🇧")
            .setColor("#cc0000")
                .addField(PREFIX + "shelp", "❌__**View the commandes of the staff. But only those who have the kick perm can access it**__.❌")
            .setFooter("Page 3/3 | " + footheren)
        const helpmessage = await message.channel.send(language_embed);
        await helpmessage.react("🇫🇷");
        await helpmessage.react("🇬🇧");
        const loir = helpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
        loir.on('collect', async(reaction) => {
        if (reaction.emoji.name === "🇫🇷") {
        helpmessage.edit(startfr_embed);
        helpmessage.clearReactions();
        await helpmessage.react("1⃣");
        await helpmessage.react("2⃣");
        await helpmessage.react("3⃣");
        const therri = helpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
        therri.on('collect', async(reaction) => {
            if (reaction.emoji.name === "1⃣") {
                helpmessage.edit(help1fr_embed);
            }
            if (reaction.emoji.name === "2⃣") {
                helpmessage.edit(help2fr_embed);
            }
            if (reaction.emoji.name === "3⃣") {
                helpmessage.edit(help3fr_embed);
            }
            await reaction.remove(message.author.id);
            })
            }
            if (reaction.emoji.name === "🇬🇧") {
                helpmessage.edit(starten_embed);
                helpmessage.clearReactions();
                await helpmessage.react("1⃣");
                await helpmessage.react("2⃣");
                await helpmessage.react("3⃣");
                const therir = helpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                therir.on('collect', async(reaction) => {
                if (reaction.emoji.name === "1⃣") {
                    helpmessage.edit(help1en_embed);
                }
                if (reaction.emoji.name === "2⃣") {
                    helpmessage.edit(help2en_embed);
                }
                if (reaction.emoji.name === "3⃣") {
                    helpmessage.edit(help3en_embed);
                }
                await reaction.remove(message.author.id);
                })
            }
        })
        break;

        case "kick":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas la permission d'exécuter la commande. :x:");
            if(!modlog) return message.reply("Je ne trouve pas de channel log.");  
            if (!reasontimed) return message.reply("Tu as oublié la raison ! :D")
            if(!rolekick) return message.reply("Le rôle Kick est introuvable !")
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je dois mettre la sanction: ``kick``")
            message.channel.send(member.toString() + " a bien été kick. ✅")
            member.roles.forEach(role => {
                member.removeRole(role)
            })
            member.addRole(rolekick)
            console.log(PREFIX +"kick par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "kick " + message.user.toString() + " " + reasontimed + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                
            var kick_embed = new Discord.RichEmbed()
                    .addField("Action :", "Kick")
                    .addField("Utilisateur :", user.toString())
                    .addField("Modérateur :", message.author.toString())
                    .addField("Raison :", reasontimed)
                .setColor("#FFFF00")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "🤖bot-logs🤖").send(kick_embed);
            member.guild.channels.find("name", "kick").send(kick_embed);
        break;

        case "unkick":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas la permission d'exécuter la commande. :x:");
            if(!modlog) return message.reply("Je ne trouve pas de channel log.");  
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je dois enlevé la sanction: ``kick``")
            message.channel.send(member.toString() + " a bien été unkick. ✅")
            member.removeRole(rolekick)
            member.addRole(rolemembre)
            console.log(PREFIX +"unkick par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "unkick " + message.user.toString() + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
            
            var unkick_embed = new Discord.RichEmbed()
                    .addField("Action :", "UnKick")
                    .addField("Utilisateur :", user.toString())
                    .addField("Modérateur :", message.author.toString())
                .setColor("#FFFF00")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "🤖bot-logs🤖").send(unkick_embed);
        break;

        case "ban":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Tu n'as pas la permission d'exécuter la commande. :x:");
            if(!modlog) return message.reply("Je ne trouve pas de channel log.");  
            if (!reasontimed) return message.reply("Tu as oublié la raison ! :D")
            if(!roleban) return message.reply("Le rôle Banni(e) est introuvable !")
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je dois mettre la sanction: ``ban``")
            message.channel.send(member.toString() + " a bien été ban. ✅")
            member.roles.forEach(role => {
                member.removeRole(role)
            })
            member.addRole(roleban)
            console.log(PREFIX +"ban par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "ban " + message.user.toString() + " " + reasontimed + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                
            var ban_embed = new Discord.RichEmbed()
                    .addField("Action :", "Bannissement")
                    .addField("Utilisateur :", user.toString())
                    .addField("Modérateur :", message.author.toString())
                    .addField("Raison :", reasontimed)
                .setColor("#FFFF00")
                .setAuthor(message.author.username, message.author.avatarURL)
                .setTimestamp()
            member.guild.channels.find("name", "🤖bot-logs🤖").send(ban_embed);
            member.guild.channels.find("name", "ban").send(ban_embed);
        break;
       
        case "unban":
            if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Tu n'as pas la permission d'exécuter la commande. :x:");
            if(!modlog) return message.reply("Je ne trouve pas de channel log.");  
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je doit enlevé la sanction: ``ban``")
            message.channel.send(member.toString() + " a bien été ban. ✅")
            member.removeRole(roleban)
            member.addRole(rolemembre)
            console.log(PREFIX +"unban par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "unban " + message.user.toString() + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                
            var unban_embed = new Discord.RichEmbed()
                .addField("Action :", "UnBan")
                .addField("Utilisateur :", user.toString())
                .addField("Modérateur :", message.author.toString())
            .setColor("#FFFF00")
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTimestamp()
            member.guild.channels.find("name", "🤖bot-logs🤖").send(unban_embed);
        break;       

        case "purge":
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
            message.delete()
            console.log(PREFIX +"purge par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "purge " + messagecount + " `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;

        case "reseau":
            var reseau_embed = new Discord.RichEmbed()
                    .addField(emoji_insta + "Instagram", "[@supersfanne](https://www.instagram.com/supersfanne/)", true) 
                    .addField(emoji_twitter + "Twitter", "[@SupersFanne](https://twitter.com/supersfanne)", true)
                    .addField(emoji_facebook + "Facebook", "[@Supers-Fanne](https://www.facebook.com/profile.php?id=100012028577867)", true)
                    .addField(emoji_snap + "Snapchat", "[supers_fanne](https://app.snapchat.com/web/deeplink/snapcode?username=supers_fanne&type=SVG&size=240)", true)
	    	    .addField(emoji_youtube + "YouTube", "[Supers Fanne](https://www.youtube.com/channel/UCc-OIiC2bDwFbEUXmsy_khg/?sub_confirmation=1)", true)
                .setFooter("Demande de @" + message.author.username + "#" + message.author.discriminator + " !")
                .setAuthor("Réseaux Sociaux de mon créateur")
                .setDescription("Pour l'actualité !")
                .setColor('#0000ff')
                .setTimestamp()
            message.delete()
            message.channel.send(reseau_embed)
            console.log(PREFIX +"reseau par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "reseau`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
    	break;
      
        case "google":
            let google = message.content.split(" ").slice(1);
            let suffix_google = google.join('%20')
            if(!suffix_google) return message.reply("Vous devez marquez quoi cherchez.")
            var google_embed = new Discord.RichEmbed()
                .setTitle("Recherche Google")
                .setDescription('[Résultat de là recherche](https://www.google.fr/#q=' + suffix_google + ")")
                .setColor('#36393E')
                .setFooter(foother)
                .setTimestamp()
            message.channel.send(google_embed)
            console.log(PREFIX +"google par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "google " + suffix_google + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;

        case "tradhelp":
            var tradhelp_embed = new Discord.RichEmbed()
                    .addBlankField()        
                    .addField(PREFIX + "tradenfr", "Traduction Anglais ==> Français !") 
                    .addField(PREFIX + "tradfren", "Traduction Français ==> Anglais !")
                    .addBlankField()
                    .addField(PREFIX + "tradesfr", "Traduction Espagnol ==> Français !")
                    .addField(PREFIX + "tradfres", "Taduction Français ==> Espagnol !")
                    .addBlankField()
                    .addField(PREFIX + "tradesen", "Traduction Espagnol ==> Anglais !")
                    .addField(PREFIX + "tradenes", "Taduction Anglais ==> Espagnol !")            
                .setColor("#00ffcc")
                .setFooter(foother)
                .setAuthor("Pannel des Traduction")
                .setDescription("Petit rappelle le, je vais seulement envoyé un liens google traduction !")
                .setTimestamp()
            message.delete()
            message.channel.send(tradhelp_embed)
            console.log(PREFIX +"tradhelp par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "tradhelp`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;      
      
        case "tradenfr":
            let tradenfr = message.content.split(" ").slice(1);
            let suffix_tradenfr = tradenfr.join('%20')
            if(!suffix_tradenfr) return message.reply("Vous devez marquez un texte à traduire")
            var tradenfr_embed = new Discord.RichEmbed()
                .setTitle("Traduction Anglais -> Français")
                .setDescription('[Voir la Traduction](https://translate.google.fr/#en/fr/' + suffix_tradenfr + ')')
                .setColor("#36393E")
                .setFooter(foother)
                .setTimestamp()
            message.channel.send(tradenfr_embed)
            console.log(PREFIX +"tradenfr par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "tradenfr" + suffix_tradenfr + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;
      
        case "tradfren":
            let tradfren = message.content.split(" ").slice(1);
            let suffix_tradfren = tradfren.join('%20')
            if(!suffix_tradfren) return message.reply("Vous devez marquez un texte à traduire")
            var tradfren_embed = new Discord.RichEmbed()
                .setTitle("Traduction Français -> Anglais")
                .setDescription('[Voir la Traduction](https://translate.google.fr/#fr/en/' + suffix_tradfren + ')')
                .setColor("#36393E")
                .setFooter(foother)
                .setTimestamp()
            message.channel.send(tradfren_embed)
            console.log(PREFIX +"tradfren par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "tradfren" + suffix_tradfren + "b`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;
      
        case "tradesfr":
            let tradesfr = message.content.split(" ").slice(1);
            let suffix_tradesfr = tradesfr.join('%20')
            if(!suffix_tradesfr) return message.reply("Vous devez marquez un texte à traduire")
            var tradesfr_embed = new Discord.RichEmbed()
                .setTitle("Traduction Espagnol -> Français")
                .setDescription('[Voir la Traduction](https://translate.google.fr/#es/fr/' + suffix_tradesfr + ')')
                .setColor("#36393E")
                .setFooter(foother)
                .setTimestamp()
            message.channel.send(tradesfr_embed)
            console.log(PREFIX +"tradesfr par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "tradesfr" + suffix_tradesfr + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;
      
        case "tradfres":
            let tradfres = message.content.split(" ").slice(1);
            let suffix_tradfres = tradfres.join('%20')
            if(!suffix_tradfres) return message.reply("Vous devez marquez un texte à traduire")
            var tradfres_embed = new Discord.RichEmbed()
                .setTitle("Traduction Français -> Espagnol")
                .setDescription('[Voir la Traduction](https://translate.google.fr/#fr/es/' + suffix_tradfres + ')')
                .setColor("#36393E")
                .setFooter(foother)
                .setTimestamp()
            message.channel.send(tradfres_embed)
            console.log(PREFIX +"tradfres par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "tradfres" + suffix_tradfres + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;      
      
        case "tradenes":
            let tradenes = message.content.split(" ").slice(1);
            let suffix_tradenes = tradenes.join('%20')
            if(!suffix_tradenes) return message.reply("Vous devez marquez un texte à traduire")
            var tradenes_embed = new Discord.RichEmbed()
                .setTitle("Traduction Anglais -> Espagnol")
                .setDescription('[Voir la Traduction](https://translate.google.fr/#en/es/' + suffix_tradenes + ')')
                .setColor("#36393E")
                .setFooter(foother)
                .setTimestamp()
            message.channel.send(tradenes_embed)
            console.log(PREFIX +"tradenes par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "tradenes" + suffix_tradenes + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;     

	    case "tradesen":
            let tradesen = message.content.split(" ").slice(1);
            let suffix_tradesen = tradesen.join('%20')
            if(!suffix_tradesen) return message.reply("Vous devez marquez un texte à traduire")
            var tradesen_embed = new Discord.RichEmbed()
                .setTitle("Traduction Espagnol -> Anglais")
                .setDescription('[Voir la Traduction](https://translate.google.fr/#es/en/' + suffix_tradesen + ')')
                .setColor("#36393E")
                .setFooter(foother)
                .setTimestamp()
            message.channel.send(tradesen_embed)
            console.log(PREFIX +"tradesen par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utiliser ``" + PREFIX + "tradesen" + suffix_tradesen + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
	    break;        

        case "annonce@":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            let staffs = message.content.split(" ");
            staffs.shift();
                var newm_embed = new Discord.RichEmbed()
                    .addField("Annonce!", " "+ staffs.join(" "))
                .setColor("#FF0000")
                .setTimestamp()
                .setFooter("Annonce de @" + message.author.username + "#" + message.author.discriminator + " | IlianBOT - " + version)
            message.delete();
            member.guild.channels.find("name", "annonce").send("@everyone **Nouvelle annonce**")
            member.guild.channels.find("name", "annonce").send(newm_embed)
            console.log(PREFIX +"annonce@ par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "annonce@ " + staffs.join(' ') + " `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;
      
        case "annonce":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            let staff = message.content.split(" ");
            staff.shift();
            var nw_embed = new Discord.RichEmbed()
                    .addField("Annonce!", " "+ staff.join(" "))
                .setColor("#FF0000")
                .setTimestamp()
                .setFooter("Annonce de @" + message.author.username + "#" + message.author.discriminator + " | IlianBOT - " + version)
            message.delete();
            member.guild.channels.find("name", "annonce").send(nw_embed);
            console.log(PREFIX +"annonce par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "annonce " + staff.join(' ') + " `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;

        case "botinfo":
            var load1_embed = new Discord.RichEmbed()
                .addField(':clock2: Chargement en cours.', "Merci de patienter quelques instants !")
            message.channel.send(load1_embed).then(message => message.edit(load2_embed)).then(message => message.edit(load3_embed)).then(message => message.edit(load4_embed)).then(message => message.edit(botinfo_embed));
            var load2_embed = new Discord.RichEmbed()
                .addField(':clock2: Chargement en cours..', "Merci de patienter quelques instants !")  
            var load3_embed = new Discord.RichEmbed()
                .addField(':clock2: Chargement en cours...', "Merci de patienter quelques instants !")   
            var load4_embed = new Discord.RichEmbed()
                .addField(':clock2: Chargement en cours.', "Merci de patienter quelques instants !")    
            let startTime = Date.now();
            var botinfo_embed = new Discord.RichEmbed()
                .setColor('#04B404')
                .setTitle('Mes informations :')
                    .addField("Serveurs :", "Je suis sur " + bot.guilds.array().length + " serveurs")
                    .addField("Membres :", "Je voit ``" + bot.users.size + " membres`` au total.")
                    .addField("Version :", "La version de mon système est : ``" + version + "`` !")
                    .addField("M'inviter", "https://discordapp.com/oauth2/authorize?client_id=446061218063581186&scope=bot&permissions=2146958591")
                    .addField("Mon Serveur:", "**EN DEV**")
                    .addField("Mon site :", "https://ilianbot.000webhostapp.com")
                    .addBlankField()
                    .addField('Mon Ping :', ':ping_pong: Pong !')
                    .addField(":clock2: Temps :", `${Date.now() - startTime} millisecondes`, true)
                    .addField(":heartpulse: API Discord :", `${bot.ping} millisecondes`, true)
                .setTimestamp()
                .setFooter(foother)
            console.log(PREFIX +"botinfo par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "botinfo`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
        break;
            
        case "install":
        // LOGS

            console.log(PREFIX +"install par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "install`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));

        // Channel 
        
                var channel_botlogs = "🤖bot-logs🤖";
                    
                var channel_commandelogs = "commandes-logs";
        
                var channel_vcs = "vcs-ilianbot";
        
                var channel_kick = "kick";
        
                var channel_ban = "ban";
        // Rôle 
        
                var role_ban = "Banni(e)";
                
                var role_ban_kick_couleur = "RED";
        
                var role_kick = "Kick";
        
                var role_mute_color = "BLUE";
        
                var role_mute = "Mute";
        
        // Le code
        
                if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
                message.delete()
                var langage_embed = new Discord.RichEmbed()
                    .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
                    .setColor("#36393E")
                    .setFooter(foother + " / " + footheren)
                    .setTimestamp()
                var installfr_embed = new Discord.RichEmbed()
                    .setAuthor("Panel d'installation", message.author.avatarURL)
                    .setDescription("🇫🇷Il te manque une réactions ? Ajoute la !🇫🇷")
                    .setTimestamp()
                    .setColor("#0099ff")
                        .addField("Partie 1,", "**Les channels** !")
                        .addField("📄", "Pour créer le channel : #" + channel_botlogs)
                        .addField("⚙", "Pour créer le channel : #" + channel_commandelogs)
                        .addField("🌐", "Pour créer le channel : #" + channel_vcs)
                        .addField("📛", "Pour créer le channel : #" + channel_ban)
                        .addField("🌪", "Pour créer le channel : #" + channel_kick)
                        .addBlankField()
                        .addField("Partie 2,", "**Les rôles** !")
                        .addField("⛔", "Pour crée rle rôle : @" + role_ban)
                        .addField("❌", "Pour créer le rôle : @" + role_kick)
                        .addField("🤐", "Pour créer le rôle : @" + role_mute)
                    .setFooter("Oublié pas de configurer les permission. Elle seront bientôt configuré automatiquement ! | " + foother)
                var installen_embed = new Discord.RichEmbed()
                    .setAuthor("Installation Panel", message.author.avatarURL)
                    .setDescription("🇬🇧Do you miss a reaction ? Add it !🇬🇧")
                    .setTimestamp()
                    .setColor("#4da6ff")
                        .addField("Part 1,", "**The channels** !")
                        .addField("📄", "To create the channel : #" + channel_botlogs)
                        .addField("⚙", "To create the channel : #" + channel_commandelogs)
                        .addField("🌐", "To create the channel : #" + channel_vcs)
                        .addField("📛", "To create the channel : #" + channel_ban)
                        .addField("🌪", "To create the channel : #" + channel_kick)
                        .addBlankField()
                        .addField("Part 2,", "**The roles** !")
                        .addField("⛔", "To create the role : @" + role_ban)
                        .addField("❌", "To create the role : @" + role_kick)
                        .addField("🤐", "To create the role : @" + role_mute)
                    .setFooter("Forgot to configure permissions. It will soon be configured automatically ! | " + footheren)
                const installmessage = await message.channel.send(langage_embed);
                await installmessage.react("🇫🇷");
                await installmessage.react("🇬🇧");
                const installpannier = installmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                installpannier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🇫🇷") {
                    installmessage.edit(installfr_embed);
                    installmessage.clearReactions();
                    await installmessage.react("📄");
                    await installmessage.react("⚙");
                    await installmessage.react("🌐");
                    await installmessage.react("📛");
                    await installmessage.react("🌪");
                    await installmessage.react("⛔");
                    await installmessage.react("❌");
                    await installmessage.react("🤐");
                    const installmsgreacfr = installmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                    installmsgreacfr.on('collect', async(reaction) => {
                    if (reaction.emoji.name === "📄") {
                        await reaction.remove(message.author.id)
                        if(member.guild.channels.find("name", channel_botlogs)) return message.channel.send("Le channel ``#" + channel_botlogs + "`` existe déjà !") 
                        message.guild.createChannel(channel_botlogs)
                        message.channel.send("Le channel ``#" + channel_botlogs + "`` à été créer avec succès !")
                    }
                    if (reaction.emoji.name === "⚙") {
                        await reaction.remove(message.author.id)
                        if(member.guild.channels.find("name", channel_commandelogs)) return message.channel.send("Le channel ``#" + channel_commandelogs + "`` existe déjà !") 
                        message.guild.createChannel(channel_commandelogs)
                        message.channel.send("Le channel ``#" + channel_commandelogs + "`` à été créer avec succès !")
                    }
                    if (reaction.emoji.name === "🌐") {
                        await reaction.remove(message.author.id)
                        if(member.guild.channels.find("name", channel_vcs)) return message.channel.send("Le channel ``#" + channel_vcs + "`` existe déjà !") 
                        message.guild.createChannel(channel_vcs)
                        message.channel.send("Le channel ``#" + channel_vcs + "`` à été créer avec succès !")
                    }
                    if (reaction.emoji.name === "📛") {
                        await reaction.remove(message.author.id)
                        if(member.guild.channels.find("name", channel_ban)) return message.channel.send("Le channel ``#" + channel_ban + "`` existe déjà !") 
                        message.guild.createChannel(channel_ban)
                        message.channel.send("Le channel ``#" + channel_ban + "`` à été créer avec succès !")
                    }
                    if (reaction.emoji.name === "🌪") {
                        await reaction.remove(message.author.id)
                        if(member.guild.channels.find("name", channel_kick)) return message.channel.send("Le channel ``#" + channel_kick + "`` existe déjà !") 
                        message.guild.createChannel(channel_kick)
                        message.channel.send("Le channel ``#" + channel_kick + "`` à été créer avec succès !")
                    }
                    if (reaction.emoji.name === "⛔") {
                        await reaction.remove(message.author.id)
                        if(member.guild.roles.find("name", role_ban)) return message.channel.send("Le rôle ``@" + role_ban + "`` existe déjà !") 
                        guild.createRole({
                            name: role_ban,
                            color: role_ban_kick_couleur,
                        })
                        message.channel.send("Le rôle ``@" + role_ban + "`` à été créer avec succès avec couleur ``" + role_ban_kick_couleur + "``!")
                    }
                    if (reaction.emoji.name === "❌") {
                        await reaction.remove(message.author.id)
                        if(member.guild.roles.find("name", role_kick)) return message.channel.send("Le rôle ``@" + role_kick + "`` existe déjà !") 
                        guild.createRole({
                            name: role_kick,
                            color: role_ban_kick_couleur,
                        })
                        message.channel.send("Le rôle ``@" + role_kick + "`` à été créer avec succès avec couleur ``" + role_ban_kick_couleur + "``!")
                    }
                    if (reaction.emoji.name === "🤐") {
                        await reaction.remove(message.author.id)
                        if(member.guild.roles.find("name", role_mute)) return message.channel.send("Le rôle ``@" + role_mute + "`` existe déjà !") 
                        guild.createRole({
                            name: role_mute,
                            color: role_mute_color,
                        })
                        message.channel.send("Le rôle ``@" + role_mute + "`` à été créer avec succès avec couleur ``" + role_mute_color + "``!")
                    }
                    await reaction.remove(message.author.id);
                    })
                    }
                    if (reaction.emoji.name === "🇬🇧") {
                        installmessage.edit(installen_embed);
                        installmessage.clearReactions();
                        await installmessage.react("📄");
                        await installmessage.react("⚙");
                        await installmessage.react("🌐");
                        await installmessage.react("📛");
                        await installmessage.react("🌪");
                        await installmessage.react("⛔");
                        await installmessage.react("❌");
                        await installmessage.react("🤐");
                        const installmsgreacen = installmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                        installmsgreacen.on('collect', async(reaction) => {
                            if (reaction.emoji.name === "📄") {
                                await reaction.remove(message.author.id)
                                if(member.guild.channels.find("name", channel_botlogs)) return message.channel.send("The channel ``#" + channel_botlogs + "`` already exists !") 
                                message.guild.createChannel(channel_botlogs)
                                message.channel.send("The channel ``#" + channel_botlogs + "`` was successfully creating !")
                            }
                            if (reaction.emoji.name === "⚙") {
                                await reaction.remove(message.author.id)
                                if(member.guild.channels.find("name", channel_commandelogs)) return message.channel.send("The channel ``#" + channel_commandelogs + "`` already exists !") 
                                message.guild.createChannel(channel_commandelogs)
                                message.channel.send("The channel ``#" + channel_commandelogs + "`` was successfully creating !")
                            }
                            if (reaction.emoji.name === "🌐") {
                                await reaction.remove(message.author.id)
                                if(member.guild.channels.find("name", channel_vcs)) return message.channel.send("The channel ``#" + channel_vcs + "`` already exists !") 
                                message.guild.createChannel(channel_vcs)
                                message.channel.send("The channel ``#" + channel_vcs + "`` was successfully creating !")
                            }
                            if (reaction.emoji.name === "📛") {
                                await reaction.remove(message.author.id)
                                if(member.guild.channels.find("name", channel_ban)) return message.channel.send("The channel ``#" + channel_ban + "`` already exists !") 
                                message.guild.createChannel(channel_ban)
                                message.channel.send("The channel ``#" + channel_ban + "`` was successfully creating !")
                            }
                            if (reaction.emoji.name === "🌪") {
                                await reaction.remove(message.author.id)
                                if(member.guild.channels.find("name", channel_kick)) return message.channel.send("The channel ``#" + channel_kick + "`` already exists !") 
                                message.guild.createChannel(channel_kick)
                                message.channel.send("The channel ``#" + channel_kick + "`` was successfully creating !")
                            }
                            if (reaction.emoji.name === "⛔") {
                                await reaction.remove(message.author.id)
                                if(member.guild.roles.find("name", role_ban)) return message.channel.send("The rôle ``@" + role_ban + "`` already exists !") 
                                guild.createRole({
                                    name: role_ban,
                                    color: role_ban_kick_couleur,
                                })
                                message.channel.send("The rôle ``@" + role_ban + "`` was successfully creating with color ``" + role_ban_kick_couleur + "``!")
                            }
                            if (reaction.emoji.name === "❌") {
                                await reaction.remove(message.author.id)
                                if(member.guild.roles.find("name", role_kick)) return message.channel.send("The rôle ``@" + role_kick + "`` already exists !") 
                                guild.createRole({
                                    name: role_kick,
                                    color: role_ban_kick_couleur,
                                })
                                message.channel.send("The rôle ``@" + role_kick + "`` was successfully creating with color ``" + role_ban_kick_couleur + "``!")
                            }
                            if (reaction.emoji.name === "🤐") {
                                await reaction.remove(message.author.id)
                                if(member.guild.roles.find("name", role_mute)) return message.channel.send("The rôle ``@" + role_mute + "`` already exists !") 
                                guild.createRole({
                                    name: role_mute,
                                    color: role_mute_color,
                                })
                                message.channel.send("The rôle ``@" + role_mute + "`` was successfully creating with color ``" + role_mute_color + "``!")
                            }
                        await reaction.remove(message.author.id);
                        })
                    }
                })
            break;

            case "servinfo":
                console.log(PREFIX +"servinfo par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "servinfo`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                var load1_embed = new Discord.RichEmbed()
                    .addField(':clock2: Chargement en cours.', "Merci de patienter quelques instants !")
                message.channel.send(load1_embed).then(message => message.edit(load2_embed)).then(message => message.edit(load3_embed)).then(message => message.edit(load4_embed)).then(message => message.edit(servinfo_embed));
                var load2_embed = new Discord.RichEmbed()
                    .addField(':clock2: Chargement en cours..', "Merci de patienter quelques instants !")  
                var load3_embed = new Discord.RichEmbed()
                    .addField(':clock2: Chargement en cours...', "Merci de patienter quelques instants !")   
                var load4_embed = new Discord.RichEmbed()
                    .addField(':clock2: Chargement en cours.', "Merci de patienter quelques instants !")       
                var servinfo_embed = new Discord.RichEmbed()
                    .setAuthor("Information du Serveur", message.author.avatarURL)
                        .addField("Nom du Serveur :", "Le serveur s'appelle : ``" + message.guild.name + "``.", true)
                        .addField("ServeurID :", "L'ID du serveur est : ``" + message.guild.id + "``.", true)
                        .addField("Création du Serveur", "Le serveur à été crée le : ``" + message.guild.createdAt + "``.", true)
                        .addField("Fondateur :", "Le fondateur du serveur est : " + message.guild.owner + ".", true)
                        .addField("FondateurID :", "L'ID du Fondteur est : ``" + message.guild.ownerID + "``.", true)
                        .addField("Membres :", "Nous sommes actuellement ``" + message.guild.memberCount  + " membres`` au total.", true)
                    .setColor("#FF0000")
                    .setFooter(foother)
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL)
            break;
            
         /*   case "servlistembed":
                console.log(PREFIX +"servlist par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "servlist`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                var langage_embed = new Discord.RichEmbed()
                    .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
                    .setColor("#36393E")
                    .setFooter(foother + " / " + footheren)
                    .setTimestamp()
                var servlistfr_embed = new Discord.RichEmbed()
                    .setAuthor("Liste des serveurs", message.author.avatarURL)
                    .setDescription(bot.guilds.map(r => r.name + ` ► **${r.memberCount}** membres\nPropriétaire du serveur ► **${r.owner}**\n`))
                    .setFooter(foother)
                    .setColor("#819FF7")
                    .setTimestamp()
                var servlisten_embed = new Discord.RichEmbed()
                    .setAuthor("List of servers", message.author.avatarURL)
                    .setDescription(bot.guilds.map(r => r.name + ` ► **${r.memberCount}** members\nOwner of the server ► **${r.owner}**\n`))
                    .setFooter(footheren)
                    .setColor("#CC2EFA")
                    .setTimestamp()
                const servlistmessage = await message.channel.send(langage_embed);
                await servlistmessage.react("🇫🇷");
                await servlistmessage.react("🇬🇧");
                const servlisrpannier = servlistmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                servlisrpannier.on('collect', async(reaction) => {
                    if (reaction.emoji.name === "🇫🇷") {
                        servlistmessage.edit(servlistfr_embed)
                    }
                    if (reaction.emoji.name === "🇬🇧") {
                        servlistmessage.edit(servlisten_embed)
                    }
                    await reaction.remove(message.author.id)
                })
            break; */

            case "servlist":
                console.log(PREFIX +"servlist par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "servlist`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                var langage_embed = new Discord.RichEmbed()
                    .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
                    .setColor("#36393E")
                    .setFooter(foother + " / " + footheren)
                    .setTimestamp()
                var servlistfr_embed = new Discord.RichEmbed()
                    .setAuthor("Liste des serveurs", message.author.avatarURL)
                    .setDescription(bot.guilds.map(r => r.name + ` ► **${r.memberCount}** membres\n`))
                    .setFooter(foother)
                    .setColor("#819FF7")
                    .setTimestamp()
                var servlisten_embed = new Discord.RichEmbed()
                    .setAuthor("List of servers", message.author.avatarURL)
                    .setDescription(bot.guilds.map(r => r.name + ` ► **${r.memberCount}** members\n`))
                    .setFooter(footheren)
                    .setColor("#CC2EFA")
                    .setTimestamp()
                const servlistmessage = await message.channel.send(langage_embed);
                await servlistmessage.react("🇫🇷");
                await servlistmessage.react("🇬🇧");
                const servlisrpannier = servlistmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                servlisrpannier.on('collect', async(reaction) => {
                    if (reaction.emoji.name === "🇫🇷") {
                        servlistmessage.edit(servlistfr_embed)
                    }
                    if (reaction.emoji.name === "🇬🇧") {
                        servlistmessage.edit(servlisten_embed)
                    }
                    await reaction.remove(message.author.id)
                })
            break;

            case "modehelp":
                if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu n'as pas la permission d'exécuter la commande. :x:");
                    console.log(PREFIX +"modehelp par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                    bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "mode`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                    var langage_embed = new Discord.RichEmbed()
                        .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
                        .setColor("#36393E")
                        .setFooter(foother + " / " + footheren)
                        .setTimestamp()
                    var modehelpfr_embed = new Discord.RichEmbed()
                        .setAuthor("Explication du système de modération", message.author.avatarURL)
                            .addField("Histoire,", "Le système de modération a été pensé et réalisé par mon fondateur. ( <@193092758267887616> ) ")
                            .addField("Fonctionnement,", "Le fonctionnement de ce système est très simple, la personne qui se fera bannir où kick avec les commandes perdra tous les rôles qu'il a actuellement et obtiendra le rôle kick ou banni(e) ( cela dépend bien sûre de la sanction) et n'aura accès qu'à un seul channel nommé kick ou ban sans la permission d'écrire.")
                            .addField("Pourquoi,", "Pourquoi le bot ban/kick pas vraiment ? La raison est très simple, quand une personne se fait kick où ban il ne cherchera pas forcément une invitation pour revenir donc comme il aura accès qu'a un seul channel il pourra tout de même rester sur le serveur.")
                            .addField("Une question ?", "Contacter mon créateur en venant sur mon serveur officiel ou en utilisant ``" + PREFIX + "ask`` pour poser votre question.")
                        .setFooter(foother)
                        .setColor("#8181F7")
                        .setTimestamp()
                    var modehelpen_embed = new Discord.RichEmbed()
                        .setAuthor("Explanation of the moderation system", message.author.avatarURL)
                            .addField("History,", "The system of moderation was thought and realized by my founder. ( <@193092758267887616> ) ")
                            .addField("Operation,", "The operation of this system is very nice, the person who will be banned or kicked with my commands will lose all the roles he currently has and get the role Kick or Banni(e) (( this depends of course on the sanction) and will have access to only 1 channel named kick or ban without permission to write.")
                            .addField("Why,", "Why the bot ban/kick not really ? The reason is very simple, when a person is kicked or ban he will not necessarily seek an invitation to return so as he will have access to a single channel he can still stay on the server.")
                            .addField("A question ?", "Contact my creator by coming to my official server or use ``" + PREFIX + "ask`` to ask your question.")
                        .setFooter(footheren)
                        .setColor("#8181F7")
                        .setTimestamp()    
                const modehelpmessage = await message.channel.send(langage_embed);
                await modehelpmessage.react("🇫🇷");
                await modehelpmessage.react("🇬🇧");
                const modehelppannier = modehelpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                modehelppannier.on('collect', async(reaction) => {
                    if (reaction.emoji.name === "🇫🇷") {
                        modehelpmessage.edit(modehelpfr_embed)
                    }
                    if (reaction.emoji.name === "🇬🇧") {
                        modehelpmessage.edit(modehelpen_embed)
                    }
                    await reaction.remove(message.author.id)
                })
            break;
            
            case "ask":
                let ask = message.content.split(" ").slice(1);
                let suffix_ask = ask.join(' ')
                if(!suffix_ask) return message.reply("Vous devez marquez votre question.")
                var ask_embed = new Discord.RichEmbed()
                .setAuthor("Question", message.author.avatarURL)
                    .addField("Question de :", message.author.toString() + "( ``" + message.author.id + "`` )")
                    .addField("Provenance du message : ", "``" + message.guild.name + "``" + "( ``" + message.guild.id + "`` )")
                    .addField("Ça question : ",  suffix_ask)
                .setTimestamp()
                .setFooter(foother)
                .setColor("#FE9A2E")
                message.client.users.get("193092758267887616").send(ask_embed)
                message.delete();
                message.channel.reply("votre question/suggestion/report a bien été envoyé !")
                console.log(PREFIX +"ask par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "ask`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
            break;

            case "userinfo":
                message.delete()
                console.log(PREFIX +"userinfo par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                bot.channels.findAll("name", "commandes-logs").map(channel => channel.send("**" + message.author.username + "#" + message.author.discriminator + "** a utilisé ``" + PREFIX + "userinfo`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``"));
                    var langage_embed = new Discord.RichEmbed()
                        .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
                        .setColor("#36393E")
                        .setFooter(foother + " / " + footheren)
                        .setTimestamp() 
                    var userinfofr_embed = new Discord.RichEmbed()
                        .setAuthor("Vos informations", message.author.avatarURL)
                            .addField("Votre ID :", message.author.id)
                            .addField("Votre Discriminateur :", message.author.discriminator, true)
                            .addField("Votre nom Discord :", message.author.username, true)
                            .addField("Votre compte a été créé le :", message.author.createdAt)
                        .setColor("#58D3F7")
                        .setThumbnail(message.author.avatarURL)
                        .setFooter(foother)
                        .setTimestamp()
                    var userinfoen_embed = new Discord.RichEmbed()
                        .setAuthor("Your informations", message.author.avatarURL)
                            .addField("Your ID :", message.author.id)
                            .addField("Your Discriminateur :", message.author.discriminator, true)
                            .addField("Your discord name :", message.author.username, true)
                            .addField("Your account was created on :", message.author.createdAt)
                        .setColor("#0174DF")
                        .setThumbnail(message.author.avatarURL)
                        .setFooter(foother)
                        .setTimestamp()
                const userinfomessage = await message.channel.send(langage_embed);
                await userinfomessage.react("🇫🇷");
                await userinfomessage.react("🇬🇧");
                const userinfopannier = userinfomessage.createReactionCollector((reaction, user) => user.id === message.author.id);
                userinfopannier.on('collect', async(reaction) => {
                    if (reaction.emoji.name === "🇫🇷") {
                        userinfomessage.edit(userinfofr_embed)
                    }
                    if (reaction.emoji.name === "🇬🇧") {
                        userinfomessage.edit(userinfoen_embed)
                    }
                    await reaction.remove(message.author.id)
                })
        break;
        
    /*    case "majinfo":
                if (message.author.id === "193092758267887616") {
                        var maj_embed = new Discord.RichEmbed()
                        .setAuthor("Update " + version, message.author.avatarURL)
                            .addField("🇫🇷Petite Update🇫🇷,", `__**LA V.1.3.0**__ **!!!! Sinon le stop est opérationnel, des nouvelles commandes ont fait apparition-leur apparition, ( un *userinfo, *s pour le skip et *p pour le play) et quelque faute ont été corrigés dans le menu d'aide**.`)
                            .addField("🇬🇧Little Update🇬🇧,", `*__**THE V.1.3.0**__ **!!!! Otherwise, the shutdown is operational, new commands are popping up, ( a* userinfo, *s for skip and  p for the game ) and some faults have been corrected in the help menu**.`)
                            .addField("🇪🇸Pequeña de idioma🇪🇸,", `__**LA V.1.3.0**__ **!!!! De lo contrario, la parada está operativa, han aparecido nuevos comandos : su apariencia, (a *userinfo, *s para el skip y *p para play) y algunos errores han sido corregidos en el menú de ayuda**.`)
                        .setColor("#00FF6F")
                        .setFooter("Cette fois c'étais pas google trad :o ! " + version)
                        .setThumbnail(message.author.avatarURL)
                        .setTimestamp()
                    bot.channels.findAll('name', 'bot-update').map(channel => channel.send(maj_embed));
                    message.delete()
                }
        break; 

   /*     case "changeprefix":
            if(!prefixes[message.guild.id]){
                prefixes[message.guild.id] = {
                prefixes: PREFIX
                };
            }
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            let prefix = message.content.split(" ").slice(1);
            let suffix_prefix = prefix.join('%20')
            if(!suffix_prefix) return message.reply("Vous devez entrer un nouveau prefix !")
            fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
                if (err) console.log(err)
                message.reply("Le prefix a été changer pour " + args[0])
            });
        break;*/
    }
});

bot.login(process.env.TOKEN)
