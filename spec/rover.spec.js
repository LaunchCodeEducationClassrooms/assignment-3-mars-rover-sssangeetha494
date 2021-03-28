const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() 
{
  // 7 tests here!
  //Test 7
it("constructor sets position and default values for mode and generatorWatts",function()
  {
   let rover = new Rover(98382); 
   expect(rover.position).toEqual(98382);
   expect(rover.generatorWatts ).toEqual(110);
   expect(rover.mode).toEqual('NORMAL');
  });
//Test 8
    
it("response returned by receiveMessage contains name of message",function()
  {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message with two commands');

  });
//Test 9
it("response returned by receiveMessage includes two results if two commands are sent in the message",function()
  {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382); 
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2);
  });
  //test10
  it("responds correctly to status check command",function()
  {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Responds correcty to the status check command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
  
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(98382);
    
  });
  //test11
  it("responds correctly to mode change command",function()
  {
    let commands = [new Command('MODE_CHANGE', 'NORMAL')];
    let message = new Message('Responds correctly to mode change command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.position).toEqual(98382);
   
  });
  //test12
  it("responds with false completed value when attempting to move in LOW_POWER mode",function()
  {
   let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', '10'), new Command('STATUS_CHECK')];
    let message=new Message('attempting to move in LOW_POWER mode',commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    expect(response.results[2].completed).toBeFalse;
    expect(response.results[2].roverStatus.position).toEqual(98382);

     
  });
  //test13
  it("responds with position for move command",function()
  {
     let commands = [new Command('MOVE', 5678), new Command('MOVE', 6543)];
    let message = new Message('Responds with position for move command', commands);
    let rover = new Rover(message.commands.value);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(6543)
    
  });
});