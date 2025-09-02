// src/app/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Link from "next/link";

export default function CreateNotification() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hearingDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Mock da criação - será substituído pela API real
      console.log("Criando notificação:", formData);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar para a página de detalhes (com ID mock)
      router.push("/notifications/1");
    } catch (error) {
      console.error("Erro ao criar notificação:", error);
      alert("Erro ao criar notificação. Tente novamente.");
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
          />
        </div>

        <div className="mb-6">
          <label htmlFor="hearingDate" className="block text-sm font-medium text-black mb-1">
            Data da Audiência *
          </label>
          <input
            type="date"
            id="hearingDate"
            name="hearingDate"
            value={formData.hearingDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/"
            className="px-4 py-2 border border-gray-300 rounded-md text-black hover:bg-gray-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Criando..." : "Criar Notificação"}
          </button>
        </div>
      </form>
    </main>
  );
}