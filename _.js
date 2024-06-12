try {
    let animationId;
    let isDragging = false;
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
        drawVector(100, 100, 200, 200, 'red');
        drawPoint(300, 300, 'blue');
        drawLine(400, 100, 600, 300, 'green');
        drawPlane(500, 400, 700, 400, 600, 500, 'yellow');      
        
        // Call the drawAxis function to display the XYZ axis
        drawAxis();
        
        // Request the next animation frame
        animationId = requestAnimationFrame(updateAxis);
    }

    // Start the animation loop
    animationId = requestAnimationFrame(updateAxis);
} catch(e) {
    console.info(e);
}