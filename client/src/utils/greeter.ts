import i18next from "i18next";

function getGreeting(name: string): string {
  const currentHour = new Date().getHours();
  let greeting: string;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = i18next.t("greetingMessages.morning");
  } else if (currentHour >= 12 && currentHour < 17) {
    greeting = i18next.t("greetingMessages.afternoon");
  } else if (currentHour >= 17 && currentHour < 21) {
    greeting = i18next.t("greetingMessages.evening");
  } else {
    greeting = i18next.t("greetingMessages.night");
  }

  return `${greeting}, ${name}`;
}

export default getGreeting;
