import { headers } from "next/headers";
import { NextResponse } from "next/server"

const fs = require('fs');
const path = require('path');
let currentWorkingDiretcory = "./"

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

export async function POST(request, response) {
    // console.log(listFilesAndFolders("./"))
    let headersList = request.headers
    // let backHeader = headersList[Symbol.for('headers map')]['back'];

    let spath = request.headers.get('current_working_directory')
    
    return NextResponse.json({ success: true, file: listFilesAndFolders(spath)})
}