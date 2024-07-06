"use client";
import React, { useState, useEffect } from 'react';
import { MiniAnuncios } from '@/app/ui/mini-anuncio'; // Adjust import as necessary
import { Anuncio } from '@/app/lib/definitions';

async function fetchAnuncios(): Promise<Anuncio[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

const Actuales: React.FC = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedAnuncios = await fetchAnuncios();
        setAnuncios(fetchedAnuncios);
      } catch (error) {
        console.error('Failed to fetch anuncios:', error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Item with ID ${id} deleted successfully.`);
        setAnuncios((prevAnuncios) => prevAnuncios.filter(anuncio => anuncio._id !== id));
      } else {
        const errorData = await response.json();
        console.error('Failed to delete item:', errorData.message);
      }
    } catch (error: any) {
      console.error('An error occurred while deleting the item:', error.message);
    }
  };

  return (
    <>
      <MiniAnuncios anuncios={anuncios} onDelete={handleDelete} />
    </>
  );
};

export default Actuales;
