"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useNotifications } from "@/store/notifications";

export default function NotificationDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const { getNotification, updateNotification } = useNotifications();
  const [notification, setNotification] = useState(() => getNotification(id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    notifiedName: "",
    notifiedEmail: "",
    notifiedPhone: "",
    notifiedAddress: "",
  });

  useEffect(() => {
    const currentNotification = getNotification(id);
    if (currentNotification) {
      setNotification(currentNotification);
      setFormData({
        notifiedName: currentNotification.notifiedName || "",
        notifiedEmail: currentNotification.notifiedEmail || "",
        notifiedPhone: currentNotification.notifiedPhone || "",
        notifiedAddress: currentNotification.notifiedAddress || "",
      });
    }
  }, [id, getNotification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNotifiedInfo = async () => {
    if (!notification) return;
    
    setIsSubmitting(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar notificação
      const updatedNotification = {
        ...notification,
        ...formData,
        status: "Validação" as const
      };
      
      updateNotification(id, updatedNotification);
      setNotification(updatedNotification);
      
      alert("Informações salvas com sucesso! Status alterado para Validação.");
    } catch (error) {
      console.error("Erro ao salvar informações:", error);
      alert("Erro ao salvar informações. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleValidation = async (needsInfo: boolean) => {
    if (!notification) return;
    
    setIsSubmitting(true);
    try {
      // Simular chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (needsInfo) {
        // Voltar para "Em Andamento"
        const updatedNotification = {
          ...notification,
          status: "Em Andamento" as const,
          needsAdditionalInfo: true
        };
        
        updateNotification(id, updatedNotification);
        setNotification(updatedNotification);
        alert("Notificação retornada para complementação de informações.");
      } else {
        // Avançar para "Concluído"
        const updatedNotification = {
          ...notification,
          status: "Concluído" as const,
          needsAdditionalInfo: false
        };
        
        updateNotification(id, updatedNotification);
        setNotification(updatedNotification);
        alert("Notificação concluída com sucesso!");
      }
    } catch (error) {
      console.error("Erro durante validação:", error);
      alert("Erro durante validação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!notification) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Voltar para a lista
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Notificação não encontrada</h1>
        </div>
      </main>
    );
  }

  const renderFormBasedOnStatus = () => {
    switch (notification.status) {
      case "Em Andamento":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Informações da Notificação</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-black mb-1">Título</label>
                <p className="text-gray-900">{notification.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">Data da Audiência</label>
                <p className="text-gray-900">
                  {new Date(notification.hearingDate).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-black mb-1">Descrição</label>
                <p className="text-gray-900">{notification.description}</p>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-4 mt-8">Informações do Notificado</h3>
            <p className="text-sm text-gray-600 mb-4">
              Preencha as informações da pessoa que será notificada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="notifiedName" className="block text-sm font-medium text-black mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="notifiedName"
                  name="notifiedName"
                  value={formData.notifiedName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="notifiedEmail" className="block text-sm font-medium text-black mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="notifiedEmail"
                  name="notifiedEmail"
                  value={formData.notifiedEmail}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="notifiedPhone" className="block text-sm font-medium text-black mb-1">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="notifiedPhone"
                  name="notifiedPhone"
                  value={formData.notifiedPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notifiedAddress" className="block text-sm font-medium text-black mb-1">
                  Endereço Completo *
                </label>
                <textarea
                  id="notifiedAddress"
                  name="notifiedAddress"
                  value={formData.notifiedAddress}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={handleSaveNotifiedInfo}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Salvando..." : "Salvar e Enviar para Validação"}
              </button>
            </div>
          </div>
        );

      case "Validação":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Validação da Notificação</h2>
            <p className="text-sm text-gray-600 mb-6">
              Verifique todas as informações da notificação. Se necessário, solicite informações adicionais.
            </p>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Informações da Notificação</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Título</label>
                  <p className="text-gray-900">{notification.title}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Data da Audiência</label>
                  <p className="text-black">
                    {new Date(notification.hearingDate).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black mb-1">Descrição</label>
                  <p className="text-gray-900">{notification.description}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Informações do Notificado</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Nome Completo</label>
                  <p className="text-gray-900">{notification.notifiedName || "-"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Email</label>
                  <p className="text-gray-900">{notification.notifiedEmail || "-"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black mb-1">Telefone</label>
                  <p className="text-gray-900">{notification.notifiedPhone || "-"}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black mb-1">Endereço Completo</label>
                  <p className="text-gray-900">{notification.notifiedAddress || "-"}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-medium mb-4">Validação</h3>
              <p className="text-sm text-gray-600 mb-4">
                Esta notificação necessita de informações adicionais?
              </p>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => handleValidation(true)}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processando..." : "Sim, solicitar informações"}
                </button>
                <button
                  onClick={() => handleValidation(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processando..." : "Não, concluir notificação"}
                </button>
              </div>
            </div>
          </div>
        );

      case "Concluído":
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Notificação Concluída</h2>
              <p className="text-gray-600 mb-6">Esta notificação judicial foi processada com sucesso.</p>
              
              <div className="max-w-md mx-auto text-left bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Resumo da Notificação</h3>
                <p><span className="font-medium">Título:</span> {notification.title}</p>
                <p><span className="font-medium">Data da Audiência:</span> {new Date(notification.hearingDate).toLocaleDateString("pt-BR")}</p>
                <p><span className="font-medium">Notificado:</span> {notification.notifiedName}</p>
              </div>
              
              <Link
                href="/"
                className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Voltar para a lista
              </Link>
            </div>
          </div>
        );

      default:
        return <div>Status desconhecido</div>;
    }
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Voltar para a lista
        </Link>
        
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Detalhes da Notificação</h1>
            <p className="text-gray-600">ID: {id}</p>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            notification.status === "Em Andamento" ? "bg-yellow-100 text-yellow-800" :
            notification.status === "Validação" ? "bg-blue-100 text-blue-800" :
            "bg-green-100 text-green-800"
          }`}>
            {notification.status}
          </div>
        </div>
      </div>

      {renderFormBasedOnStatus()}
    </main>
  );
}