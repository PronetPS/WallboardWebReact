export function createGuid() {
   function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
   }
   return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


export const NotFound = () => {
   return (<h1>Route Not Found!</h1>)
}


export const gTime = (sec) => {
   console.log("check rendring",sec );
   if(sec){
      var totalSec = sec;
      // var hours = parseInt(totalSec / 3600) % 24;
      var minutes = parseInt(totalSec / 60) % 60;
      var seconds = totalSec % 60;
      // var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
      var result = (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
      return result;
   }
}

export const Base_URL = 'http://172.24.30.130:2022/api';
// export const Base_URL = 'http://192.168.1.197:2022/api';