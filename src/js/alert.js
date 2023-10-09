import { convertToJson } from "./productData.mjs";

async function modifyAlerts() {
  const response = await fetch("../json/alerts.json");
  const data = await response.json();
  if (data) {
    let main = document.querySelector("main");
    let alertsContainer = document.createElement("section");
    alertsContainer.className = "alerts-list";

    data.forEach((alert) => {
      const warningHTML = `<p style="background-color: ${alert.background}; color: ${alert.color};">${alert.message}</p>`;
      alertsContainer.innerHTML += warningHTML;
    });
    main.prepend(alertsContainer);
  }
}

modifyAlerts();
