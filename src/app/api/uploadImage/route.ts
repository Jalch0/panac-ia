import { NextResponse } from "next/server";
import {v2 as cloudinary} from 'cloudinary';

interface UploadResponse {
    secure_url: string;
}

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Función asíncrona que maneja la solicitud POST que sube una imagen a Cloudinary y devuelve la URL segura de la imagen subida.
 * @param { Request }
 * @returns NextResponse.json({message: "Imagen subida",url: response.secure_url}) respuesta que contiene un mensaje de éxito y la URL segura de la imagen subida.
 */
export async function POST(request: Request) {
    const data = await request.formData();
    const image = data.get("image");

    if(!image){
        return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
    };

    let buffer: any;
    if(image instanceof File){
        const bytes = await image.arrayBuffer();
        buffer = Buffer.from(bytes)
    }

    const response = await new Promise((resolve, reject) => {
        cloudinary.uploader
        .upload_stream({}, (err, result) => {
            if(err){
                reject(err);
            }
            if(result){
                resolve(result);
            } else {
                reject(new Error('Sin resultado'))
            }
        })
        .end(buffer);
    }) as UploadResponse

    return NextResponse.json({
        message: "Imagen subida",
        url: response.secure_url
    })
}