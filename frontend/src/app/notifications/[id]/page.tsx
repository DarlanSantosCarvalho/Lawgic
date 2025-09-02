"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { notificationService } from "@/services/notificationService";
import { Notification } from "@/store/notifications";

export default function NotificationDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [notification, setNotification] = useState<Notification | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    notifiedName: "",
    notifiedEmail: "",
    notifiedPhone: "",
    notifiedAddress: "",
  });

  console.log("ID da URL:", id); // Debug

  useEffect(() => {
    const loadNotification = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Buscando notificação com ID:", id); // Debug
        
        const data = await notificationService.getById(id);
        console.log("Dados recebidos:", data); // Debug
        
        setNotification(data);
        setFormData({
          notifiedName: data.notifiedName || "",
          notifiedEmail: data.notifiedEmail || "",
          notifiedPhone: data.notifiedPhone || "",
          notifiedAddress: data.notifiedAddress || "",
        });
      } catch (error: any) {
        console.error("Erro detalhado:", error); // Debug
        setError(error.response?.data?.error || "Notificação não encontrada");
        
        if (error.response?.status === 404) {
          alert("Notificação não encontrada");
          router.push("/");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadNotification();
    }
  }, [id, router]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveNotifiedInfo = async () => {
    if (!notification) return;
    
    setIsSubmitting(true);
    try {
      const updatedNotification = await notificationService.update(notification._id, {
        notifiedName: formData.notifiedName,
        notifiedEmail: formData.notifiedEmail,
        notifiedPhone: formData.notifiedPhone,
        notifiedAddress: formData.notifiedAddress,
        status: "Validação"
      });
      
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
      let updatedNotification;
      if (needsInfo) {
        updatedNotification = await notificationService.update(notification._id, {
          status: "Em Andamento",
          needsAdditionalInfo: true,
        });
        alert("Notificação retornada para complementação de informações.");
      } else {
        updatedNotification = await notificationService.update(notification._id, {
          status: "Concluído",
          needsAdditionalInfo: false,
        });
        alert("Notificação concluída com sucesso!");
      }
      
      setNotification(updatedNotification);
    } catch (error) {
      console.error("Erro durante validação:", error);
      alert("Erro durante validação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Voltar para a lista
          </Link>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </main>
    );
  }

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
            <h2 className="text-xl text-black font-semibold mb-4">Informações da Notificação</h2>
            
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

            <h3 className="text-lg text-black font-medium mb-4 mt-8">Informações do Notificado</h3>
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
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <h2 className="text-xl text-black font-semibold mb-4">Validação da Notificação</h2>
            <p className="text-sm text-gray-600 mb-6">
              Verifique todas as informações da notificação. Se necessário, solicite informações adicionais.
            </p>

            <div className="mb-8">
              <h3 className="text-lg text-black font-medium mb-4">Informações da Notificação</h3>
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
              <h3 className="text-lg text-black font-medium mb-4">Informações do Notificado</h3>
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
              
              <div className="max-w-md mx-auto text-left bg-gray-400 p-4 rounded-lg">
                <h3 className="font-medium text-black mb-2">Resumo da Notificação</h3>
                <p className="text-black text-bold"><span className="font-medium text-black">Título:</span> {notification.title}</p>
                <p className="text-black text-bold"><span className="font-medium text-black">Data da Audiência:</span> {new Date(notification.hearingDate).toLocaleDateString("pt-BR")}</p>
                <p className="text-black text-bold"><span className="font-medium text-black">Notificado:</span> {notification.notifiedName}</p>
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