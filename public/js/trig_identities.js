// Trigonometric Identities Widget
// Allows users to explore sin, cos, tan relationships and key identities

function analyzeTrigonometricIdentities(angleInput = null) {
    let angleRad = null;
    let angleDeg = null;
    
    // Get angle from slider if no input provided
    if (angleInput === null) {
        const sliderInput = document.getElementById('angleSlider');
        if (!sliderInput) return;
        angleInput = parseFloat(sliderInput.value);
    }
    
    if (isNaN(angleInput)) {
        return;
    }
    
    // Assume input is in degrees, convert to radians
    angleDeg = angleInput;
    angleRad = (angleDeg * Math.PI) / 180;
    
    // Update slider display value
    const sliderInput = document.getElementById('angleSlider');
    if (sliderInput) {
        sliderInput.value = angleDeg;
    }
    
    const resultsDiv = document.getElementById('trigResults');
    
    // Calculate trigonometric values
    const sinValue = Math.sin(angleRad);
    const cosValue = Math.cos(angleRad);
    const tanValue = Math.tan(angleRad);
    const cscValue = Math.abs(sinValue) > 0.0001 ? 1 / sinValue : Infinity;
    const secValue = Math.abs(cosValue) > 0.0001 ? 1 / cosValue : Infinity;
    const cotValue = Math.abs(tanValue) > 0.0001 ? 1 / tanValue : Infinity;
    
    // Verify key identities
    const pythagoreanIdentity = Math.pow(sinValue, 2) + Math.pow(cosValue, 2);
    const tanIdentity = Math.abs(cosValue) > 0.0001 ? sinValue / cosValue : null;
    const tanVsCalc = Math.abs(tanValue - tanIdentity) < 0.0001 || tanIdentity === null;
    
    // Build results HTML
    let html = `
        <div class="trig-analysis">
            <h5>Trigonometric Analysis</h5>
            <p><strong>Angle:</strong> ${angleDeg.toFixed(2)}° = ${angleRad.toFixed(4)} rad</p>
            <hr>
            
            <div class="trig-values">
                <h6>Primary Trigonometric Functions</h6>
                <div class="trig-value-row">
                    <div class="trig-value-item">
                        <strong>sin(θ)</strong>
                        <p class="value">${sinValue.toFixed(4)}</p>
                    </div>
                    <div class="trig-value-item">
                        <strong>cos(θ)</strong>
                        <p class="value">${cosValue.toFixed(4)}</p>
                    </div>
                    <div class="trig-value-item">
                        <strong>tan(θ)</strong>
                        <p class="value">${isFinite(tanValue) ? tanValue.toFixed(4) : '∞'}</p>
                    </div>
                </div>
            </div>
            
            <div class="trig-values mt-3">
                <h6>Reciprocal Functions</h6>
                <div class="trig-value-row">
                    <div class="trig-value-item">
                        <strong>csc(θ)</strong>
                        <p class="value">${isFinite(cscValue) ? cscValue.toFixed(4) : '∞'}</p>
                    </div>
                    <div class="trig-value-item">
                        <strong>sec(θ)</strong>
                        <p class="value">${isFinite(secValue) ? secValue.toFixed(4) : '∞'}</p>
                    </div>
                    <div class="trig-value-item">
                        <strong>cot(θ)</strong>
                        <p class="value">${isFinite(cotValue) ? cotValue.toFixed(4) : '∞'}</p>
                    </div>
                </div>
            </div>
            
            <div class="trig-identities mt-3">
                <h6>Key Trigonometric Identities</h6>
                
                <div class="identity-check ${Math.abs(pythagoreanIdentity - 1) < 0.0001 ? 'valid' : 'invalid'}">
                    <strong>Pythagorean Identity:</strong>
                    <p>sin²(θ) + cos²(θ) = 1</p>
                    <p class="calculation">${sinValue.toFixed(4)}² + ${cosValue.toFixed(4)}² = ${pythagoreanIdentity.toFixed(4)}</p>
                </div>
                
                <div class="identity-check ${tanVsCalc ? 'valid' : 'invalid'}">
                    <strong>Quotient Identity:</strong>
                    <p>tan(θ) = sin(θ) / cos(θ)</p>
                    <p class="calculation">
                        ${sinValue.toFixed(4)} / ${cosValue.toFixed(4)} = ${tanIdentity !== null ? tanIdentity.toFixed(4) : 'undefined'}
                        ${tanValue !== undefined ? ' (tan(θ) = ' + (isFinite(tanValue) ? tanValue.toFixed(4) : '∞') + ')' : ''}
                    </p>
                </div>
                
                <div class="identity-check">
                    <strong>Complementary Angles:</strong>
                    <p>sin(θ) = cos(90° - θ), cos(θ) = sin(90° - θ)</p>
                    <p class="calculation">
                        sin(${angleDeg.toFixed(2)}°) = ${sinValue.toFixed(4)}, cos(${(90 - angleDeg).toFixed(2)}°) = ${Math.cos(((90 - angleDeg) * Math.PI) / 180).toFixed(4)}
                    </p>
                </div>
                
                <div class="identity-check">
                    <strong>Cofunction Identities:</strong>
                    <p>sin(θ) = cos(θ - 90°), cos(θ) = sin(θ + 90°)</p>
                    <p class="calculation">
                        cos(${(angleDeg - 90).toFixed(2)}°) = ${Math.cos(((angleDeg - 90) * Math.PI) / 180).toFixed(4)}, sin(${(angleDeg + 90).toFixed(2)}°) = ${Math.sin(((angleDeg + 90) * Math.PI) / 180).toFixed(4)}
                    </p>
                </div>
            </div>
            
            <div class="unit-circle-info mt-3">
                <h6>Unit Circle Position</h6>
                <p>Point on unit circle: (${cosValue.toFixed(4)}, ${sinValue.toFixed(4)})</p>
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
    drawUnitCircleWithAngle(angleRad, sinValue, cosValue);
}

function drawUnitCircleWithAngle(angleRad, sinValue, cosValue) {
    const canvas = document.getElementById('unitCircleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw axes
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.stroke();
    
    // Draw unit circle
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Draw angle arc
    ctx.strokeStyle = '#28a745';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, angleRad);
    ctx.stroke();
    
    // Draw radius line
    const x = centerX + cosValue * radius;
    const y = centerY - sinValue * radius; // Flip Y for canvas coordinates
    
    ctx.strokeStyle = '#dc3545';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Draw point
    ctx.fillStyle = '#dc3545';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw projection lines (optional visualization of sin and cos)
    ctx.strokeStyle = '#ffc107';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Vertical line (sin)
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, centerY);
    ctx.stroke();
    
    // Horizontal line (cos)
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(centerX, y);
    ctx.stroke();
    
    ctx.setLineDash([]);
    
    // Labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('cos(θ)', centerX + 45, centerY + 15);
    ctx.textAlign = 'right';
    ctx.fillText('sin(θ)', x - 10, centerY - 40);
    
    // Draw labels for axes
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('1', centerX + radius + 5, centerY + 15);
    ctx.fillText('-1', centerX - radius - 5, centerY + 15);
    ctx.textAlign = 'right';
    ctx.fillText('1', centerX - 5, centerY - radius + 5);
    ctx.fillText('-1', centerX - 5, centerY + radius + 10);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const angleSlider = document.getElementById('angleSlider');
    const angleDisplay = document.getElementById('angleDisplay');
    
    if (angleSlider) {
        angleSlider.addEventListener('input', function() {
            if (angleDisplay) {
                angleDisplay.textContent = this.value + '°';
            }
            analyzeTrigonometricIdentities(parseFloat(this.value));
        });
        
        // Initial analysis
        analyzeTrigonometricIdentities(parseFloat(angleSlider.value));
        if (angleDisplay) {
            angleDisplay.textContent = angleSlider.value + '°';
        }
    }
});
