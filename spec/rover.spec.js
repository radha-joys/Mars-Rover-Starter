const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  roverObj = new Rover(98382);
  msgObj = new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]);
  msgObj2 = new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 9899), new Command('STATUS_CHECK')]);
  msgObj3 = new Message('Test message with two commands', [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 9899), new Command('STATUS_CHECK')]);

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function(){
    expect(roverObj.mode).toBe('NORMAL');
    expect(roverObj.generatorWatts).toBe(110);
    expect(roverObj.position).toBe(98382);
  });

  test("response returned by receiveMessage contains the name of the message", function(){
    expect(roverObj.receiveMessage(msgObj).message).toBe('Test message with two commands');
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    expect(roverObj.receiveMessage(msgObj).results.length).toBe(2);
  });

  test("responds correctly to the status check command", function(){
    expect(roverObj.receiveMessage(msgObj).results[1]).toEqual({
      completed: true, 
      roverStatus: { mode: 'LOW_POWER', generatorWatts: 110, position: 98382 }
   });
  });

  test("responds correctly to the mode change command", function(){
    expect(roverObj.receiveMessage(msgObj).results).toEqual([
      { completed: true}, 
      { completed: true, 
        roverStatus: 
          {
            generatorWatts: 110, mode: 'LOW_POWER', position: 98382 
          }
      }
    ])
  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    expect(roverObj.receiveMessage(msgObj2).results[1].completed).toBe(false);
  });

  test("responds with the position for the move command", function(){
    expect(roverObj.receiveMessage(msgObj3).results[2].roverStatus.position).toBe(9899);
  });

});
