// ====================================
// ENTANGLED PAIR - Partner Window
// This is the inverted/mirrored entangled partner
// ====================================

// Import the same code structure but with different seed and phase
// For simplicity, we'll duplicate the core code with modifications

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl2', {
    alpha: false,
    antialias: true,
    preserveDrawingBuffer: false,
    powerPreference: 'high-performance'
});

if (!gl) {
    alert('WebGL2 not supported');
    throw new Error('WebGL2 not supported');
}

// Signal to main window that pair is ready
if (window.opener) {
    window.opener.postMessage({ type: 'sync-ready' }, '*');
}

// Simplified version - loads the same main.js logic
// In production, you'd share the ParticleSystem class

// For now, let's create a minimal synchronized version
const script = document.createElement('script');
script.textContent = `
    // Reuse main.js logic but with partner configuration
    window.PARTNER_MODE = true;
    window.PARTNER_SEED = 56195; // Inverted seed (tez #056, eth #195)
`;
document.head.appendChild(script);

// Load main logic
const mainScript = document.createElement('script');
mainScript.src = 'main.js';
mainScript.onload = () => {
    console.log('Partner window initialized');

    // Override some parameters for visual difference
    if (window.particleSystem) {
        window.particleSystem.isPartner = true;
        window.hueShift = Math.PI; // 180 degree hue offset
    }
};
document.head.appendChild(mainScript);

// Listen for sync messages from main window
window.addEventListener('message', (e) => {
    if (e.data.type === 'particle-sync' && window.particleSystem) {
        // Receive partner particle data for entanglement
        window.particleSystem.partnerData = e.data.data;
    }
});

// Send our particle data to main window
setInterval(() => {
    if (window.opener && window.particleSystem) {
        window.opener.postMessage({
            type: 'particle-sync',
            data: {
                positions: window.particleSystem.positions,
                velocities: window.particleSystem.velocities
            }
        }, '*');
    }
}, 50); // Update at 20Hz
