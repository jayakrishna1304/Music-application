let currentsong = new Audio();
let currentPlayerBar = null;
let songs;

async function getSongs() {
    return [
        {
            name: "Premalo",
            url: "https://firebasestorage.googleapis.com/v0/b/music-player-ad833.firebasestorage.app/o/%5BiSongs.info%5D%2001%20-%20Premalo.mp3?alt=media&token=6bd3ec63-32cb-4320-a4ee-277564ae617f"
        },
        {
            name: "Sanam Teri Kasam",
            url: "https://firebasestorage.googleapis.com/v0/b/music-player-ad833.firebasestorage.app/o/bollywood_STK%20-%20Sanam%20Teri%20Kasam.mp3?alt=media&token=867cd3cc-e627-4cb9-803f-b52470bf0e37"
        },
        {
            name: "Evarevaro",
            url: "https://firebasestorage.googleapis.com/v0/b/music-player-ad833.firebasestorage.app/o/Evarevaro(KoshalWorld.Com).mp3?alt=media&token=49eef41c-3951-4165-a2cd-cd58ef680f4e"
        },
        {
            name: "Finding Her",
            url: "https://firebasestorage.googleapis.com/v0/b/music-player-ad833.firebasestorage.app/o/Finding%20Her%20-%20Kushagra%20320%20Kbps.mp3?alt=media&token=3485fec1-0307-4f69-b43d-e5c1ae84c6c1"
        },
        
        {
            name: "Tum Hi Ho",
            url: "https://firebasestorage.googleapis.com/v0/b/music-player-ad833.firebasestorage.app/o/new_320_01%20-%20Tum%20Hi%20Ho%20-%20PagalSongs.com.mp3?alt=media&token=b3f1ed5f-abbc-404e-bd0b-e0632c3bfaa2"
        },
        {
            name: "Raanjhan Do Patti",
            url: "https://firebasestorage.googleapis.com/v0/b/music-player-ad833.firebasestorage.app/o/Raanjhan%20Do%20Patti%20128%20Kbps.mp3?alt=media&token=069dd174-e21e-488d-b63f-b71fcf1f7961"
        },
        {
            name: "Young G.O.A.T - Cheema Y",
            url: "https://firebasestorage.googleapis.com/v0/b/music-player-ad833.firebasestorage.app/o/Young%20G.O.A.T%20-%20Cheema%20Y.mp3?alt=media&token=d081df64-6431-437e-968f-a993fecdb1b1"
        }
        
        
    ];
}

let playmusic = (url, name = "Unknown Song") => {
    currentsong.pause();
    currentsong.src = url;
    currentsong.load();

    currentsong.addEventListener('loadeddata', function handler() {
        currentsong.play().catch(err => console.error('Play failed:', err));
        currentsong.removeEventListener('loadeddata', handler);
    });

    if (currentPlayerBar) currentPlayerBar.remove();

    let ims = {
        1: "https://c.saavncdn.com/854/Premalo-From-Court-Telugu-2025-20250213103211-500x500.jpg",
        2: "https://i.scdn.co/image/ab67616d00001e02699cce11792075219c61bb2f",
        3: "https://c.saavncdn.com/162/ANIMAL-TELUGU-Telugu-2023-20231125141003-150x150.jpg",
        4: "https://i.scdn.co/image/ab67616d00001e0283141000ee8ce3b893a0b425",
        5: "https://i.scdn.co/image/ab67616d00001e026404721c1943d5069f0805f3",
        6: "https://i.scdn.co/image/ab67616d00001e02773c5f60bcb309ef8802e4ef",
        7: "https://i.scdn.co/image/ab67616d00001e02a5183fa4b99bcec1f506418d",
        8: "https://i.scdn.co/image/ab67616d00001e021018173246dd0936e562aa01"
    };

    const mainprogress = document.createElement('div');
    mainprogress.className = 'player-bar';

    const pb = document.createElement('div');
    pb.className = 'song-info';

    const mp = document.createElement('img');
    mp.className = 'album-art';
    const decodedName = decodeURIComponent(name).toLowerCase();

    if (decodedName.includes("sanam teri kasam")) mp.src = ims[2];
    else if (decodedName.includes("premalo")) mp.src = ims[1];
    else if (decodedName.includes("evarevaro")) mp.src = ims[3];
    else if (decodedName.includes("finding her")) mp.src = ims[4];
    else if (decodedName.includes("tum hi ho")) mp.src = ims[5];
    else if (decodedName.includes("raanjhan do patti")) mp.src = ims[6];
    else if (decodedName.includes("young g.o.a.t")) mp.src = ims[7];
    else mp.src = "musicsym.svg";

    const si = document.createElement('div');
    si.className = 'song-details';

    const h = document.createElement('h4');
    h.className = 'song-title';
    h.textContent = name;

    const p = document.createElement('p');
    p.className = 'song-artist';
    p.textContent = "Unknown Artist";

    si.appendChild(h);
    si.appendChild(p);
    pb.appendChild(mp);
    pb.appendChild(si);

    const t = document.createElement('div');
    t.className = 'player-center';

    const m = document.createElement('div');
    m.className = 'controls';

    const m1 = document.createElement('img');
    m1.className = 'control-btn pre invert';
    m1.src = "pre.svg";

    const m2 = document.createElement('img');
    m2.className = 'control-btn play';
    m2.src = "pause.svg";

    const m3 = document.createElement('img');
    m3.className = 'control-btn next invert';
    m3.src = "next.svg";

    m2.addEventListener('click', () => {
        if (currentsong.paused) {
            currentsong.play();
            m2.src = "pause.svg";
        } else {
            currentsong.pause();
            m2.src = "play.svg";
        }
    });

    m1.addEventListener('click', () => {
        let index = songs.findIndex(s => s.url === currentsong.src);
        if (index > 0) playmusic(songs[index - 1].url, songs[index - 1].name);
    });

    m3.addEventListener('click', () => {
        let index = songs.findIndex(s => s.url === currentsong.src);
        if (index < songs.length - 1) playmusic(songs[index + 1].url, songs[index + 1].name);
    });

    m.appendChild(m1);
    m.appendChild(m2);
    m.appendChild(m3);
    t.appendChild(m);

    const pr = document.createElement('div');
    pr.className = 'progress';

    const s1 = document.createElement('span');
    s1.className = 'current-time';
    s1.textContent = "0:00";

    const pbar = document.createElement('input');
    pbar.type = 'range';
    pbar.min = '0';
    pbar.max = '100';
    pbar.value = '0';
    pbar.className = 'progress-bar';

    const s2 = document.createElement('span');
    s2.className = 'total-time';
    s2.textContent = "0:00";

    pr.appendChild(s1);
    pr.appendChild(pbar);
    pr.appendChild(s2);

    const ex = document.createElement('div');
    ex.className = 'extra-controls';

    mainprogress.appendChild(pb);
    mainprogress.appendChild(t);
    mainprogress.appendChild(pr);
    mainprogress.appendChild(ex);

    document.body.appendChild(mainprogress);
    currentPlayerBar = mainprogress;

    currentsong.addEventListener('timeupdate', () => {
        const progress = (currentsong.currentTime / currentsong.duration) * 100;
        pbar.value = progress || 0;
        s1.textContent = formatTime(currentsong.currentTime);
        s2.textContent = formatTime(currentsong.duration);
    });

    pbar.addEventListener('input', () => {
        const seekTime = (pbar.value / 100) * currentsong.duration;
        currentsong.currentTime = seekTime;
    });
};

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
}

async function playlist() {
    songs = await getSongs();
    const songul = document.querySelector(".pla ul");

    songs.forEach(song => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="musicsym.svg" alt="Music Icon" />
            <div class="info">${song.name}</div>
        `;
        li.addEventListener('click', () => {
            playmusic(song.url, song.name);
        });
        songul.appendChild(li);
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const button = card.querySelector('.play-btn');
        if (button && songs[index]) {
            button.addEventListener('click', () => {
                playmusic(songs[index].url, songs[index].name);
            });
        }
    });

    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('song-search');
    const resultList = document.getElementById('searchResults');
    const popup = document.getElementById('searchPopup');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filteredSongs = songs.filter(song => song.name.toLowerCase().includes(query));
        resultList.innerHTML = '';

        if (filteredSongs.length === 0) {
            resultList.innerHTML = '<li>No songs found.</li>';
            resultList.style.color = 'black';
        } else {
            filteredSongs.forEach(song => {
                const li = document.createElement('li');
                li.textContent = song.name;
                li.style.cursor = 'pointer';
                li.style.padding = '5px 0';
                li.style.color = 'black';
                li.addEventListener('click', () => {
                    playmusic(song.url, song.name);
                    popup.style.display = 'none';
                });
                resultList.appendChild(li);
            });
        }

        popup.style.display = 'block';
    });

    const r = document.querySelector(".ri");
    r.addEventListener("click", () => {
        document.querySelector(".mainbox").style.left = "0";
        playmusic(songs[0].url, songs[0].name);
    });
}

document.getElementById('ham').addEventListener('click', () => {
    document.querySelector('.mainbox').style.left = '0';
});

document.getElementById('close').addEventListener('click', () => {
    document.querySelector('.mainbox').style.left = '-100%';
});

playlist();
