import { diskStorage } from "multer";
import path from "path";


export const storage = {
    storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '');
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}