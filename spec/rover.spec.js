const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function(){
    expect(new Rover(98382).mode).toBe('NORMAL');
    expect(new Rover(98382).generatorWatts).toBe(110);
  });

  test("response returned by receiveMessage contains the name of the message", function(){
    expect(new Rover(98382).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).message).toBe('Test message with two commands');
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    expect(new Rover(98382).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).results.length).toBe(2);
  });

  test("responds correctly to the status check command", function(){
    expect(new Rover(98382).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')])).results[1]).toEqual({
      completed: true, 
      roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 98382 }
   });
  });

  test("responds correctly to the mode change command", function(){
    expect(new Rover(98382).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).results[0].completed).toBe(true);
    expect(new Rover(98382).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).results[1].roverStatus.mode).toBe('LOW_POWER');
    expect(new Rover(98382).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')])).results[1].roverStatus.mode).toBe('NORMAL');
  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    expect(new Rover(98382).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 9899), new Command('STATUS_CHECK')])).results[1].completed).toBe(false);
  });

  test("responds with the position for the move command", function(){
    expect(new Rover(98382).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 9899), new Command('STATUS_CHECK')])).results[2].roverStatus.position).toBe(9899);
  });

});
