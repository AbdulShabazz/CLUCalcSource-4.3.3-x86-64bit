try {
    let animationId;
    let primitives = [];
    let isDragging = false;
    let spinVector = [0, 0, 0];
    let prevMouseX, prevMouseY;
    let rotationX = 0, rotationY = 0;
    let translationX = 0, translationY = 0;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Event listener for mouse down
    canvas.addEventListener('mousedown', startDragging);
    
    // Event listener for mouse move
    canvas.addEventListener('mousemove', drag);
    
    // Event listener for mouse up
    canvas.addEventListener('mouseup', stopDragging);
    canvas.addEventListener('mouseleave', stopDragging);
    
    // Event listeners for spin vector controls
    document.getElementById('spin-vector-x').addEventListener('input', updateSpinVector);
    document.getElementById('spin-vector-y').addEventListener('input', updateSpinVector);
    document.getElementById('spin-vector-z').addEventListener('input', updateSpinVector);

    // Event listener for adding a new primitive
    document.getElementById('add-primitive').addEventListener('click', addPrimitive);

    // Function to draw a vector on the canvas
    function drawVector(x1, y1, x2, y2, color) {
        ctx.save();
        
        ctx.translate(canvas.width / 2 + translationX, canvas.height / 2 + translationY);
        ctx.rotate(rotationY);
        ctx.rotate(rotationX);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.restore();
    }

    // Function to draw a point on the canvas
    function drawPoint(x, y, color) {
        ctx.save();
        
        ctx.translate(canvas.width / 2 + translationX, canvas.height / 2 + translationY);
        ctx.rotate(rotationY);
        ctx.rotate(rotationX);
        
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    }

    // Function to draw a line on the canvas
    function drawLine(x1, y1, x2, y2, color) {
        ctx.save();
        
        ctx.translate(canvas.width / 2 + translationX, canvas.height / 2 + translationY);
        ctx.rotate(rotationY);
        ctx.rotate(rotationX);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.restore();
    }

    // Function to draw a plane on the canvas
    function drawPlane(x1, y1, x2, y2, x3, y3, color) {
        ctx.save();
        
        ctx.translate(canvas.width / 2 + translationX, canvas.height / 2 + translationY);
        ctx.rotate(rotationY);
        ctx.rotate(rotationX);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();

        ctx.restore();
    }
    
    // Function to draw the XYZ axis
    function drawAxis() {
        ctx.save();
        
        ctx.translate(canvas.width / 2 + translationX, canvas.height / 2 + translationY);
        ctx.rotate(rotationY);
        ctx.rotate(rotationX);
        applySpinVectorRotation(spinVector);
      
        // X-axis (Red)
        ctx.beginPath();
        ctx.moveTo(-canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, 0);
        ctx.strokeStyle = 'red';
        ctx.stroke();
      
        // Y-axis (Green)
        ctx.beginPath();
        ctx.moveTo(0, -canvas.height / 2);
        ctx.lineTo(0, canvas.height / 2);
        ctx.strokeStyle = 'green';
        ctx.stroke();
      
        // Z-axis (Blue)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(100, -100);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
      
        // X-axis label
        ctx.font = '12px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('X', canvas.width / 2 - 20, -10);
      
        // Y-axis label
        ctx.fillStyle = 'green';
        ctx.fillText('Y', 10, -canvas.height / 2 + 20);
      
        // Z-axis label
        ctx.fillStyle = 'blue';
        ctx.fillText('Z', 110, -110);
      
        ctx.restore();
    }
    
    // Function to start dragging
    function startDragging(event) {
        isDragging = true;
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }
    
    // Function to handle dragging
    function drag(event) {
        if (!isDragging) return;
        
        const deltaX = event.clientX - prevMouseX;
        const deltaY = event.clientY - prevMouseY;
        
        // Rotate based on horizontal mouse movement
        rotationY += deltaX * 0.01;
        
        // Rotate based on vertical mouse movement
        rotationX += deltaY * 0.01;
        
        // Translate based on mouse movement
        translationX += deltaX;
        translationY += deltaY;
        
        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
            
        // Redraw the axis
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawAxis();
    }
    
    // Function to stop dragging
    function stopDragging() {
        isDragging = false;
    }

    // Function to update and render the axis
    function updateAxis() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);  

        // Example usage
        /*
        drawVector(100, 100, 200, 200, 'red');
        drawPoint(300, 300, 'blue');
        drawLine(400, 100, 600, 300, 'green');
        drawPlane(500, 400, 700, 400, 600, 500, 'yellow'); 
        */

        drawPrimitives();  
        
        // Call the drawAxis function to display the XYZ axis
        drawAxis();
        
        // Request the next animation frame
        animationId = requestAnimationFrame(updateAxis);
    }

    // Function to apply spin vector rotation
    function applySpinVectorRotation(spinVector) {
        const [sx, sy, sz] = spinVector;
        const angle = Math.sqrt(sx * sx + sy * sy + sz * sz);
        const sinAngle = Math.sin(angle);
        const cosAngle = Math.cos(angle);

        const rotationMatrix = [
            cosAngle + sx * sx * (1 - cosAngle),
            sx * sy * (1 - cosAngle) - sz * sinAngle,
            sx * sz * (1 - cosAngle) + sy * sinAngle,
            sx * sy * (1 - cosAngle) + sz * sinAngle,
            cosAngle + sy * sy * (1 - cosAngle),
            sy * sz * (1 - cosAngle) - sx * sinAngle,
            sx * sz * (1 - cosAngle) - sy * sinAngle,
            sy * sz * (1 - cosAngle) + sx * sinAngle,
            cosAngle + sz * sz * (1 - cosAngle)
        ];

        ctx.transform(
            rotationMatrix[0], rotationMatrix[1], rotationMatrix[3],
            rotationMatrix[4], rotationMatrix[6], rotationMatrix[7]
        );
    }

    // Function to update the spin vector
    function updateSpinVector() {
        spinVector[0] = parseFloat(document.getElementById('spin-vector-x').value);
        spinVector[1] = parseFloat(document.getElementById('spin-vector-y').value);
        spinVector[2] = parseFloat(document.getElementById('spin-vector-z').value);
    }

    // Function to draw primitives
    function drawPrimitives() {
        ctx.save();
        ctx.translate(canvas.width / 2 + translationX, canvas.height / 2 + translationY);
        ctx.rotate(rotationY);
        ctx.rotate(rotationX);

        primitives.forEach(primitive => {
            switch (primitive.type) {
            case 'line':
                drawLine(primitive.x1, primitive.y1, primitive.x2, primitive.y2, primitive.color);
                break;
            case 'point':
                drawPoint(primitive.x, primitive.y, primitive.color);
                break;
            case 'vector':
                drawVector(primitive.x1, primitive.y1, primitive.x2, primitive.y2, primitive.color);
                break;
            case 'sphere':
                drawSphere(primitive.x, primitive.y, primitive.radius, primitive.color);
                break;
            case 'plane':
                drawPlane(primitive.x1, primitive.y1, primitive.x2, primitive.y2, primitive.x3, primitive.y3, primitive.color);
                break;
            }
        });

        ctx.restore();
    }

    // Function to add a new primitive
    function addPrimitive() {
        const primitiveType = document.getElementById('primitive-type').value;
        const color = document.getElementById('color').value;

        let primitive;

        switch (primitiveType) {
            case 'line':
            primitive = {
                type: 'line',
                x1: 0, y1: 0,
                x2: 100, y2: 100,
                color: color
            };
            break;
            case 'point':
            primitive = {
                type: 'point',
                x: 0, y: 0,
                color: color
            };
            break;
            case 'vector':
            primitive = {
                type: 'vector',
                x1: 0, y1: 0,
                x2: 100, y2: 100,
                color: color
            };
            break;
            case 'sphere':
            primitive = {
                type: 'sphere',
                x: 0, y: 0,
                radius: 0.1,
                color: color
            };
            break;
            case 'plane':
            primitive = {
                type: 'plane',
                x1: -100, y1: -100,
                x2: 100, y2: -100,
                x3: 0, y3: 100,
                color: color
            };
            break;
        }

        primitives.push(primitive);
    }

    // Start the animation loop
    animationId = requestAnimationFrame(updateAxis);
} catch(e) {
    console.info(e);
}
