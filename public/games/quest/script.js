var currentRoom = "start";
var commands = ["go", "pickup", "inventory", "talk"];
var inventory = ["sword", "shield"];

function changeRoom(dir) {
    if (rooms[currentRoom].directions[dir] !== undefined) {
        currentRoom = rooms[currentRoom].directions[dir]
        $('#game-text').append("<p>" + rooms[currentRoom].description + "</p>");
        $('#game-textes').append("<p>" + rooms[currentRoom].escriptiones + "</p>");
        say(rooms[currentRoom].name);
        say(rooms[currentRoom].escriptiones);
    } else {
        $('#game-text').append("<p>You cannot go that way!</p>");
        say("You cannot go that way!");
    }
}

function showHelp() {
    $('#game-text').append("<p>Here are the possible commands: </p>");
    $('#game-text').append("<p><ul>");
    for (var i = 0; i < commands.length; i++) {
        $('#game-text').append("<li>" + commands[i] + "</li>");
        say(commands[i])
    }
    $('#game-text').append("</ul></p>");

}

function showInventory() {
    if (inventory.length === 0) {
        $('#game-text').append("You are not carrying anything!");
        return;
    }
    $('#game-text').append("<p>Here is your inventory: </p>");
    $('#game-text').append("<p><ul>");
    for (var i = 0; i < inventory.length; i++) {
        $('#game-text').append("<li>" + inventory[i] + "</li>");
        say(inventory[i])
    }
    $('#game-text').append("</ul></p>");

}

function playerInput(input) {
    var command = input.split(" ")[0];
    switch (command) {
        case "go":
            var dir = input.split(" ")[1];
            changeRoom(dir);
            break;
        case "help":
              //  createjs.Sound.play("ambiance");
            showHelp();
            break;
        case "inventory":
            showInventory();
            break;
        case "look":
            // say(rooms[currentRoom].name);
            say(rooms[currentRoom].escriptiones);
                 
            break;
        case "l":
           // say(rooms[currentRoom].name);
            say(rooms[currentRoom].escriptiones);
          //  say(rooms[currentRoom].description);
            break;
        default:
                createjs.Sound.play("error");
            $('#game-text').append("<p>Invalid command!</p>");
    }
}
function loadHandler(event) {
    // This is fired for each sound that is registered.
    var instance = createjs.Sound.play("error");  // play using id.  Could also use full sourcepath or event.src.
    instance.on("complete", this.handleComplete, this);
    instance.volume = 0.5;
}

function handleLoadComplete(event) {
    var props = new createjs.PlayPropsConfig().set({interrupt: createjs.Sound.INTERRUPT_ANY, loop: -1, volume: 0.5})
  // createjs.Sound.play("ambiance", props);
}

function say(m) {
    
    var _voices = [];

// iOS 8
var _iOSvoices = [
    {name: "pt-BR", voiceURI: "pt-BR", lang: "pt-BR", localService: true, default: true},
    {name: "fr-CA", voiceURI: "fr-CA", lang: "fr-CA", localService: true, default: true},
    {name: "sk-SK", voiceURI: "sk-SK", lang: "sk-SK", localService: true, default: true},
    {name: "th-TH", voiceURI: "th-TH", lang: "th-TH", localService: true, default: true},
    {name: "ro-RO", voiceURI: "ro-RO", lang: "ro-RO", localService: true, default: true},
    {name: "no-NO", voiceURI: "no-NO", lang: "no-NO", localService: true, default: true},
    {name: "fi-FI", voiceURI: "fi-FI", lang: "fi-FI", localService: true, default: true},
    {name: "pl-PL", voiceURI: "pl-PL", lang: "pl-PL", localService: true, default: true},
    {name: "de-DE", voiceURI: "de-DE", lang: "de-DE", localService: true, default: true},
    {name: "nl-NL", voiceURI: "nl-NL", lang: "nl-NL", localService: true, default: true},
    {name: "id-ID", voiceURI: "id-ID", lang: "id-ID", localService: true, default: true},
    {name: "tr-TR", voiceURI: "tr-TR", lang: "tr-TR", localService: true, default: true},
    {name: "it-IT", voiceURI: "it-IT", lang: "it-IT", localService: true, default: true},
    {name: "pt-PT", voiceURI: "pt-PT", lang: "pt-PT", localService: true, default: true},
    {name: "fr-FR", voiceURI: "fr-FR", lang: "fr-FR", localService: true, default: true},
    {name: "ru-RU", voiceURI: "ru-RU", lang: "ru-RU", localService: true, default: true},
    {name: "es-MX", voiceURI: "es-MX", lang: "es-MX", localService: true, default: true},
    {name: "zh-HK", voiceURI: "zh-HK", lang: "zh-HK", localService: true, default: true},
    {name: "sv-SE", voiceURI: "sv-SE", lang: "sv-SE", localService: true, default: true},
    {name: "hu-HU", voiceURI: "hu-HU", lang: "hu-HU", localService: true, default: true},
    {name: "zh-TW", voiceURI: "zh-TW", lang: "zh-TW", localService: true, default: true},
    {name: "es-ES", voiceURI: "es-ES", lang: "es-ES", localService: true, default: true},
    {name: "zh-CN", voiceURI: "zh-CN", lang: "zh-CN", localService: true, default: true},
    {name: "nl-BE", voiceURI: "nl-BE", lang: "nl-BE", localService: true, default: true},
    {name: "en-GB", voiceURI: "en-GB", lang: "en-GB", localService: true, default: true},
    {name: "ar-SA", voiceURI: "ar-SA", lang: "ar-SA", localService: true, default: true},
    {name: "ko-KR", voiceURI: "ko-KR", lang: "ko-KR", localService: true, default: true},
    {name: "cs-CZ", voiceURI: "cs-CZ", lang: "cs-CZ", localService: true, default: true},
    {name: "en-ZA", voiceURI: "en-ZA", lang: "en-ZA", localService: true, default: true},
    {name: "en-AU", voiceURI: "en-AU", lang: "en-AU", localService: true, default: true},
    {name: "da-DK", voiceURI: "da-DK", lang: "da-DK", localService: true, default: true},
    {name: "en-US", voiceURI: "en-US", lang: "en-US", localService: true, default: true},
    {name: "en-IE", voiceURI: "en-IE", lang: "en-IE", localService: true, default: true},
    {name: "he-IL", voiceURI: "he-IL", lang: "he-IL", localService: true, default: true},
    {name: "hi-IN", voiceURI: "hi-IN", lang: "hi-IN", localService: true, default: true},
    {name: "el-GR", voiceURI: "el-GR", lang: "el-GR", localService: true, default: true},
    {name: "ja-JP", voiceURI: "ja-JP", lang: "ja-JP", localService: true, default: true}
];

function populateVoices() {
    // wait first
    var watch = setTimeout(function() {
        _voices = speechSynthesis.getVoices();

        if (_voices.length === 0) {
            // use hard-coded list because speechSynthesis.getVoices() didn't work
            _voices = _iOSvoices;
        }

        clearTimeout(watch);
    }, 100);
}
// ios 8

function _populateVoices() {
    _voices = speechSynthesis.getVoices();

    if (_voices.length === 0) {
        // use hard-coded list because speechSynthesis.getVoices() didn't work
        _voices = _iOS9voices;
    }
}

var _iOS9voices = [
  { name: "Maged", voiceURI: "com.apple.ttsbundle.Maged-compact", lang: "ar-SA", localService: true, "default": true },
  { name: "Zuzana", voiceURI: "com.apple.ttsbundle.Zuzana-compact", lang: "cs-CZ", localService: true, "default": true },
  { name: "Sara", voiceURI: "com.apple.ttsbundle.Sara-compact", lang: "da-DK", localService: true, "default": true },
  { name: "Anna", voiceURI: "com.apple.ttsbundle.Anna-compact", lang: "de-DE", localService: true, "default": true },
  { name: "Melina", voiceURI: "com.apple.ttsbundle.Melina-compact", lang: "el-GR", localService: true, "default": true },
  { name: "Karen", voiceURI: "com.apple.ttsbundle.Karen-compact", lang: "en-AU", localService: true, "default": true },
  { name: "Daniel", voiceURI: "com.apple.ttsbundle.Daniel-compact", lang: "en-GB", localService: true, "default": true },
  { name: "Moira", voiceURI: "com.apple.ttsbundle.Moira-compact", lang: "en-IE", localService: true, "default": true },
  { name: "Samantha (Enhanced)", voiceURI: "com.apple.ttsbundle.Samantha-premium", lang: "en-US", localService: true, "default": true },
  { name: "Samantha", voiceURI: "com.apple.ttsbundle.Samantha-compact", lang: "en-US", localService: true, "default": true },
  { name: "Tessa", voiceURI: "com.apple.ttsbundle.Tessa-compact", lang: "en-ZA", localService: true, "default": true },
  { name: "Monica", voiceURI: "com.apple.ttsbundle.Monica-compact", lang: "es-ES", localService: true, "default": true },
  { name: "Paulina", voiceURI: "com.apple.ttsbundle.Paulina-compact", lang: "es-MX", localService: true, "default": true },
  { name: "Satu", voiceURI: "com.apple.ttsbundle.Satu-compact", lang: "fi-FI", localService: true, "default": true },
  { name: "Amelie", voiceURI: "com.apple.ttsbundle.Amelie-compact", lang: "fr-CA", localService: true, "default": true },
  { name: "Thomas", voiceURI: "com.apple.ttsbundle.Thomas-compact", lang: "fr-FR", localService: true, "default": true },
  { name: "Carmit", voiceURI: "com.apple.ttsbundle.Carmit-compact", lang: "he-IL", localService: true, "default": true },
  { name: "Lekha", voiceURI: "com.apple.ttsbundle.Lekha-compact", lang: "hi-IN", localService: true, "default": true },
  { name: "Mariska", voiceURI: "com.apple.ttsbundle.Mariska-compact", lang: "hu-HU", localService: true, "default": true },
  { name: "Damayanti", voiceURI: "com.apple.ttsbundle.Damayanti-compact", lang: "id-ID", localService: true, "default": true },
  { name: "Alice", voiceURI: "com.apple.ttsbundle.Alice-compact", lang: "it-IT", localService: true, "default": true },
  { name: "Kyoko", voiceURI: "com.apple.ttsbundle.Kyoko-compact", lang: "ja-JP", localService: true, "default": true },
  { name: "Yuna", voiceURI: "com.apple.ttsbundle.Yuna-compact", lang: "ko-KR", localService: true, "default": true },
  { name: "Ellen", voiceURI: "com.apple.ttsbundle.Ellen-compact", lang: "nl-BE", localService: true, "default": true },
  { name: "Xander", voiceURI: "com.apple.ttsbundle.Xander-compact", lang: "nl-NL", localService: true, "default": true },
  { name: "Nora", voiceURI: "com.apple.ttsbundle.Nora-compact", lang: "no-NO", localService: true, "default": true },
  { name: "Zosia", voiceURI: "com.apple.ttsbundle.Zosia-compact", lang: "pl-PL", localService: true, "default": true },
  { name: "Luciana", voiceURI: "com.apple.ttsbundle.Luciana-compact", lang: "pt-BR", localService: true, "default": true },
  { name: "Joana", voiceURI: "com.apple.ttsbundle.Joana-compact", lang: "pt-PT", localService: true, "default": true },
  { name: "Ioana", voiceURI: "com.apple.ttsbundle.Ioana-compact", lang: "ro-RO", localService: true, "default": true },
  { name: "Milena", voiceURI: "com.apple.ttsbundle.Milena-compact", lang: "ru-RU", localService: true, "default": true },
  { name: "Laura", voiceURI: "com.apple.ttsbundle.Laura-compact", lang: "sk-SK", localService: true, "default": true },
  { name: "Alva", voiceURI: "com.apple.ttsbundle.Alva-compact", lang: "sv-SE", localService: true, "default": true },
  { name: "Kanya", voiceURI: "com.apple.ttsbundle.Kanya-compact", lang: "th-TH", localService: true, "default": true },
  { name: "Yelda", voiceURI: "com.apple.ttsbundle.Yelda-compact", lang: "tr-TR", localService: true, "default": true },
  { name: "Ting-Ting", voiceURI: "com.apple.ttsbundle.Ting-Ting-compact", lang: "zh-CN", localService: true, "default": true },
  { name: "Sin-Ji", voiceURI: "com.apple.ttsbundle.Sin-Ji-compact", lang: "zh-HK", localService: true, "default": true },
  { name: "Mei-Jia", voiceURI: "com.apple.ttsbundle.Mei-Jia-compact", lang: "zh-TW", localService: true, "default": true }
];


    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    
    // english = 7, spanish = 8, 
    msg.voice = voices[8];
    msg.voiceURI = "native";
    msg.volume = 2;
    msg.rate = 0.7;
    msg.pitch = 0.9;
    msg.text = m;
    msg.lang = 'es-MX';
    speechSynthesis.speak(msg);
  
}

$(document).ready(function() {
    createjs.Sound.on("fileload", handleLoadComplete);
    createjs.Sound.alternateExtensions = ["mp3"];
    createjs.Sound.registerSound({src:"ambiance.ogg", id:"ambiance"});
    createjs.Sound.registerSound({src:"error.ogg", id:"error"});

    $('#game-textes').append("<p>" + rooms.start.description + "</p>");
    $('#game-text').append("<p>"  + rooms.start.escriptiones + "</p>");
    say(rooms.start.escriptiones);

    $(document).keypress(function(key) {
        if (key.which === 13 && $('#user-input').is(':focus')) {
            var value = $('#user-input').val().toLowerCase();
            $('#user-input').val("");
            playerInput(value);
        }
    })

})
