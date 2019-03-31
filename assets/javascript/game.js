var fighters = [
    {fighterName: "Black Panther", fighterImage: "assets/images/blackpanther.jpg", hp: 120, baseAttack: 15, currentAttack: 15, counterAttack: 20},
    {fighterName: "Killmonger", fighterImage: "assets/images/killmonger.jpg", hp: 120, baseAttack: 15, currentAttack: 15, counterAttack: 25},
    {fighterName: "Okoye", fighterImage: "assets/images/okoye.jpg", hp: 100, baseAttack: 25, currentAttack: 25, counterAttack: 25},
    {fighterName: "Mbaku", fighterImage: "assets/images/mbaku.jpg", hp: 140, baseAttack: 20, currentAttack: 20, counterAttack: 10}
];

       
$(document).ready(function() {
    var playerCharacter = null;
    var opponentCharacter = null;
    var defeatedOpponents = 0;
    
    $(".game-fighter").on("click", function() {
        if (playerCharacter === null) {
            
            var thisDivID = this.id;
            var thisDiv = $("#"+thisDivID).detach();
            
            $("#your-character").append(thisDiv);
            playerCharacter = parseInt(thisDivID.charAt(6));
            
            for (i=0; i<fighters.length;i++) {
                if (i !== playerCharacter) {
                    thisDiv = $("#choice"+i).detach();
                    $("#remaining-title").append(thisDiv);
                };
            };
            $("#fight-narrator").text("Please choose your 1st opponent!!");
            $("#remaining-title").css("visibility", "visible");
        } else if (opponentCharacter === null) {
            var thisDivID = this.id;
            if (parseInt(thisDivID.charAt(6)) !== playerCharacter) {
                var thisDiv = $("#"+thisDivID).detach();
                $("#opponent-character").append(thisDiv);
                opponentCharacter = parseInt(thisDivID.charAt(6));
                $("#fight-narrator").text("Attack your opponent!!");
                $("#attack-button").css("visibility", "visible");
            }
        }
    });


    $("#attack-button").on("click", function(){
        fighters[playerCharacter].hp = fighters[playerCharacter].hp - fighters[opponentCharacter].counterAttack;
        fighters[opponentCharacter].hp = fighters[opponentCharacter].hp - fighters[playerCharacter].currentAttack;
        $("#fight-narrator").html("You attacked " + fighters[opponentCharacter].fighterName + " for " + fighters[playerCharacter].currentAttack + ". <br>" + fighters[opponentCharacter].fighterName + " attacked you for "+ fighters[opponentCharacter].counterAttack +". <br> Continue the attack!!");
        fighters[playerCharacter].currentAttack = fighters[playerCharacter].currentAttack + fighters[playerCharacter].baseAttack;
        
        console.log (fighters[playerCharacter].hp);
        $("#hp"+playerCharacter).text(fighters[playerCharacter].hp);
        $("#hp"+opponentCharacter).text(fighters[opponentCharacter].hp);
        
        if (fighters[playerCharacter].hp <=0) {
            $("#again-button").css("visibility", "visible");
            $("#attack-button").css("visibility", "hidden");
            $("#fight-narrator").text("You've been defeated. GAME OVER!!!");
            
            
        } else if (fighters[opponentCharacter].hp <=0) {
            
            defeatedOpponents ++;
            $("#opponent-character").empty();
            $("#fight-narrator").text("You've defeated " + fighters[opponentCharacter].fighterName + "!! Select next opponet!!");
            opponentCharacter = null;
            if (defeatedOpponents === 3) {
                $("#again-button").css("visibility", "visible");
                $("#attack-button").css("visibility", "hidden");
                $("#fight-narrator").text("You've defeated all opponents. You won. Congratulations!!! ");
            }

        }
        
    });

    $("#again-button").on("click", function(){
        location.reload();
    });



});