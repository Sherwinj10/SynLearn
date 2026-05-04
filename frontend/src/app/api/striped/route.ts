import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Determine the path to y_strip.html in the root directory
    const rootDir = path.join(process.cwd(), '..');
    const filePath = path.join(rootDir, 'y_strip.html');
    
    // Fallback if running from root directly
    const fallbackPath = path.join(process.cwd(), 'y_strip.html');
    
    let targetPath = fs.existsSync(filePath) ? filePath : fallbackPath;
    
    const fileContent = fs.readFileSync(targetPath, 'utf8');
    
    return new NextResponse(fileContent, {
      headers: { 
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  } catch (error) {
    return new NextResponse("Error loading Striped-Y file.", { status: 500 });
  }
}
