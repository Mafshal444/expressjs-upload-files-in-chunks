// // const express = require('express');
// // const app = express();
// // const bodyParser = require('body-parser');
// // const multer = require('multer');
// // const path = require('path');
// const cors = require('cors');
// // JavaScript code
// const express = require('express');
// const app = express();
// const multer = require('multer');
// const fs = require('fs');
// const path = require('path');

// const UPLOAD_DIR = path.join(__dirname, 'uploads');
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname + '-' + Date.now())
//     }
//   })
// });


// app.use(cors())
// app.post('/upload', upload.single('file'), (req, res) => {
//   // const file = req.file;
//   // const offset = parseInt(req.headers['x-file-offset'] || '0');

//   // const filePath = path.join(UPLOAD_DIR, file.originalname);
//   // const stream = fs.createWriteStream(filePath, { flags: 'a', start: offset });

//   // req.on('data', (chunk) => {
//   //   stream.write(chunk);
//   // });

//   // req.on('end', () => {
//   //   stream.end();
//   //   res.sendStatus(200);
//   // });
//   const chunk = req.file.buffer;
//   const offset = parseInt(req.headers['x-file-offset'] || '0');
//   const filePath = 'uploads/' + req.file.originalname;

//   const stream = fs.createWriteStream(filePath, { flags: 'a', start: offset });
//   stream.end(chunk);

//   res.sendStatus(200);
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

// // const uploadDir = path.join(__dirname, 'uploads');
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, uploadDir);
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, file.originalname);
// //   }
// // });

// // const upload = multer({
// //   storage: storage
// // });
// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // app.post('/upload', upload.single('file'), (req, res) => {
// //   const file = req.file;
// //   console.log("Received file chunk: ", file);
// //   res.sendStatus(200);
// // });

// // app.listen(3000, () => {
// //   console.log('Server started on port 3000');
// // });


// const express = require('express');
// const app = express();
// const fs = require('fs');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const multer = require('multer');

// const UPLOAD_DIR = path.join(__dirname, 'uploads');

// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const storage = multer.diskStorage({
//   destination: UPLOAD_DIR,
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({
//   storage: storage
// });

// app.post('/upload', upload.single('chunk'), (req, res) => {
//   const file = req.file;
//   const offset = parseInt(req.headers['x-file-offset'] || '0');

//   const filePath = path.join(UPLOAD_DIR, file.originalname);
//   const stream = fs.createWriteStream(filePath, { flags: 'a', start: offset });

//   file.stream.on('data', chunk => {
//     stream.write(chunk);
//   });

//   file.stream.on('end', () => {
//     stream.end();
//     const redirectUrl = `/upload/complete?path=${filePath}`; // Pass path as query parameter
//     res.redirect(redirectUrl);
//   });
// });

// app.get('/upload/complete', (req, res) => {
//   const filePath = req.query.path; // Get path from query parameter
//   const fileWriteStream = fs.createWriteStream(filePath);
//   const files = fs.readdirSync(UPLOAD_DIR);

//   files.sort((a, b) => {
//     const aIndex = parseInt(a.split('.')[1]);
//     const bIndex = parseInt(b.split('.')[1]);
//     return aIndex - bIndex;
//   });

//   files.forEach(file => {
//     const chunkPath = path.join(UPLOAD_DIR, file);
//     const chunkReadStream = fs.createReadStream(chunkPath);
//     chunkReadStream.pipe(fileWriteStream);
//   });

//   fileWriteStream.on('close', () => {
//     files.forEach(file => {
//       const chunkPath = path.join(UPLOAD_DIR, file);
//       fs.unlinkSync(chunkPath);
//     });
//     res.sendStatus(200);
//   });
// });

// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });

const express = require('express');
const ChunkedUpload = require('express-chunked-file-upload');
const cors = require('cors');

const app = express();
app.use(cors());
const chunkedUpload = new ChunkedUpload({ filePath: 'media/' });

app.post('/upload', chunkedUpload.makeMiddleware(), (req, res) => {
    console.log("000000000000000000" , req.filePart, req.isLastPart)
    if (req.filePart === 0) {
        // ... Do something when file upload starts
        res.send({ filePart: req.filePart, isLastPart: req.isLastPart });
    }
    else if (req.isLastPart) {
        // ... Do something when file upload finishes
        res.send({ filePart: req.filePart, isLastPart: req.isLastPart });
    } else {
      res.send({ filePart: req.filePart, isLastPart: req.isLastPart });
    }
    
});

app.listen(3000)