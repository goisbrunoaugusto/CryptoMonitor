import React from 'react';

const NotLoggedInPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
        <h2 className="text-lg font-bold mb-4">Acesso Restrito</h2>
        <p className="text-gray-700 mb-4">Esta página está disponível apenas para usuários autenticados.</p>
        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
};

export default NotLoggedInPopup;
