export const filter = {

    dest: 'src/uploads/person',

    fileFilter: (req: Request, file , cb) => {
        
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
          }
          cb(null, true);
        }
} 

