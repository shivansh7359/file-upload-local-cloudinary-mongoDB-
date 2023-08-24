const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
    try{
        //fetch file
        const file = req.files.file;
        console.log("File AAgyi HAI -> ", file);
        
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        console.log("Path -> ",path);
        
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message:"Uploaded Successfully",
        });
    }
    catch(error){
        console.log("Error in file upload", error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}


async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }


    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}


//image upload handler
exports.imageUpload = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, email, tags);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpeg", "jpg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        //file format supported h
        console.log("Uploading to cloud");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Uploaded Successfully"
        });
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        });

    }
};


//video upload handler
exports.videoUpload = async (req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, email, tags);

        const file = req.files.videoFile;

        //validation
        const supportedTypes = ["mp4", "mov"];

        const fileType = file.name.split('.')[1].toLowerCase();

        //add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        //file format supported h
        console.log("Uploading to cloud");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video Uploaded Successfully"
        });      

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
}


//imageSizeReducer
exports.imageSizeReducer = async(req, res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name, email, tags);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpeg", "jpg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File format not supported"
            });
        }

        //file format supported h
        console.log("Uploading to cloud");
        const response = await uploadFileToCloudinary(file, "Codehelp", 90);
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image Uploaded Successfully"
        });
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
}


