import React from "react";

function Confirmation({ onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">

            <div className="bg-white w-full max-w-sm rounded-xl shadow-lg p-6 text-center animate-fadeIn">

                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    Are you sure you want to logout?
                </h4>

                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition"
                    >
                        Yes
                    </button>

                    <button
                        onClick={onCancel}
                        className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 active:scale-95 transition"
                    >
                        No
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Confirmation;
