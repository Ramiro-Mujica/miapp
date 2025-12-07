const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const srcImagesDir = path.join(projectRoot, 'src', 'assets', 'images');
const publicImagesDir = path.join(projectRoot, 'public', 'images');

async function ensureDir(dir) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    }

    function copyOrMoveFile(src, dest) {
    if (!fs.existsSync(src)) return;
    if (fs.existsSync(dest)) {
        console.log(`Skip (already exists): ${path.basename(dest)}`);
        // remove source file to avoid duplicates
        try { fs.unlinkSync(src); } catch (e) { console.warn('Could not remove', src, e); }
        return;
    }
    fs.copyFileSync(src, dest);
    try { fs.unlinkSync(src); } catch (e) { console.warn('Could not remove after copy', src, e); }
    console.log(`Moved: ${path.basename(src)}`);
    }

    async function run() {
    console.log('Consolidating images: moving from src/assets/images -> public/images');
    if (!fs.existsSync(srcImagesDir)) {
        console.log('No src/assets/images directory found. Nothing to do.');
        return;
    }
    await ensureDir(publicImagesDir);

    const files = fs.readdirSync(srcImagesDir);
    if (!files.length) {
        console.log('No files in src/assets/images. Removing directory.');
        try { fs.rmdirSync(srcImagesDir); } catch (e) { console.warn('Could not remove directory', e); }
        return;
    }

    for (const f of files) {
        const src = path.join(srcImagesDir, f);
        const dest = path.join(publicImagesDir, f);
        copyOrMoveFile(src, dest);
    }

    // try remove directory if empty
    try {
        const remaining = fs.readdirSync(srcImagesDir);
        if (remaining.length === 0) {
        fs.rmdirSync(srcImagesDir);
        console.log('Removed empty src/assets/images directory');
        } else {
        console.log('Some files remain in src/assets/images:', remaining.length);
        }
    } catch (e) {
        console.warn('Could not cleanup src/assets/images directory', e);
    }

    console.log('Done. Please review public/images for expected files.');
    }

    run().catch(err => {
    console.error(err);
    process.exit(1);
});
