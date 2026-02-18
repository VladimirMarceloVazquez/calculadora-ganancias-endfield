import { useState } from "react";
import ItemCard from "./ItemCard";
import "./index.css";
import { TEXTS } from "./i18n";

// Imágenes disponibles
const IMAGENES = [
  "1.png",
  "2.png",
  "3.png",
  "4.png",
  "5.png",
  "6.png",
  "7.png",
  "8.png",
  "9.png",
  "10.png",
  "11.png",
  "12.png",
];

function nuevaCarta() {
  return {
    id: crypto.randomUUID(),
    precioCompra: "",
    precioReventa: "",
    cantidad: "",
    imagen: null,
    gananciaTotal: 0,
  };
}

function App() {
  const [cards, setCards] = useState([nuevaCarta()]);
  const [lang, setLang] = useState("es");

  const t = (key) => TEXTS[lang][key];

  const addCard = () => {
    if (cards.length < 12) {
      setCards([...cards, nuevaCarta()]);
    }
  };

  const removeCard = (id) => {
    if (cards.length > 1) {
      setCards(cards.filter((c) => c.id !== id));
    }
  };

  const updateCard = (id, newData) => {
    setCards(cards.map((c) => (c.id === id ? newData : c)));
  };

  const maxGanancia = Math.max(...cards.map((c) => c.gananciaTotal));

  return (
    <div className="container">
      <header>
        <h1>{t("title")}</h1>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="add"
            onClick={addCard}
            disabled={cards.length >= 12}
          >
            ➕
          </button>

          <button
            className="add"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>
      </header>

      <div className="grid">
        {cards.map((card) => {
          const usedImages = cards
            .filter((c) => c.id !== card.id)
            .map((c) => c.imagen)
            .filter(Boolean);

          const availableImages = IMAGENES.filter(
            (img) => !usedImages.includes(img)
          );

          return (
            <ItemCard
              key={card.id}
              data={card}
              t={t}
              canRemove={cards.length > 1}
              isBest={card.gananciaTotal === maxGanancia && maxGanancia > 0}
              availableImages={availableImages}
              onRemove={() => removeCard(card.id)}
              onChange={(newData) => updateCard(card.id, newData)}
            />
          );
        })}
      </div>

      <footer className="footer">
  {t("footer")}
  <div id="clustrmaps-container"></div>
</footer>

    </div>
  );
}

export default App;
