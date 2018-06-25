const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "*";
const queue = new Map();
const fs = require("fs");

var client = new Discord.Client();

var version = "V.1.2.6"

var bot = new Discord.Client();

//let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));

var emoji_instaID = "457965848301404162"
, emoji_twitterID = "457957941883043871"
, emoji_facebookID = "457965866051698688"
, emoji_snapID = "457975117818101791"

var emoji_insta = "<:emoji_insta:" + emoji_instaID + ">"
, emoji_twitter = "<:emoji_twitter:" + emoji_twitterID + ">"
, emoji_facebook = "<:emoji_facebook:" + emoji_facebookID + ">"
, emoji_snap = "<:emoji_snap:" + emoji_snapID + ">"

var servers = {};

function play(connection, message) {
 var server = servers[message.guild.id];
    
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    
    server.queue.shift();
    
    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}

bot.on("ready", function () {
    bot.user.setActivity("IlianBOT - " + PREFIX + "help", {
        'type': 'STREAMING',
        'url': "https://www.twitch.tv/supers_fanne"
}),
    bot.user.setUsername("IlianBOT")
    console.log("IlianBOT - Connecté");
});

bot.on('message', function(message) {
       if(message.content === 'Ta mère la grosse pute') { // # cencure
            message.reply('Surveille ton language jeune insolents !')
            message.delete()
           console.log("C'est quoi ce language " + message.author.username + " !")
       }
});

    bot.on("guildMemberAdd", function(message) {
        var join_embed = new Discord.RichEmbed()
        .setAuthor("Nouveau Membre :")
        .setTitle("Bienvenue " + message.user.username + " sur " + message.guild.name + " ! :white_check_mark:")
        .setColor("#3333cc")
        .setTimestamp()
        message.guild.channels.find("name", "🤖bot-logs🤖").sendEmbed(join_embed);
        message.addRole(message.guild.roles.find("name", "Membre"));
    });
    
    bot.on("guildMemberRemove", function(message) {
        message.guild.channels.find("name", "🤖bot-logs🤖").sendMessage("A bientôt " + message.toString() + " sur ``" + message.guild.name + "`` !");
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

    var roleJoueur= member.guild.roles.find("name", "Membre")
    
    var roleMute = member.guild.roles.find("name", "Mute")

    var foother = "Demande de @" + message.author.username + "#" + message.author.discriminator + " ! | IlianBOT - " + version

    var footheren = "Request by @" + message.author.username + "#" + message.author.discriminator + " ! | IlianBOT - " + version
    
    var modlog = member.guild.channels.find("name", "🤖bot-logs🤖")
    
    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
        case "play":
            if (!args[1]) {
                message.channel.send(":loudspeaker:[``IlianBOT - Musique``] - **Vous devez mettre un lien**.");   
                console.log(PREFIX +"play par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "play `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
                console.log(message.author.username + " à oubliée de mettre un liens")
                return;
            }
            if(!message.member.voiceChannel) {
                message.channel.send(":loudspeaker:[``IlianBOT - Musique`] - **Vous devez être dans un salon vocal**."); 
                console.log(PREFIX +"play par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
                member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "play `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
                console.log(message.author.username + " est pas dans un salon vocale.")  
                return;
            }
            
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };
            
            var server = servers[message.guild.id];
                  message.channel.send(":loudspeaker:[``IlianBOT - Musique``] - **Musique en cour ** : ``" + args[1] + "``");
            server.queue.push(args[1]);
            
            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
               play(connection, message) 
            });
            console.log(PREFIX +"play par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "play `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break;    
    
        case "skip":
            if(!message.member.voiceChannel) {
                message.channel.send(":loudspeaker:[``IlianBOT - Musique``] - **Vous devez être dans un salon vocal**.");   
                return;
            }
            var server = servers[message.guild.id];
            message.channel.send(":loudspeaker:[``IlianBOT - Musique``] - **Passage à la musique suivante**");
            if(server.dispatcher) server.dispatcher.end();
            console.log(PREFIX +"skip par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "skip `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break;  

        case "stop":
            if(!message.member.voiceChannel) {
                message.channel.send(":warning:[``IlianBOT - Musique``] - **Vous devez être dans un salon vocal**.");   
                return;
            }
            const serverQueue = queue.get(message.guild.id);
            var server = servers[message.guild.id];
            if (!serverQueue) return message.channel.send(":warning:[``IlianBOT - Musique``] - **Fin de la session de musique.**")
            if(!message.guild.voiceConnection) message.member.voiceChannel.leave().then(function(connection) {
                stop(connection, message) 
            });
            console.log(PREFIX +"stop par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "stop `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break; 

        case "unmute":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            if(!modlog) return message.reply("Je ne trouve pas de channel log.");
            var member = message.mentions.members.first();
            if (message.mentions.users.size < 1) return message.reply("À qui je retire la sanction: ``Mute`` ?")
            member.removeRole(roleMute)
            message.channel.send(user.toString() + " a bien été unmute ✅")
            console.log(PREFIX +"unmute par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "unmute " + user.username.toString() + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
      
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
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "mute " + user.username.toString() +" `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
             
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
                .addField(PREFIX + "hinstall", "Cette commande permet de voir le Panel d'Installation.")
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
                .addField(PREFIX + "hinstall", "This command allows you to see the Installation Panel.")
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

        case "hinstall":
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            var language_embed = new Discord.RichEmbed()
                .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
                .setColor("#36393E")
                .setFooter(foother + "/" + footheren)
            var installfr_embed = new Discord.RichEmbed()
                    .addField(PREFIX + "administration", "**Cette commande permet de** __**créer les salon et rôles**__ **dont j'ai besoin pour l'administration.**.")
                    .addField(PREFIX + "log", "**Cette commande permet de** __**créer le salon des logs**__.")
                    .addField(PREFIX + "install", "**Cette commande permet de** __**créer tout les salons et rôles**__ **dont j'ai besoin**.")
                .setColor("#cc0000")
                .setAuthor("Panel d'Installation")
                .setFooter(foother)
                .setTimestamp()
            var installen_embed = new Discord.RichEmbed()
                    .addField(PREFIX + "administration", "This command __**creates the channels and roles**__ **needed for administration**.")
                    .addField(PREFIX + "log", "**This command** __**creates the log channel**__.")
                    .addField(PREFIX + "install", "**This command** __**creates all the rooms and roles**__ **needed**.")
                .setColor("#cc0000")
                .setAuthor("Panel d'Installation")
                .setTimestamp()
                .setFooter(footheren)
            message.delete()
            const hinstall = await message.channel.send(language_embed);
            await hinstall.react("🇫🇷");
            await hinstall.react("🇬🇧");
            const hinstallr = hinstall.createReactionCollector((reaction, user) => user.id === message.author.id);
            hinstallr.on('collect', async(reaction) => {
                if (reaction.emoji.name === "🇫🇷") {
                    hinstall.edit(installfr_embed);
                }
                if (reaction.emoji.name === "🇬🇧") {
                    hinstall.edit(installen_embed);
                }
                await reaction.remove(message.author.id);
            })
            console.log(PREFIX +"hinstall par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "hinstall `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break;           

        case "help":
        message.delete()
        var language_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Sélecteur de langue/Language selector🇬🇧🛠 !")
            .setColor("#36393E")
            .setFooter(foother + "/" + footheren)
        var startfr_embed = new Discord.RichEmbed()
            .setTitle("🛠🇫🇷Menu d'aide🇫🇷🛠 !")
                .addField("Si tu a un problème avec les réactions ( qui sont toute enlever ) ajoute les toi même ! ( :one: :two: :three: )", "**Pour naviguer dans le menu d'aide, utilisez les réactions si-dessous.**")
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
                .addField(PREFIX + "traductionhelp", "**Pour affichier l'aide des** __**traductions**__ !")
                .addField(PREFIX + "servinfo", "**Grâce à cette commande, tu pourras savoir les** __**informations du serveur**__ !")
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
                .addField(PREFIX + "traductionhelp", "**With this command you will be able to see the __**translation panel**__ !")
                .addField(PREFIX + "servinfo", "**With this command, you will be able to know the** __**information of the server**__ !")
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
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "kick " + user.username.toString() + " `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
                
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
            console.log(PREFIX +"unkick par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "unkick " + user.username.toString() + " `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");             
            
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
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utilisé ``" + PREFIX + "ban " + user.username.toString() + " `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
                
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
            console.log(PREFIX +"unban par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utilisé ``" + PREFIX + "unban " + user.username.toString() +" `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
                
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
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utilisé ``" + PREFIX + "purge " + messagecount + " `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break;

        case "reseau":
            var reseau_embed = new Discord.RichEmbed()
                    .addField(emoji_insta + "Instagram", "[@supersfanne](https://www.instagram.com/supersfanne/)", true) 
                    .addField(emoji_twitter + "Twitter", "[@SupersFanne](https://twitter.com/supersfanne)", true)
                    .addField(emoji_facebook + "Facebook", "[@Supers-Fanne](https://www.facebook.com/profile.php?id=100012028577867)", true)
                    .addField(emoji_snap + "Snapchat", "[@supers_fanne](https://app.snapchat.com/web/deeplink/snapcode?username=supers_fanne&type=SVG&size=240)")
                .setFooter("Demande de @" + message.author.username + "#" + message.author.discriminator + " !")
                .setAuthor("Réseaux Sociaux De Supers Fanne")
                .setDescription("Pour l'actualité !")
                .setColor('#0000ff')
                .setTimestamp()
            message.delete()
            message.channel.send(reseau_embed)
            console.log("Mes reseau " + message.author.username + " !")
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
            message.channel.send(google_embed)
            console.log("J'ai rechercher!" + message.author.username + " !!");
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
            console.log("Il veut traduire " + message.author.username + " !")
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
            message.channel.send(tradenfr_embed)
            console.log("Traduction Anglais -> Français");
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
            message.channel.send(tradfren_embed)
            console.log("Traduction Français -> Anglais");
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
            message.channel.send(tradesfr_embed)
            console.log("Traduction Espagnol -> Français");
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
            message.channel.send(tradfres_embed)
            console.log("Traduction Français -> Espagnol");
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
            message.channel.send(tradenes_embed)
            console.log("Traduction Anglais -> Espagnol");      
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
            message.channel.send(tradesen_embed)
            console.log("Traduction Espagnol -> Anglais");
	    break;        

        case "annonce@":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
            message.delete()
            let staffs = message.content.split(" ");
            staffs.shift();
                var newm_embed = new Discord.RichEmbed()
                    .addField("Annonce!", " "+ staffs.join(" "))
                .setColor("#FF0000")
                .setFooter("Annonce de @" + message.author.username + "#" + message.author.discriminator + " | IlianBOT - " + version)
            message.delete();
            member.guild.channels.find("name", "annonce").send("@everyone **Nouvelle annonce**")
            member.guild.channels.find("name", "annonce").send(newm_embed)
            console.log(PREFIX +"new@ par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utilisé ``" + PREFIX + "new@ + " + staffs.join(" ") + "`` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break;
      
        case "annonce":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
            message.delete()
            let staff = message.content.split(" ");
            staff.shift();
            var nw_embed = new Discord.RichEmbed()
                    .addField("Annonce!", " "+ staff.join(" "))
                .setColor("#FF0000")
                .setFooter("Annonce de @" + message.author.username + "#" + message.author.discriminator + " | IlianBOT - " + version)
            message.delete();
            member.guild.channels.find("name", "annonce").send(nw_embed);
            console.log(PREFIX +"new par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utilisé ``" + PREFIX + "new " + staff.join(' ') + " `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
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
            message.channel.send(ping_embed).then(message => message.edit(botinfo_embed));
            var botinfo_embed = new Discord.RichEmbed()
                .setColor('#04B404')
                .setTitle('Mes informations :')
                    .addField("Serveurs :", "Je suis sur " + bot.guilds.array().length + " serveurs")
                    .addField("Membres :", "Je voit ``" + bot.users.size + " membres`` au total.")
                    .addField("Version :", "La version de mon système est : ``" + version + "`` !")
                    .addBlankField()
                    .addField('Mon Ping :', ':ping_pong: Pong !')
                    .addField(":clock2: Temps :", `${Date.now() - startTime} millisecondes`, true)
                    .addField(":heartpulse: API Discord :", `${bot.ping} millisecondes`, true)
                .setTimestamp()
                .setFooter(foother)
        break;

        case "vcs":
            let xoargs = message.content.split(" ").slice(1);
            let suffix = xoargs.join(' ')
            var xo02 = message.guild.channels.find('name','vcs-ilianbot');
            if(!xo02) return message.reply("Le channel vcs-ilianbot est introuvable faites " + PREFIX + "ivcs pour le crée ou " + PREFIX + "install pour installer tout les salons dons j'ai besoin !")
            if(message.channel.name !== 'vcs-ilianbot') return message.reply("Commande a effectuer dans #vcs-ilianbot")
            if(!suffix) return message.channel.send("Merci d'écrire un message à envoyé dans la globalité des discord")
            if (message.author.id === "193092758267887616") {
                const fondateur_embed = new Discord.RichEmbed()
                    .setColor("#DB1414")
                    .setAuthor("Fondateur – VCS", message.guild.iconURL)
                        .addField("Message de : " + message.author.username + "#" + message.author.discriminator, suffix)
                        .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                    .setThumbnail(message.author.avatarURL)
                    .setFooter("Ilian's Community | IlianBOT - " + version)
                    .setTimestamp()
                message.delete()
                return bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(fondateur_embed));
            } 
            if (message.author.id === "274240989944610827") {
                const love_embed = new Discord.RichEmbed()
                    .setColor("#F24D4A")
                    .setAuthor("💘MON COEUR EN SUCRE💘 – VCS", message.guild.iconURL)
                    .setDescription(suffix)
                        .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                        .addField("Message de : ", message.author.toString())
                        .setThumbnail(message.author.avatarURL)
                    .setFooter("Ilian's Community | IlianBOT - " + version)
                    .setTimestamp()
                message.delete()
                return bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(love_embed));
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
                    .setDescription(suffix)
                        .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                        .addField("Message de : ", message.author.toString())
                        .setThumbnail(message.author.avatarURL)
                    .setFooter("Ilian's Community | IlianBOT - " + version)
                    .setTimestamp()
                message.delete()
                bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(vcs_embed));
            }
        break;
            
        case "ivcs":
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            message.guild.createChannel('vcs-ilianbot')
            console.log(PREFIX +"ivcs par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utilisé ``" + PREFIX + "ivcs `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break; 

        case "log":
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            message.guild.createChannel('🤖bot-logs🤖')
            message.guild.createChannel('staff-logs')
            message.channel.send("Les salons ``#🤖bot-logs🤖`` et ``#staff-logs`` ont bien été crée ! ✅\nMerci de configuré les permissions")
            console.log(PREFIX +"log par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utilisé ``" + PREFIX + "log `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break;

        case "administration":
            message.channel.send("Les salons ``#kick`` et ``#ban`` on été crée✅.\nLes rôles ``@Kick``, ``@Mute`` et ``@Banni(e)`` on été crée.✅\nMerci de configuré les permissions")
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
            message.guild.createChannel('kick')
            message.guild.createChannel('ban')
            message.channel.send("Les salons ``#kick`` et ``#ban`` on été crée✅.\nLes rôles ``@Kick``, ``@Mute`` et ``@Banni(e)`` on été crée.✅\nMerci de configuré les permissions")
                guild.createRole({
                    name: 'Banni(e)',
                    color: 'RED',
                })
                .then(role => console.log(`Le rôle ${role.name} à été crée et a pour couleur ${role.color}`))
                .catch(console.error)
                guild.createRole({
                    name: 'Kick',
                    color: 'RED',
                })
                .then(role => console.log(`Le rôle ${role.name} à été crée et a pour couleur ${role.color}`))
                .catch(console.error)    
                guild.createRole({
                    name: 'Mute',
                    color: 'BLUE',
                })
                .then(role => console.log(`Le rôle ${role.name} à été crée et a pour couleur ${role.color}`))
                .catch(console.error)   
            console.log(PREFIX +"administration par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utilisé ``" + PREFIX + "administration `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break;

        case "install":
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
        message.guild.createChannel('vcs-ilianbot')
        message.guild.createChannel('staff-logs')
        message.guild.createChannel('🤖bot-logs🤖')
        message.guild.createChannel('kick')
        message.guild.createChannel('ban')
        console.log(PREFIX +"install par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
        message.channel.send("Les salons ``#vcs``, ``#🤖bot-logs🤖``, ``#staff-logs``, ``#kick``, ``#ban`` on été crée✅.\nLes rôles ``@Kick``, ``@Mute`` et ``@Banni(e)`` on été crée.✅\nMerci de configuré les permissions.")
        guild.createRole({
            name: 'Banni(e)',
            color: 'RED',
        })
        .then(role => console.log(`Le rôle ${role.name} à été crée et a pour couleur ${role.color}`))
        .catch(console.error)
        guild.createRole({
            name: 'Kick',
            color: 'RED',
        })
        .then(role => console.log(`Le rôle ${role.name} à été crée et a pour couleur ${role.color}`))
        .catch(console.error)    
        guild.createRole({
            name: 'Mute',
            color: 'BLUE',
        })
        .then(role => console.log(`Le rôle ${role.name} à été crée et a pour couleur ${role.color}`))
        .catch(console.error)        
        break;

        case "servinfo":
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
                    .addField("Nom du Serveur :", "Le serveur s'appelle : ``" + message.guild.name + "`.", true)
                    .addField("ServeurID :", "L'ID du serveur est : ``" + message.guild.id + "``.", true)
                    .addField("Création du Serveur", "Le serveur à été crée le : ``" + message.guild.createdAt + "``.", true)
                    .addField("Fondateur :", "Le fondateur du serveur est : " + message.guild.owner + ".", true)
                    .addField("FondateurID :", "L'ID du Fondteur est : ``" + message.guild.ownerID + "``.", true)
                    .addField("Membres :", "Nous sommes actuellement ``" + message.guild.memberCount  + " membres`` au total.", true)
                .setColor("#FF0000")
                .setFooter(foother)
                .setThumbnail(message.guild.iconURL)
        break;        
        
 /*       case "majinfo":
           if (message.author.id === "193092758267887616") {
                var maj_embed = new Discord.RichEmbed()
                .setAuthor("Update " + version, message.author.avatarURL)
                    .addField("🇫🇷Langage Update🇫🇷,", "**Vous pouvez changer le langage de la plupart des commandes ( avec embed ) en utilisant les réactions (🇫🇷/🇬🇧) **.")
                    .addField("🇬🇧Language Update🇬🇧,", "**You can change the language of most commands ( with embed ) by using the reactions (🇫🇷/🇬🇧)**.")
                    .addField("🇪🇸Actualización de idioma🇪🇸,", "**Puede cambiar el idioma de la mayoría de los comandos ( con embed ) al usar las reacciones (🇫🇷/🇬🇧)**.")
                .setColor("#00FF6F")
                .setFooter(version)
                .setThumbnail(message.author.avatarURL)
            bot.channels.findAll('name', 'bot-update').map(channel => channel.send(maj_embed));
            message.delete()
            }
        break; */

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

bot.login(process.env.TOKEN);
