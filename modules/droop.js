import {DieDroop} from './die.js';

Hooks.once("init", async function () {
    CONFIG.Dice.terms["s"] = DieDroop;
});

Hooks.on('diceSoNiceRollComplete', (chatMessageID) => {
    let message = game.messages.get(chatMessageID);
    if(message.isAuthor){
        let defense = 0;
        let focus = 0;
        let success = 0;
        let szRoll = false;
        message.roll.dice.forEach(dice => {
            if(dice instanceof DieDroop){
                szRoll = true;
                dice.results.forEach(res => {
                    switch(res.result){
                        case 1:
                            defense++;
                            break;
                        case 2:
                            focus+=2;
                            break;
                        case 3:
                            success++;
                            break;
                        case 4:
                            success+=2;
                            break;
                        case 5:
                            focus++;
                            break;
                        case 6:
                            defense++;
                            break;
                    }
                });
            }
        });
        
        if(szRoll){
            ChatMessage.create({
                content: `<b>Defense:</b> ${defense}<br><b>Success:</b> ${success}<br><b>Focus:</b> ${focus}`,
                whisper: message.data.whisper,
                blind: message.data.blind
            });
        }
    }
});

Hooks.once('diceSoNiceReady', (dice3d) => {
    dice3d.addSystem({id:"droop",name:"droop"},true);
    dice3d.addDicePreset({
      type:"ds",
      labels:[
        'modules/droop/assets/D1_bg.png', 
        'modules/droop/assets/F2.png', 
        'modules/droop/assets/S1.png', 
        'modules/droop/assets/S2.png', 
        'modules/droop/assets/F1.png', 
        'modules/droop/assets/D1_bg.png'
      ],
      bumpMaps:[
        'modules/droop/assets/D1_bump.png', 
        'modules/droop/assets/F2_bump.png', 
        'modules/droop/assets/S1_bump.png', 
        'modules/droop/assets/S2_bump.png', 
        'modules/droop/assets/F1_bump.png', 
        'modules/droop/assets/D1_bump.png'
      ],
      system:"droop"
    });
    dice3d.addDicePreset({
      type: "d20",
      modelFile: "modules/assets/Droop Dice.glb",
      system: "droop"
    });
});
