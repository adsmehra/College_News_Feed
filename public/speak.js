function btnclk(clk){
    console.log(clk);
    var s=clk.slice(11,);
    const icn=document.getElementById("icn"+s)
    if (icn.className=="fa fa-volume-up"){
        icn.className="fa-solid fa-volume-xmark"
        function getVoices() {
            let voices = speechSynthesis.getVoices();
            if(!voices.length){
            // some time the voice will not be initialized so we can call speak with empty string
            // this will initialize the voices 
            let utterance = new SpeechSynthesisUtterance("");
            speechSynthesis.speak(utterance);
            voices = speechSynthesis.getVoices();
            }
            return voices;
            }
            
            var spk='sum'+s;
            const smr=document.getElementById(spk).innerHTML;
            function speak(text, voice, rate, pitch, volume) {
            // create a SpeechSynthesisUtterance to configure the how text to be spoken 
            let speakData = new SpeechSynthesisUtterance();
            speakData.volume = volume; // From 0 to 1
            speakData.rate = rate; // From 0.1 to 10
            speakData.pitch = pitch; // From 0 to 2
            speakData.text = text;
            speakData.lang = 'en-UK';
            speakData.voice = voice;
            
            // pass the SpeechSynthesisUtterance to speechSynthesis.speak to start speaking 
            speechSynthesis.speak(speakData);
            
            }
            
            if ('speechSynthesis' in window) {
            
            let voices = getVoices();
            let rate = 0.9, pitch = 0.9, volume = 1;
            let text = smr;
            
            speak(text, voices[0], rate, pitch, volume);
            
            }else{
            console.log(' Speech Synthesis Not Supported 😞'); 
            }
        
    }
    else{
        icn.className="fa fa-volume-up";
        speechSynthesis.cancel();
    }
        
};
