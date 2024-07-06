'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import z from 'zod';
import { unstable_noStore as noStore } from 'next/cache';
import { Anuncio } from './definitions';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export type State = {
  errors: {
    nombre?: string[];
    descripcion?: string[];
    imagen?: string[];
  };
  message: string | null;
};


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}


// export async function fetchAnuncios() {
//   noStore()

//   try {
//     const data = await sql<Anuncio>`
//       SELECT * FROM anuncios
//     `
//     return data.rows;
//   } catch (error) {
//     console.error('Error de base de datos: ', error);
//     throw new Error('Fallo el fetch revenue data.');
//   }
// }


// const CrearAnuncio = z.object({
//   name: z.string().nonempty({ message: 'El nombre es requerido' }),
//   desc: z.string().nonempty({ message: 'La descripción es requerida' }),
//   image: z.instanceof(File).refine(file => file.name, { message: 'La imagen es requerida' })
// });


// export async function crearAnuncio(formData: FormData) {
//   const name = formData.get('nombre')
//   const desc = formData.get('descripcion')
//   const image = formData.get('imagen') as File

//   const imageReader = image.stream().getReader();
//   const chunks: Uint8Array[] = [];
  

//   while (true){

//     const {done,value} = await imageReader.read();
//     if (done) break;

//     chunks.push(value);

//   }
//   // Concatenate all chunks into a single Uint8Array
//   const imageDataU8 = new Uint8Array(
//     chunks.reduce<number[]>((acc, chunk) => acc.concat(Array.from(chunk)), [])
//   );

//   // Convert the Uint8Array to a Buffer
//   const imageBinary = Buffer.from(imageDataU8);

//   // Convert the binary data to a Base64-encoded string
//   const imageBase64 = imageBinary.toString('base64')
//   const imageResult = `data:${image.type};base64,${imageBase64}`;


//   try {
//     await sql`
//       INSERT INTO anuncios (nombre, descripcion, imagen)
//       VALUES (${name?.toString()}, ${desc?.toString()}, ${imageResult})
//     `;
//   } catch (error) {
//     return {
//       message: 'Database Error: Failed to Create Invoice.',
//     };
//   }

//   revalidatePath("/panel/anuncios")
//   redirect("/panel/anuncios")
// }

