for (var i = 48; i < 91; i++) {
    document.getElementById("audioDiv").innerHTML += "<audio id=\"" + String.fromCharCode(i) + "\" src=\"sounds/" + String.fromCharCode(i) + ".mp3\" preload=\"auto\"></audio>"
}
document.onkeydown = function(e) {
    if (e.keyCode > 47 && e.keyCode < 91) {
        var keyPress = String.fromCharCode(e.keyCode);
        document.getElementById(keyPress).play();
    }
    else {
        console.log("Key is not found!");
    }
};