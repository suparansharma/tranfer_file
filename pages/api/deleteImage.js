import fs from 'fs';
import path from 'path';

export  default async function deleteImage (req, res) {
    console.log("deleteImage deleteImage");
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    
    const { imageName } = req.body;
    if (!imageName) {
        return res.status(400).json({ error: 'Missing imageName in the request body' });
    }
    
    const imagePath = path.join(`${process.env.NEXT_PUBLIC_FILES_SERVER_DIRECTORY}`, imageName);
    console.log("imge path: ",imagePath);
    try {
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            return res.status(200).json({ success: true, message: 'Image deleted successfully' });
        } else {
            return res.status(404).json({ error: 'Image not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}
