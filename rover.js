class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message){
      this.message = message;
      this.results = [];
      this.message.commands.forEach(element => {
         if(element.commandType === 'MOVE' && this.mode !== 'LOW_POWER'){
            this.position = element.value;
            this.results.push({completed: true});
         } else if(element.commandType === 'MODE_CHANGE'){
            this.mode = element.value;
            this.results.push({completed: true});
         } else if(element.commandType === 'STATUS_CHECK'){
            this.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position} });
         } else{
            this.results.push({completed: false});
         }
      });
      return {message: this.message.name, results: this.results}
   }
}

module.exports = Rover;