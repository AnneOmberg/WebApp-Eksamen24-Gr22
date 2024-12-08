import { useState } from "react";

type TemplateType = {
  id: any;
  title: string;
  description: string;
  allowSameDay: boolean;
  allowedWeekdays: string[];
  isPrivate: boolean;
  hasLimitedSeats: boolean;
  seatLimit: number;
  hasFixedPrice: boolean;
  price: number;
  isFree: boolean;
  hasWaitlist: boolean;
  events: Event[];
};

export default function useTemplate() {
  const [templates, setTemplates] = useState<TemplateType[]>([]);

  const getTemplates = async () => {
    const response = await fetch("http://localhost:3999/api/templates", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setTemplates(data.templates);
  };

  const addTemplate = async (template: TemplateType) => {
    console.log("Adding template:", template);
  };

  return { templates, getTemplates, addTemplate };
}
