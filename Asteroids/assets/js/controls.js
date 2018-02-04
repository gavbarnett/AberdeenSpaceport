document.addEventListener("keydown", function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }

    switch (event.keyCode) {
        case 83: //down
            //  ships[0].heading.acceleration = -0.1;
            break;
        case 87: //up
            ships[0].heading.acceleration = 0.1;
            break;
        case 65: //left
            if (ships[0].heading.rotation > -0.1) {
                ships[0].heading.rotation -= Math.PI / 200;
            }
            break;
        case 68: //right
            // code for "right arrow" key press.
            if (ships[0].heading.rotation < 0.1) {
                ships[0].heading.rotation += Math.PI / 200;
            }
            break;
        case 32: //space
            // code for "right arrow" key press.
            if (bullets.length < 10) {
                bullets.push(new Bullet(ships[0].pos, ships[0].heading));
            }
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);

document.addEventListener("keyup", function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.keyCode) {
        case 83:
            //      ships[0].heading.acceleration = 0;
            break;
        case 87:
            ships[0].heading.acceleration = 0;
            break;
        case 65: //left
            //ships[0].heading.rotation = 0;
            break;
        case 68: //right
            // code for "right arrow" key press.
            //ships[0].heading.rotation = 0;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
