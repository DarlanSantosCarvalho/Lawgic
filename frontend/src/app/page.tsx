// src/app/page.tsx
"use client";
import { useEffect } from "react";
import { useNotifications, type Notification } from "@/store/notifications";
import Link from "next/link";

export default function HomePage() {
  const { notifications, setNotifications } = useNotifications();

  useEffect(() => {
    // Mock data com tipo explícito
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Notificação Criminal",
        description: "Processo por danos materiais",
        hearingDate: "2023-12-15",
        notifiedName: "João Silva",
        status: "Em Andamento",
      },
      {
        id: "2",
        title: "Notificação Cível",
        description: "Ação de indenização por acidente",
        hearingDate: "2024-01-20",
        notifiedName: "Maria Santos",
        status: "Validação",
      },
      {
        id: "3",
        title: "Notificação Trabalhista",
        description: "Reclamação trabalhista",
        hearingDate: "2024-02-10",
        notifiedName: "Pedro Oliveira",
        status: "Concluído",
      },
    ];
    setNotifications(mockNotifications);
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
              <tr key={n.id} className="hover:bg-gray-50">
                <td className="p-3">
                  <Link href={`/notifications/${n.id}`} className="text-blue-600 hover:underline font-medium">
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
                    href={`/notifications/${n.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}