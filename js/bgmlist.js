//  window.onload = function() {

//页面加载完成之后，通过给audio添加autoplay属性，音频下载完成之后自动播放
//      var oAudio = document.getElementById('myaudio');
//      oAudio.src = 'Le_Papillon.mp3';

//  }
//mp3文件名
var mp3List = [
        '0.mp3',
        '1.mp3',
        '2.mp3',
        '3.mp3',
        '4.mp3',
        '5.mp3',
        '6.mp3',
        '7.mp3',
        '8.mp3',
        '9.mp3',
        '10.mp3',
        '11.mp3',
        '12.mp3',
        '13.mp3',
        '14.mp3',
        '15.mp3',
        '16.mp3'
    ],
    //文件路径
    baseUrl = 'music/';

function getMusic(list) {

    var len = list.length,
        num = parseInt(Math.random()*len, 10),
        music = baseUrl + list[num];

    if(music) {

        return music;

    } else {

        getMusic(list, baseUrl);

    }

}
canPlay(playAudio);
//查看是否支持audio标签，如果支持，预加载当前指向mp3文件
function canPlay(callback) {

    var currentFile = getMusic(mp3List);
    try {
        var audio = new Audio();

        audio.oncanplay = function() {
            callback(currentFile);
        }

        audio.src = currentFile;

        audio.load();
    }catch(e){
        callback(false, e);
    }
}

//play
function playAudio(currentFile) {
    // Check for audio element support.
    if (window.HTMLAudioElement && currentFile) {
        try {
            var oAudio = document.getElementById('bgm');

            oAudio.src = currentFile;

            if (oAudio.paused) {
                oAudio.play();
            }
            else {
                oAudio.pause();
            }

            oAudio.onended = function() {
                oAudio.src = getMusic(mp3List);
                oAudio.play();
            }

        }
        catch (e) {
            // Fail silently but show in F12 developer tools console
            if(window.console && console.error("Error:" + e));
        }
    }
}