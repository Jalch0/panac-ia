import React from "react"
import { FaRobot } from "react-icons/fa";

/**
 * Componente que define la cabecera del modal del asistente médico
 * @returns <ChatHeader />
 */
const ChatHeader: React.FC = () => {
    return(
        <div className="w-full flex gap-3 justify-start items-center text-gray-600">
            <div className="flex flex-col items-start text-sm">
                <p className="text-xs">Habla con</p>
                <div className="flex gap-1.5 items-center">
                    <FaRobot className="text-secondary text-lg"/>
                    <p className="font-medium">Asistente médico</p>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader