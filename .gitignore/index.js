const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "*";
const queue = new Map();
const fs = require("fs");

var client = new Discord.Client();

var version = "V.1.2.4"

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
            var start_embed = new Discord.RichEmbed()
                .setTitle("🛠Menu d'aide🛠 !")
                .setDescription("**Pour naviguer dans le menu d'aide du staff, utilisez les réactions si-dessous.**")
                .setColor("#36393E")
                .setFooter(foother)
            var shelp1_embed = new Discord.RichEmbed()
                .setTitle("Commande qui demande au moins le modo ( sauf pour le kick )")
                .setColor("#cc0000")
                    .addField(PREFIX + "purge", "Cette commande permet de supprimé des messages beaucoup plus rapidement ! Pour l'utiliser, faites " + PREFIX + "purge (nombredemessages)")
                    .addField(PREFIX + "mute", "Cette commande permet de muté un utilisateur pendant un certain temps. Pour l'utiliser, faites " + PREFIX + "mute @(utilisateur) + (raison)")
                    .addField(PREFIX + "unmute", "Cette commande permet d'unmute un utilisateur. Pour l'utiliser, faites " + PREFIX + "unmute @(utilisateur)")
                .setFooter("Page 1/3 | " + foother)
            var shelp2_embed = new Discord.RichEmbed()
                .setTitle("Commande d'annonce ( Permission requise : kick )")
                .setColor("#cc0000")
                    .addField(PREFIX + "annonce", "Cette commande permet de faire une annonce avec une embed. **(** __*sans mention everyone*__ **)** l'annonce ce ferra dans le channel ``#annonce``")
                    .addField(PREFIX + "annonce@", "Cette commande permet de faire une annonce avec une embed. **(** __*avec mention everyone*__ **)** l'annonce ce ferra dans le channel ``#annonce``")
            .setFooter("Page 2/3 | " + foother)                
            var shelp3_embed = new Discord.RichEmbed()
                .setTitle("Commande qui demande au moins l'admin ( sauf pour le kick )")
                .setColor("#cc0000")
                    .addField(PREFIX + "kick", "Cette commande permet de kick un utilisateur ! Pour l'utiliser, faites " + PREFIX + "kick @(utilisateur) + (raison)")
                    .addField(PREFIX + "ban", "Cette commande permet de bannir un utilisateur ! Pour l'utiliser, faites " + PREFIX + "ban @(utilisateur) + (raison)")
                    .addField(PREFIX + "unkick", "Cette commande permet de unkick un utilisateur ! Pour l'utiliser, faites " + PREFIX + "unkick @(utilisateur)")
                    .addField(PREFIX + "unban", "Cette commande permet de unban un utilisateur ! Pour l'utiliser, faites " + PREFIX + "unban @(utilisateur)")
                    .addField(PREFIX + "hinstall", "Cette commande permet de voir le Pannel d'Installation.")
            .setFooter("Page 3/3 | " + foother)
            const shelpmessage = await message.channel.send(start_embed);
            await shelpmessage.react("1⃣");
            await shelpmessage.react("2⃣");
            await shelpmessage.react("3⃣");
            const rpanierr = shelpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
            rpanierr.on('collect', async(reaction) => {
            if (reaction.emoji.name === "1⃣") {
                shelpmessage.edit(shelp1_embed);
            }
            if (reaction.emoji.name === "2⃣") {
                shelpmessage.edit(shelp2_embed);
            }
            if (reaction.emoji.name === "3⃣") {
                shelpmessage.edit(shelp3_embed);
            }
            await reaction.remove(message.author.id);
            })
            console.log("AIDE STAFF " + message.author.username + " !")
        break;    

        case "hinstall":
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Tu ne peux exécuter cette commande. ❌");
                var install_embed = new Discord.RichEmbed()
                    .addField(PREFIX + "administration", "Cette commande permet de crée les salon & don j'ai besoin pour l'administration.")
                    .addField(PREFIX + "log", "Cette commande permet de crée le salon des logs.")
                    .addField(PREFIX + "install", "Cette commande permet de crée tout les salons & rôles don j'ai besoin.")
                .setColor("#cc0000")
                .setAuthor("Panel d'Installation")
                .setTimestamp()
            message.delete()
            message.channel.send(message.author.toString() + " **Je t'ai envoye un menu d'aide en MP, verifie qu'ils sont actives en provenance des membres du serveur.**")
            member.createDM().then(channel => {
                return channel.send(install_embed)
            }).catch(console.error)
            console.log(PREFIX +"hinstall par " + message.author.username + " !\nProvenance du message : " + message.guild.name)
            member.guild.channels.find("name", "staff-logs").send("**" + message.author.toString() + "** a utiliser ``" + PREFIX + "hinstall `` dans le salon " + message.channel +" !\nProvenance du message : ``" + message.guild.name + "``");
        break;

        case "help":
            var start_embed = new Discord.RichEmbed()
                .setTitle("🛠Menu d'aide🛠 !")
                .setDescription("**Pour naviguer dans le menu d'aide, utilisez les réactions si-dessous.**")
                .setColor("#36393E")
                .setFooter(foother)
            var help1_embed = new Discord.RichEmbed()
                .setTitle("🎵Musique🎵")
                .setColor("#0000ff")
                    .addField(PREFIX + "play", "**Jouer une musique** !  Pour l'utiliser, faites *" + PREFIX + "play (lien youtube)* !")
                    .addField(PREFIX + "skip", "**Sauter une musique**  Pour l'utiliser, faite *" + PREFIX + "skip* !")
                    .addField(PREFIX + "stop", "**Arreter la musique**  Pour l'utiliser, faites *" + PREFIX + "stop* !")
                .setFooter("Page 1/3 | " + foother)
            var help2_embed = new Discord.RichEmbed()
                .setTitle("💩Autre💩")
                .setColor("#0000ff")
                    .addField(PREFIX + "botinfo", "Grâce à cette commande, tu pourras savoir mes info !") 
                    .addField(PREFIX + "reseau", "Vous donne mes réseaux sociaux !")
                    .addField(PREFIX + "traductionhelp", "Pour affichier l'aide des __**traductions**__ !")
                    .addField(PREFIX + "servinfo", "Grâce à cette commande, tu pourras savoir les __**informations du serveur**__ !")
                    .addField(PREFIX + "google", "Commande pas trop utile mais tu peut faire des recherche google. Pour l'utiliser, faites " + PREFIX + "google (recherche) !")
                .setFooter("Page 2/3 | " + foother)    
            var help3_embed = new Discord.RichEmbed()
                .setTitle("⚙Administration🛠")
                .setColor("#cc0000")
                    .addField(PREFIX + "shelp", "❌**Afficher les commandes du staff. Mais seule ceux qui ont la perm de kick pourrons y accèder. **❌")
                .setFooter("Page 3/3 | " + foother)
            const helpmessage = await message.channel.send(start_embed);
            await helpmessage.react("1⃣");
            await helpmessage.react("2⃣");
            await helpmessage.react("3⃣");
            const ranier = helpmessage.createReactionCollector((reaction, user) => user.id === message.author.id);
            ranier.on('collect', async(reaction) => {
                if (reaction.emoji.name === "1⃣") {
                    helpmessage.edit(help1_embed);
                }
                if (reaction.emoji.name === "2⃣") {
                    helpmessage.edit(help2_embed);
                }
                if (reaction.emoji.name === "3⃣") {
                    helpmessage.edit(help3_embed)
                }
                await reaction.remove(message.author.id);
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
                    .setAuthor("Fondateur – VCS", message.author.avatarURL)
                    .setDescription(suffix)
                        .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                        .addField("Message de : ", message.author.toString())
                    .setThumbnail(message.guild.iconURL)
                    .setFooter("Ilian's Community | IlianBOT - " + version)
                    .setTimestamp()
                message.delete()
                return bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(fondateur_embed));
            } 
            if (message.author.id === "274240989944610827") {
                const gay_embed = new Discord.RichEmbed()
                    .setColor("#F24D4A")
                    .setAuthor("💘MON COEUR EN SUCRE💘 – VCS", message.author.avatarURL)
                    .setDescription(suffix)
                        .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                        .addField("Message de : ", message.author.toString())
                    .setThumbnail(message.guild.iconURL)
                    .setFooter("Ilian's Community | IlianBOT - " + version)
                    .setTimestamp()
                message.delete()
                return bot.channels.findAll("name", "vcs-ilianbot").map(channel => channel.send(gay_embed));
            } 
            {
                const vcs_embed = new Discord.RichEmbed()
                    .setColor("#2A00FF")
                    .setAuthor("Utilisateur – VCS", message.author.avatarURL)
                    .setDescription(suffix)
                        .addField("Provenance du message :", "``" + message.guild.name + "``", true)
                        .addField("Message de : ", message.author.toString())
                    .setThumbnail(message.guild.iconURL)
                    .setFooter("Ilian's Community | IlianBOT - " + version)
                    .setTimestamp()
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
                    .addField("Nom du Serveur :", "Le serveur s'appelle : ``" + message.guild.name + "``.", true)
                    .addField("ServeurID :", "L'ID du serveur est : ``" + message.guild.id + "``.", true)
                    .addField("Création du Serveur", "Le serveur à été crée le : ``" + message.guild.createdAt + "``.", true)
                    .addField("Fondateur :", "Le fondateur du serveur est : " + message.guild.owner + ".", true)
                    .addField("FondateurID :", "L'ID du Fondateur est : ``" + message.guild.ownerID + "``.", true)
                    .addField("Membres :", "Nous sommes actuellement ``" + message.guild.memberCount  + " membres`` au total.", true)
                .setColor("#FF0000")
                .setFooter(foother)
                .setThumbnail(message.guild.iconURL)
        break;        
        
      /*  case "majinfo":
           if (message.author.id === "193092758267887616") {
                var maj_embed = new Discord.RichEmbed()
                .setAuthor("Update " + version, message.author.avatarURL)
                    .addField("VCS Update,", "**Le vcs a subbit une petite mise à jour.**")
                .setColor("#04B404")
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
