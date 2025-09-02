// src/app/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notificationService } from "@/services/notificationService";
import Link from "next/link";

export default function CreateNotification() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hearing_date: "", // MongoDB espera hearing_date (com underscore)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Criar notificação via API real
      const newNotification = await notificationService.create({
        title: formData.title,
        description: formData.description,
        hearing_date: formData.hearing_date
      });
      
      // Redirecionar para a página de detalhes com ID real
      router.push(`/notifications/${newNotification._id}`);
    } catch (error: any) {
      console.error("Erro ao criar notificação:", error);
      
      // Mostrar mensagem de erro específica se disponível
      if (error.response?.data?.error) {
        alert(`Erro: ${error.response.data.error}`);
      } else {
        alert("Erro ao criar notificação. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Voltar para a lista
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Criar Notificação Judicial</h1>
        <p className="text-gray-600">Preencha as informações básicas da notificação</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-black mb-1">
            Título *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Notificação Criminal - Processo 123"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-black mb-1">
            Descrição *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva os detalhes da notificação judicial..."
          />
        </div>

        <div className="mb-6">
          <label htmlFor="hearing_date" className="block text-sm font-medium text-black mb-1">
            Data da Audiência *
          </label>
          <input
            type="date"
            id="hearing_date"
            name="hearing_date"
            value={formData.hearing_date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Criando..." : "Criar Notificação"}
          </button>
        </div>
      </form>
    </main>
  );
}