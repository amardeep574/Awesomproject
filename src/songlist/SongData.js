export const songData = [
    {
        id: 1,
        song: 'Dildara',
        singer: 'Shafqat Amanat Ali',
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/dildara-ra-one-65569.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id: 2,
        song: 'Jadugar',
        singer: 'Paradox',
        album: 'Album 2',
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/paradox-jadugar-jaadugar-mobcup-vip-65105.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id: 3,
        song: 'Tera Hi Bas Hona Chaahoon',
        singer: 'Najam Sheraz',
        album: 'Album 3',
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/khuda-ko-dikh-raha-hoga-na-dil-tujhse-juda-hoga-haunted-ringtone-free-downl-65104.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id: 4,
        song: 'Chaleya',
        singer: 'Arijit Singh and Shilpa Rao',
        album: 'Album 4',
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/chaleya-female-65068.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id: 5,
        song: 'Punjabi',
        singer: 'Unknown',
        album: 'Album 5',
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/10756-best-punjabi-gori-tere-jiya-hor-na-koi-milya-ringtone-ringtone-mp3-mp-65012.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id: 6,
        song: 'English',
        singer: 'Unknown',
        album: 'Album 6',
        uri: 'https://dl.prokerala.com/downloads/ringtones/files/mp3/256k-often-2-64850.mp3',
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id:7,
        song:"O Maahi",
        singer:"Arijit Singh",
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/o-mahi-o-mahi-ringtone-mobcup-com-in-64560.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id:8,
        song:"Paisa Puse",
        singer:"Diljit Dosanjh",
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/born-to-shine-punjabi-64346.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id:9,
        song:"Tere Naina",
        singer:"Niranajn",
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/pehla-tere-nain-dekheya-64039.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id:10,
        song:"Tu Jaane Na",
        singer:"Atif Aslam",
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/new-tu-jaane-na-626-63958.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id:11,
        song:"Phele Bhi Mai",
        singer:"Vishal Misra",
        url:"https://dl.prokerala.com/downloads/ringtones/files/mp3/animal-pehle-bhi-main-ringtone-download-link-904182062-63922.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    },
    {
        id:12,
        song:"Wavy",
        singer:"Karan Aujla",
        url:"https://www.ringtonedna.com/wp-content/uploads/2024/11/Wavy-Karan-Aujla-_-Punjabi.mp3",
        img: require('../images/song_img.jpg'),
        artwork: require('../images/song_img.jpg'),
    }
]








//  // Skip to next song
//     skipToNext = async () => {
//         const { currentIndex, songData } = this.state;

//         if (currentIndex < songData.length - 1) {
//             const nextIndex = currentIndex + 1;
//             this.setState({ currentIndex: nextIndex });
//             await TrackPlayer.skip(nextIndex);
//             await TrackPlayer.play();
//         }
//     };

//     // Skip to previous song
//     skipToPrevious = async () => {
//         const { currentIndex } = this.state;

//         if (currentIndex > 0) {
//             const prevIndex = currentIndex - 1;
//             this.setState({ currentIndex: prevIndex });
//             await TrackPlayer.skip(prevIndex);
//             await TrackPlayer.play();
//         }
//     };