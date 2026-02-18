// Import packages from package.json dependencies
const express = require('express');
const path = require('path');
const { createSyncFn } = require('synckit');
const is = require('is');
const eslintPluginPrettier = require('eslint-plugin-prettier');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// API endpoint to get application info
app.get('/api/info', (req, res) => {
    const info = {
        message: "Hello from the containerized npm application!",
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString(),
        packages: {
            is: {
                loaded: true,
                tests: {
                    'is.string("hello")': is.string('hello'),
                    'is.number(42)': is.number(42),
                    'is.array([1,2,3])': is.array([1, 2, 3]),
                    'is.object({})': is.object({}),
                    'is.boolean(true)': is.boolean(true)
                }
            },
            synckit: {
                loaded: true,
                createSyncFnAvailable: typeof createSyncFn === 'function'
            },
            eslintPluginPrettier: {
                loaded: !!eslintPluginPrettier,
                hasRules: !!eslintPluginPrettier.rules,
                rulesCount: eslintPluginPrettier.rules ? Object.keys(eslintPluginPrettier.rules).length : 0
            }
        }
    };

    res.json(info);
});

// API endpoint for Trojan Horse history
app.get('/api/history', (req, res) => {
    const history = [
        { year: '1194 BC', event: 'Paris abducts Helen, starting the Trojan War' },
        { year: '1184 BC', event: 'Greeks build the Trojan Horse' },
        { year: '1184 BC', event: 'Troy falls to the Greek army' },
        { year: '800 BC', event: 'Homer writes about the war in the Iliad' },
        { year: '29-19 BC', event: 'Virgil describes the horse in the Aeneid' },
        { year: '2024 AD', event: 'The legend continues to inspire technology and culture' }
    ];

    res.json(history);
});

// Root endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log("=".repeat(60));
    console.log("🐴 Beautiful Trojan Horse Application Started! 🐴");
    console.log("=".repeat(60));
    console.log(`Server running at: http://localhost:${PORT}`);
    console.log(`Node.js version: ${process.version}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log("\n--- Package Demonstrations ---");

    // Using 'is' package for type checking
    console.log("\n1. Using 'is' package:");
    console.log("   is.string('hello'):", is.string('hello'));
    console.log("   is.number(42):", is.number(42));
    console.log("   is.array([1,2,3]):", is.array([1, 2, 3]));

    // Using synckit
    console.log("\n2. Using 'synckit' package:");
    console.log("   Synckit createSyncFn available:", typeof createSyncFn === 'function');

    // Using eslint-plugin-prettier
    console.log("\n3. Using 'eslint-plugin-prettier' package:");
    console.log("   ESLint Prettier Plugin loaded:", !!eslintPluginPrettier);
    console.log("   Plugin has rules:", !!eslintPluginPrettier.rules);

    console.log("\n--- Application Started Successfully ---");
    console.log("=".repeat(60));
});
