#!/usr/bin/env bun
/**
 * Auto-generated bootstrap script
 * Runs once after git clone to setup project correctly
 * This file will self-delete after successful execution
 */

const fs = require('fs');
const { execSync } = require('child_process');

const PROJECT_NAME = "primespace-6zf8meiudmyo1dfe0-jal";
const BOOTSTRAP_MARKER = '.bootstrap-complete';

// Check if already bootstrapped
if (fs.existsSync(BOOTSTRAP_MARKER)) {
    console.log('✓ Bootstrap already completed');
    process.exit(0);
}

console.log('🚀 Running first-time project setup...\n');

try {
    // Update package.json
    updatePackageJson();
    
    // Update wrangler.jsonc if exists
    updateWranglerJsonc();
    
    // Run setup commands
    runSetupCommands();
    
    // Mark as complete
    fs.writeFileSync(BOOTSTRAP_MARKER, new Date().toISOString());
    
    // Self-delete
    fs.unlinkSync(__filename);
    
    console.log('\n✅ Bootstrap complete! Project ready.');
} catch (error) {
    console.error('❌ Bootstrap failed:', error.message);
    console.log('You may need to manually update package.json and wrangler.jsonc');
    process.exit(1);
}

function updatePackageJson() {
    try {
        const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        pkg.name = PROJECT_NAME;
        
        // Remove prepare script after bootstrap
        if (pkg.scripts && pkg.scripts.prepare) {
            delete pkg.scripts.prepare;
        }
        
        fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
        console.log('✓ Updated package.json with project name: ' + PROJECT_NAME);
    } catch (error) {
        console.error('Failed to update package.json:', error.message);
        throw error;
    }
}

function updateWranglerJsonc() {
    if (!fs.existsSync('wrangler.jsonc')) {
        console.log('⊘ wrangler.jsonc not found, skipping');
        return;
    }
    
    try {
        let content = fs.readFileSync('wrangler.jsonc', 'utf8');
        content = content.replace(/"name"\s*:\s*"[^"]*"/, `"name": "${PROJECT_NAME}"`);
        fs.writeFileSync('wrangler.jsonc', content);
        console.log('✓ Updated wrangler.jsonc with project name: ' + PROJECT_NAME);
    } catch (error) {
        console.warn('⚠️  Failed to update wrangler.jsonc:', error.message);
    }
}

function runSetupCommands() {
    const commands = [
    "bun add framer-motion lucide-react clsx tailwind-merge date-fns sonner",
    "bun install vue vue-router pinia @tanstack/vue-query @vitejs/plugin-vue",
    "bun add lucide-vue-next",
    "bun remove react react-dom react-router-dom @tanstack/react-query @vitejs/plugin-react @types/react @types/react-dom eslint-plugin-react-hooks eslint-plugin-react-refresh",
    "bun add vue@^3.5.12 vue-router@^4.5.0 pinia@^2.2.4 lucide-vue-next@^0.525.0 @tanstack/vue-query@^5.79.1",
    "bun add -D @vitejs/plugin-vue@^6.0.6 eslint-plugin-vue@^9.29.0"
];
    
    if (commands.length === 0) {
        console.log('⊘ No setup commands to run');
        return;
    }
    
    console.log('\n📦 Running setup commands...\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const cmd of commands) {
        console.log(`▸ ${cmd}`);
        try {
            execSync(cmd, { 
                stdio: 'inherit',
                cwd: process.cwd()
            });
            successCount++;
        } catch (error) {
            failCount++;
            console.warn(`⚠️  Command failed: ${cmd}`);
            console.warn(`   Error: ${error.message}`);
        }
    }
    
    console.log(`\n✓ Commands completed: ${successCount} successful, ${failCount} failed\n`);
}
