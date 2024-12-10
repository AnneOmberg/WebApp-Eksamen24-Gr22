import { useState } from "react";

// Define or import the Event type
type Event = {
  id: string;
  name: string;
  date: string;
};

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

  const getSingleTemplate = async (id: string) => {
    const response = await fetch(`http://localhost:3999/api/templates/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.template;
  };

  const addTemplate = async (template: TemplateType) => {
    const response = await fetch("http://localhost:3999/api/templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(template),
    });

    const data = await response.json();
    setTemplates([...templates, data.template]);
  };

  const deleteTemplate = async (id: string) => {
    const response = await fetch(`http://localhost:3999/api/templates/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log(data.template);
  };

  return {
    templates,
    getSingleTemplate,
    getTemplates,
    addTemplate,
    deleteTemplate,
  };
}
