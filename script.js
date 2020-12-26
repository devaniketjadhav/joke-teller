const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
button.disabled = false;

//Disable-Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

//Passing joke to VoiceRSS API
function tellMe(joke){
    console.log(joke);
    VoiceRSS.speech({
        key: '2bf9f8eff26e4bf28da42b136a42a4ba',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from JokesAPI
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        } else{
            joke = data.joke;
        }
        //Text-to-speech
        tellMe(joke);
        //Disable Button
        toggleButton();
    } catch(error){
        //catch errors
        console.log('whoops', error)
    }
}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);