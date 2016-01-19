// mongorc.js

var compliment = ["attractive", "intelligent", "like Batman"];
var index = Math.floor(Math.random()*3);

// Define a no function
var turnOff =  function(){
  print("That function has been disabled in this session.");
}

// Startup message
print("Hello, you're looking exceptionally " + compliment[index] + " today!")

var connectTo = function(port, database){
  if (!port) {
    port = 27017;
  }

  if (!database){
    database = "test";
  }

  db = connect("localhost:" + port+ "/" + database)
  return db
}

if (typeof db !== 'undefined') {
  // Prevent dropping databases
  db.dropDatabase = DB.prototype.dropDatabase = turnOff;
  // Prevent dropping collections
  DBCollection.prototype.drop = turnOff;
  // Prevent dropping indexes
  DBCollection.prototype.dropIndex = turnOff;
}

// prompt is a global variable within the shell. You can then customise this prompt according to your requirements

prompt = function(){
  if (typeof db === "undefined") {
    return "(nodb)>";
  } else if (db !== "test"){
      try {
        db.runCommand({getLastError:1});
      } catch (e) {
        print(e);
      }
      return db + '> ';
  } else {
    return new Date(); + '> '
  }
}
