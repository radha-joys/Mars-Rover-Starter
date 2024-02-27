const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    test("throws error if a name is NOT passed into the constructor as the first parameter", function(){
        expect(function() { new Message() }).toThrow(new Error('Message name is required.'));
    });

    test("constructor sets name", function(){
        expect(new Message('Test message with null command', null).name).toBe('Test message with null command');
    });

    test("contains a commands array passed into the constructor as the 2nd argument", function(){
        expect(new Message('contains a commands array passed into the constructor as the 2nd argument', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1400)]).commands).toEqual(
        [{
            commandType: 'MODE_CHANGE',
            value: 'LOW_POWER'
        },
        {
            commandType: 'MOVE',
            value: 1400,
        },
        ]);
    });

});
