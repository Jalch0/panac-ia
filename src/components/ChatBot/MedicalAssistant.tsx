import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

/**
 * Componente que representa el modal del asistente médico virtual.
 * @returns <MedicalAssistant />
 */
const MedicalAssistant: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="relative bg-white z-40">
        <AccordionItem value="item-1">
            <div className="fixed md:right-8 md:bottom-8 md:w-80 ph:bottom-0 ph:w-full ph:right-0 bg-white border border-gray-200 rounded-md overflow:hidden">
                <div className="w-full h-full flex flex-col">
                    <AccordionTrigger className="px-6 border-b-2 border-secondary shadow-lg">
                        <ChatHeader />
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col h-96">
                            <ChatMessages className="px-2 py-3 flex-1"/>
                            <ChatInput className="px-4 "/>
                        </div>
                    </AccordionContent>
                </div>
            </div>
        </AccordionItem>
    </Accordion>
  );
};

export default MedicalAssistant;
