$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    // toggleGrid();


    // TODO 2 - Create Platforms
    createPlatform(220, 650, 50, 40,"black")
    createPlatform(400, 620, 80, 600, "black")
    createPlatform(620, 490, 50, 700, "red")
    createPlatform(880, 500, 200, 50, "black")
    createPlatform(800, 500, 80, 600, "black")
    createPlatform(400, 300, 200, 20, "blue", 300, 500, 1)
    createPlatform(1150, 650, 50, 30, "black" )
    createPlatform(1220, 580, 50, 30, "black")
    createPlatform(750, 360, 50, 20, "black")

    // TODO 3 - Create Collectables
    createCollectable("diamond", 230, 150, 0.5, 0.7);
    createCollectable("kennedi", 900, 700, 0.5, 0.7)  
    createCollectable("database", 1000, 350, 0.5, 0.7)
    // TODO 4 - Create Cannons
   createCannon("top", 200, 1000);
   createCannon("right", 300, 1000);
   createCannon("top", 380, 3000)
   createCannon("top", 580, 2000)
   createCannon("right", 500, 1500)    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
