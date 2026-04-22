// import multer from "multer";
// import fs from "fs";
// // let storage = multer.diskStorage()

// export let multer_local = ({customPath}={customPath:"general"}) => {
// 	let storage = multer.diskStorage({
// 		destination: function (req, file, cb) {
// 			if (!fs.existsSync(`uploads/${customPath}`)) {
// 				fs.mkdirSync(`uploads/${customPath}`, { recursive: true });
// 			}
// 			cb(null, `uploads/${customPath}/`);
// 		},
// 		filename: function (req, file, cb) {
// 			console.log(file);
			
// 			cb(null, Date.now() + "-" + file.originalname);
// 		},
// 	});

// 	return multer({ storage });
// };

import multer from "multer";
import fs from "fs";







export const multer_local = ({customPath}={customPath:"general"})=>{

	const storage= multer.diskStorage({
		destination:function(req,file,cb){
			if (!fs.existsSync(`uploads/${customPath}`)) {
				fs.mkdirSync(`uploads/${customPath}`, { recursive: true });
			}
			cb(null, `uploads/${customPath}/`);
		}
		,filename:function(req,file,cb){
			cb(null,Date.now()+"-"+file.originalname)
		}
	})
	return multer({storage})
}




export const multer_cloud= ({customPath}={customPath:"general"})=>{

	const storage= multer.diskStorage({
		filename:function(req,file,cb){
			cb(null,Date.now()+"-"+file.originalname)
		}
	})
	return multer({storage})
}
