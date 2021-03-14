function getByClass(ClassName){
  return document.getElementsByClassName(ClassName)[0]
}


const song = [{
  key: 0,
  name:'まちがいさがし',
  arist:'菅田将暉',
  src: './music/菅田将暉 - まちがいさがし.mp3',
  imageSrc: './assets/菅田将暉 - まちがいさがし.jpg',
  ablumDes:'影视歌三栖的日本新生代小天王菅田将晖2017年以单曲〈从未见过的景色〉正式以歌手身份出道，2018年发行的〈告别挽歌〉更获得日本LINE MUSIC的年度排行榜冠军，而个人首张专辑《PLAY》也在发行首周就获得ORICON公信榜亚军的好成绩！ 2019年，继以好友米津玄师跨刀创作的数位单曲〈找错游戏〉席卷台日两地各大排行榜后，菅田将晖将正式发行个人的第二张音乐专辑《LOVE》！',
  ablumName:'《LOVE》',
  time:'3:41'
},{
  key: 1,
  name:'いつまでも',
  arist:'GReeeeN',
  src: './music/GReeeeN - いつまでも.mp3',
  imageSrc: './assets/GReeeeN - いつまでも.jpg',
  ablumDes:'カップルで聴きたいラブソングとして人気の、GReeeeN「いつまでも」。結婚式のBGMとしても評判のこの「いつまでも」の歌詞内容を、今回は詳しく読み解いていきます。GReeeeNの気になる最新動画再生回数ランキングも、合わせてご紹介しますね。',
  ablumName:'いつまでも',
  time:'4:41'
}]


let audio = getByClass('audio');
let play = getByClass('play')
let pause = getByClass('pause')
let next = getByClass('next')
let pre = getByClass('pre')
let loop = getByClass('loop')
let single = getByClass('single-loop')
let curSong = song[0]
let currentProgress = getByClass("current-progress");
let allProgress = getByClass("all-progress");
let right = getByClass("right")
let songImg = getByClass('song-img')
let ablumImg = getByClass('left-ablum-img')
let ablumInfo = getByClass('ablum-info')
let ablumName = getByClass('ablum-name')
let songName = getByClass('song-name')
let songNameP = getByClass('song-name-p')
let songList = getByClass('song-list')
let songPlays = document.getElementsByClassName('song-play')
let songPauses = document.getElementsByClassName('song-pause')

let timer;



function init(){
  for(let i = 0; i < song.length; ++i){
    let listItem = document.createElement('div')
    if(curSong.name === song[i].name){
      listItem.className = 'song-list-item focus'
    }else{
      listItem.className = 'song-list-item unfocus'
    }
    let listItemLeft = document.createElement('div')
    listItemLeft.className = 'song-list-item-left'
    let songPlay = document.createElement('div')
    songPlay.className = 'song-play'
    let songPause = document.createElement('div')
    songPause.className = 'song-pause'
    let songAblum = document.createElement('div')
    songAblum.className = 'song-ablum'
    let durationTime = document.createElement('div')
    durationTime.className = 'song-duration-time'

    songPlay.addEventListener('click',handlePlay,false)
    songPlay.key = i
    songPause.addEventListener('click',handlePlay,false)
    songPause.key = i
    
    songAblum.innerHTML = song[i].arist + '/' + song[i].name
    durationTime.innerHTML = song[i].time
    listItemLeft.appendChild(songPlay)
    listItemLeft.appendChild(songPause)
    listItemLeft.appendChild(songAblum)
    listItem.appendChild(listItemLeft)
    listItem.appendChild(durationTime)

    songList.appendChild(listItem)
  }
}
function switchStaus(key){
  if(songPauses[key].style.display === 'block'){ 
    songPlays[key].style.display = 'block'
    songPauses[key].style.display = 'none'
    return 
  }
  songPlays[key].style.display = 'none'
  songPauses[key].style.display = 'block'
}
function handlePlay(e){
  let currItem
  if(curSong.key === e.target.key){
    if(songPauses[curSong.key].style.display === 'block'){
      switchStaus(curSong.key)
      pauseMusic()
      return 
    }
    switchStaus(curSong.key)
  }
  if(curSong.key !== e.target.key){
    currItem = document.getElementsByClassName('song-list-item')[curSong.key]
    currItem.className = 'song-list-item unfocus'
    songPlays[curSong.key].style.display = 'block'
    songPauses[curSong.key].style.display = 'none'
    switchStaus(e.target.key)
  }
  curSong = song[e.target.key]
  changeInfo()
  audio.src = curSong.src
  currItem = document.getElementsByClassName('song-list-item')[curSong.key]
  currItem.className = 'song-list-item focus'
  playMusic()
}
function nextSong(){
  let key = curSong.key
  let currItem = document.getElementsByClassName('song-list-item')[curSong.key]
  currItem.className = 'song-list-item unfocus'
  if(key !== song.length - 1){
    curSong = song[key + 1]
  }else{
    curSong = song[0]
  }
  audio.src = curSong.src
  changeInfo()
  currItem = document.getElementsByClassName('song-list-item')[curSong.key]
  currItem.className = 'song-list-item focus'
  playMusic()
}
function preSong(){
  let key = curSong.key
  let currItem = document.getElementsByClassName('song-list-item')[curSong.key]
  currItem.className = 'song-list-item unfocus'
  if(key !== 0){
    curSong = song[key - 1]
  }else{
    curSong = song[song.length - 1]
  }
  audio.src = curSong.src
  changeInfo()
  currItem = document.getElementsByClassName('song-list-item')[curSong.key]
  currItem.className = 'song-list-item focus'
  playMusic()
}
function changeInfo(){
  right.style.backgroundImage = `url('${curSong.imageSrc}')`
  songImg.src = curSong.imageSrc
  ablumImg.style.backgroundImage = `url('${curSong.imageSrc}')`
  ablumInfo.innerHTML = curSong.ablumDes
  ablumName.innerHTML = curSong.ablumName
  songNameP.innerHTML = curSong.name

}
function playMusic(){
  audio.play()
  timer = setInterval(progressChange,500)
  play.style.display = 'none'
  pause.style.display = 'block'
}
function pauseMusic(){
  audio.pause()
  clearInterval(timer)
  console.log(audio.currentTime)
  pause.style.display = 'none'
  play.style.display = 'block'
}
function singleLoop(){
  audio.loop = true;
  single.style.display = 'block'
  loop.style.display = 'none'
}
function songLoop(){
  audio.loop = false;
  single.style.display = 'none'
  loop.style.display = 'block'
}
function progressChange(){
  let all = audio.duration 
  let current = audio.currentTime
  let ratio = toPercent(current/all)
  currentProgress.style.width = ratio
}
function toPercent(point){
  var str=Number(point*100).toFixed(2);
  str+="%";
  return str;
}
function deletePX(str){
  return str.substring(0,str.length-2)
}
function progressJump(e){
  let all = +deletePX(getComputedStyle(right).width)
  let x = e.clientX - right.offsetLeft
  let ratio = toPercent(x/all)
  audio.currentTime = audio.duration*x/all 
  currentProgress.style.width = ratio
}
function handlePaly(){
  if(!audio.loop)(
    nextSong()
  )
}

play.addEventListener('click',playMusic,false)
pause.addEventListener('click',pauseMusic,false)
next.addEventListener('click',nextSong,false)
pre.addEventListener('click',preSong,false)
loop.addEventListener('click',singleLoop,false)
single.addEventListener('click',songLoop,false)
allProgress.addEventListener('click',progressJump,false)
audio.addEventListener('ended',handlePaly,false)

init()






