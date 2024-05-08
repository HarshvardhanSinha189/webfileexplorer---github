import { NextResponse } from "next/server"

const fs = require('fs');
const path = require('path');

function listFilesAndFolders(folderPath) {
    try {
        const files = fs.readdirSync(folderPath);
        const contents = {
            files: [],
            folders: []
        };

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                contents.folders.push(file);
            } else {
                contents.files.push(file);
            }
        });

        return contents;
    } catch (err) {
        console.error('Error reading folder:', err);
        return null;
    }
}

export async function POST(request) {
    
    // console.log(listFilesAndFolders("./"))
    console.log("Request came");
    
}