import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatShortDate = (date: string) => {
  if (!date) return;
  return formatDistanceToNow(new Date(date), { locale: ptBR })
    .replace("aproximadamente ", "")
    .replace("há ", "")
    .replace("menos de um minuto", "agora")
    .replace(" minutos", "min")
    .replace(" minuto", "min")
    .replace(" horas", "h")
    .replace(" hora", "h")
    .replace(" dias", "d")
    .replace(" dia", "d");
};
