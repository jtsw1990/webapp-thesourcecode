// Algebraic Structures Widget
// Evaluates if a set of numbers forms a set, group, ring, or field

function analyzeStructure() {
    const inputValue = document.getElementById('numberInput').value.trim();
    const resultsDiv = document.getElementById('analysisResults');
    
    if (!inputValue) {
        resultsDiv.innerHTML = '<p class="text-warning">Please enter some numbers to analyze.</p>';
        return;
    }
    
    // Parse input - accept both comma and space separated
    let numbers = [];
    try {
        numbers = inputValue.split(/[,\s]+/)
            .map(n => {
                const parsed = parseFloat(n);
                if (isNaN(parsed)) throw new Error(`Invalid number: ${n}`);
                return parsed;
            })
            .filter(n => !isNaN(n));
    } catch (e) {
        resultsDiv.innerHTML = `<p class="text-danger">Error parsing input: ${e.message}</p>`;
        return;
    }
    
    if (numbers.length === 0) {
        resultsDiv.innerHTML = '<p class="text-warning">Please enter valid numbers.</p>';
        return;
    }
    
    // Analyze structure
    const isSet = checkIsSet(numbers);
    const isGroup = isSet ? checkIsGroup(numbers) : false;
    const isRing = isGroup ? checkIsRing(numbers) : false;
    const isField = isRing ? checkIsField(numbers) : false;
    
    // Build results HTML
    let html = `
        <div class="structure-analysis">
            <h5>Analysis Results</h5>
            <p><strong>Input:</strong> ${numbers.join(', ')}</p>
            <hr>
            
            <div class="structure-result ${isSet ? 'valid' : 'invalid'}">
                <strong>Set:</strong> ${isSet ? '✓ YES' : '✗ NO'}
                <p class="small text-muted">Definition: Collection of unique, well-defined elements</p>
                ${isSet ? '<p class="small">Your numbers form a valid set (no duplicates).</p>' : '<p class="small">Your numbers contain duplicates.</p>'}
            </div>
            
            <div class="structure-result ${isGroup ? 'valid' : 'invalid'}">
                <strong>Group:</strong> ${isGroup ? '✓ YES' : '✗ NO'}
                <p class="small text-muted">Definition: Set with operation having closure, associativity, identity, and inverses</p>
                ${isGroup 
                    ? '<p class="small">Your numbers form a group under addition (mod 10).</p>' 
                    : '<p class="small">' + (!isSet ? 'Not a set.' : getGroupFailureReason(numbers)) + '</p>'}
            </div>
            
            <div class="structure-result ${isRing ? 'valid' : 'invalid'}">
                <strong>Ring:</strong> ${isRing ? '✓ YES' : '✗ NO'}
                <p class="small text-muted">Definition: Group under addition with distributive multiplication</p>
                ${isRing 
                    ? '<p class="small">Your numbers form a ring.</p>' 
                    : '<p class="small">' + (!isGroup ? 'Not a group (prerequisite for ring).' : 'Does not satisfy ring properties.') + '</p>'}
            </div>
            
            <div class="structure-result ${isField ? 'valid' : 'invalid'}">
                <strong>Field:</strong> ${isField ? '✓ YES' : '✗ NO'}
                <p class="small text-muted">Definition: Commutative ring where every non-zero element has a multiplicative inverse</p>
                ${isField 
                    ? '<p class="small">Your numbers form a field.</p>' 
                    : '<p class="small">' + (!isRing ? 'Not a ring (prerequisite for field).' : 'Does not satisfy field properties.') + '</p>'}
            </div>
        </div>
    `;
    
    resultsDiv.innerHTML = html;
}

function checkIsSet(numbers) {
    // A set has unique elements
    const uniqueNumbers = new Set(numbers);
    return uniqueNumbers.size === numbers.length;
}

function checkIsGroup(numbers) {
    // For a finite set to be a group, we check under modular arithmetic
    // Requirements: Closure, Associativity (always true for addition mod n), Identity (0), Inverses
    
    const mod = Math.max(...numbers.map(n => Math.abs(n))) + 1 || 1;
    const normalized = numbers.map(n => ((n % mod) + mod) % mod);
    
    // Must have identity element (0)
    if (!normalized.includes(0)) {
        return false;
    }
    
    // Check for closure under addition mod n
    for (let i = 0; i < normalized.length; i++) {
        for (let j = 0; j < normalized.length; j++) {
            const sum = (normalized[i] + normalized[j]) % mod;
            if (!normalized.includes(sum)) {
                return false; // Closure fails
            }
        }
    }
    
    // Check for inverses (every element a must have -a in the set)
    for (let num of normalized) {
        const inverse = (-num % mod + mod) % mod;
        if (!normalized.includes(inverse)) {
            return false; // Inverse missing
        }
    }
    
    return true;
}

function checkIsRing(numbers) {
    // A ring must be a group under addition with associative multiplication and distributivity
    // We'll check under modular arithmetic
    
    if (!checkIsGroup(numbers)) {
        return false;
    }
    
    const mod = Math.max(...numbers.map(n => Math.abs(n))) + 1 || 1;
    const normalized = numbers.map(n => ((n % mod) + mod) % mod);
    
    // Check if multiplication is closed
    for (let i = 0; i < normalized.length; i++) {
        for (let j = 0; j < normalized.length; j++) {
            const product = (normalized[i] * normalized[j]) % mod;
            if (!normalized.includes(product)) {
                return false;
            }
        }
    }
    
    // Check distributivity: a*(b+c) = a*b + a*c for sample elements
    // Just check a few examples
    if (normalized.length >= 3) {
        for (let i = 0; i < Math.min(2, normalized.length); i++) {
            for (let j = 0; j < Math.min(2, normalized.length); j++) {
                for (let k = 0; k < Math.min(2, normalized.length); k++) {
                    const a = normalized[i];
                    const b = normalized[j];
                    const c = normalized[k];
                    const left = (a * ((b + c) % mod)) % mod;
                    const right = ((a * b) % mod + (a * c) % mod) % mod;
                    if (left !== right) {
                        return false;
                    }
                }
            }
        }
    }
    
    return true;
}

function checkIsField(numbers) {
    // A field is a commutative ring where every non-zero element has a multiplicative inverse
    
    if (!checkIsRing(numbers)) {
        return false;
    }
    
    const mod = Math.max(...numbers.map(n => Math.abs(n))) + 1 || 1;
    const normalized = numbers.map(n => ((n % mod) + mod) % mod);
    const nonZeroNumbers = normalized.filter(n => n !== 0);
    
    // Check for multiplicative inverses (every non-zero element must have one)
    for (let num of nonZeroNumbers) {
        let hasInverse = false;
        for (let other of normalized) {
            if ((num * other) % mod === 1) {
                hasInverse = true;
                break;
            }
        }
        if (!hasInverse) {
            return false;
        }
    }
    
    return true;
}

function getGroupFailureReason(numbers) {
    // Determine why it's not a group (under modular arithmetic)
    
    const mod = Math.max(...numbers.map(n => Math.abs(n))) + 1 || 1;
    const normalized = numbers.map(n => ((n % mod) + mod) % mod);
    
    // Check for identity element (0)
    if (!normalized.includes(0)) {
        return 'No identity element (0) found.';
    }
    
    // Check closure
    for (let i = 0; i < normalized.length; i++) {
        for (let j = 0; j < normalized.length; j++) {
            const sum = (normalized[i] + normalized[j]) % mod;
            if (!normalized.includes(sum)) {
                return `Closure fails: ${normalized[i]} + ${normalized[j]} ≡ ${sum} (mod ${mod}), not in set.`;
            }
        }
    }
    
    // Check inverses
    for (let num of normalized) {
        const inverse = (-num % mod + mod) % mod;
        if (!normalized.includes(inverse)) {
            return `Missing inverse for ${num} (would be ${inverse} in mod ${mod}).`;
        }
    }
    
    return 'Does not satisfy group properties.';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeStructure);
    }
    
    const numberInput = document.getElementById('numberInput');
    if (numberInput) {
        numberInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                analyzeStructure();
            }
        });
    }
});
