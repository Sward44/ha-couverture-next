import multer from 'multer';

   // Configuration de multer
   const upload = multer({
     storage: multer.diskStorage({
       destination: function (req, file, cb) {
         cb(null, './components/img/uploads'); // Vous pouvez spécifier votre dossier de destination ici
       },
       filename: function (req, file, cb) {
         cb(null, file.originalname); // Vous pouvez personnaliser le nom du fichier ici
       }
     })
   });