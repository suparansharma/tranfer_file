import { IncomingForm } from 'formidable';

var mv = require('mv');


export const config = {
    api: {
        bodyParser: false,
    }
};

export default async function upload (req, res){
    await new Promise((resolve, reject) => {
        const form = new IncomingForm()
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            var oldPath = files.file[0].filepath;
            var newPath = `${process.env.NEXT_PUBLIC_FILES_SERVER_DIRECTORY}/${fields.filename}`;
            console.log("new path: ",newPath);
            mv(oldPath, newPath, function(err) {
            });
            res.status(200).json({ fields, files })
        })
    })
    
}