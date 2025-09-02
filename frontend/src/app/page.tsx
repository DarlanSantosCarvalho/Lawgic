// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useNotifications, type Notification } from "@/store/notifications";
import { notificationService } from "@/services/notificationService";
import Link from "next/link";

export default function HomePage() {
  const { notifications, setNotifications } = useNotifications();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Tenta carregar da API
        const data = await notificationService.getAll();
        setNotifications(data);
      } catch (error) {
        console.error('Erro ao carregar notificações:', error);
        setError('Erro ao carregar notificações. Usando dados de exemplo.');
        
        // Fallback para mock data
        const mockNotifications: Notification[] = [
          {
            _id: "1",
            title: "Notificação Criminal",
            description: "Processo por danos materiais",
            hearingDate: "2023-12-15",
            notifiedName: "João Silva",
            status: "Em Andamento",
          },
          {
            _id: "2",
            title: "Notificação Cível",
            description: "Ação de indenização por acidente",
            hearingDate: "2024-01-20",
            notifiedName: "Maria Santos",
            status: "Validação",
          },
          {
            _id: "3",
            title: "Notificação Trabalhista",
            description: "Reclamação trabalhista",
            hearingDate: "2024-02-10",
            notifiedName: "Pedro Oliveira",
            status: "Concluído",
          },
        ];
        setNotifications(mockNotifications);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, [setNotifications]);

  const getStatusColor = (status: Notification["status"]) => {
    switch (status) {
      case "Em Andamento":
        return "bg-yellow-100 text-yellow-800";
      case "Validação":
        return "bg-blue-100 text-blue-800";
      case "Concluído":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <main className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Notificações Judiciais</h1>
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notificações Judiciais</h1>
        <Link
          href="/create"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nova Notificação
        </Link>
      </div>

      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Nenhuma notificação encontrada.</p>
            <Link
              href="/create"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Criar primeira notificação
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-medium text-black">Título</th>
                <th className="p-3 text-left text-sm font-medium text-black">Descrição</th>
                <th className="p-3 text-left text-sm font-medium text-black">Data da Audiência</th>
                <th className="p-3 text-left text-sm font-medium text-black">Notificado</th>
                <th className="p-3 text-left text-sm font-medium text-black">Status</th>
                <th className="p-3 text-left text-sm font-medium text-black">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notifications.map((n) => (
                <tr key={n._id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <Link href={`/notifications/${n._id}`} className="text-blue-600 hover:underline font-medium">
                      {n.title}
                    </Link>
                  </td>
                  <td className="p-3 text-sm text-black">{n.description}</td>
                  <td className="p-3 text-sm text-black">
                    {new Date(n.hearingDate).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="p-3 text-sm text-black">{n.notifiedName || "-"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(n.status)}`}>
                      {n.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link 
                      href={`/notifications/${n._id}`}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}