import { useEffect, useState } from "react";

export default function ItemCard({
  onRemove,
  canRemove,
  onChange,
  data,
  isBest,
  availableImages,
  t,
}) {
  const { precioCompra, precioReventa, cantidad, imagen } = data;
  const [showImages, setShowImages] = useState(false);

  // Conversión segura
  const pc = parseFloat(precioCompra) || 0;
  const pr = parseFloat(precioReventa) || 0;
  const qty = parseFloat(cantidad) || 0;

  const gananciaPorItem = pr - pc;
  const costoTotal = pc * qty;
  const ingresoTotal = pr * qty;
  const gananciaTotal = ingresoTotal - costoTotal;

  // ✅ % de ganancia sobre la inversión
  const porcentajeGanancia =
    costoTotal > 0 ? (gananciaTotal / costoTotal) * 100 : 0;

  useEffect(() => {
    onChange({ ...data, gananciaTotal });
  }, [gananciaTotal]);

  const fmt = (n) =>
    n.toLocaleString("es-MX", { maximumFractionDigits: 2 });

  return (
    <div className={`card ${isBest ? "best" : ""}`}>
      {canRemove && (
        <button className="close" onClick={onRemove}>✖</button>
      )}

      {isBest && <div className="badge">{t("best")}</div>}

      <label>{t("buyPrice")}</label>
      <input
        type="text"
        inputMode="decimal"
        value={precioCompra}
        placeholder="861"
        onChange={(e) =>
          onChange({ ...data, precioCompra: e.target.value })
        }
      />

      <label>{t("sellPrice")}</label>
      <input
        type="text"
        inputMode="decimal"
        value={precioReventa}
        placeholder="4557"
        onChange={(e) =>
          onChange({ ...data, precioReventa: e.target.value })
        }
      />

      <label>{t("quantity")}</label>
      <input
        type="text"
        inputMode="numeric"
        value={cantidad}
        placeholder="305"
        onChange={(e) =>
          onChange({ ...data, cantidad: e.target.value })
        }
      />

      {/* SELECTOR DE IMAGEN */}
      <label>{t("image")}</label>

      <div
        className="img-picker"
        onClick={() => setShowImages((v) => !v)}
      >
        {!imagen ? (
          <div className="img-placeholder">
            🖼️ {t("chooseImage")}
          </div>
        ) : (
          <>
            <img
              src={`/imagenes/${imagen}`}
              alt="item"
              className="preview"
            />
            <div className="img-change">
              {t("changeImage")}
            </div>
          </>
        )}
      </div>

      {showImages && (
        <div className="img-grid">
          {availableImages.map((img) => (
            <img
              key={img}
              src={`/imagenes/${img}`}
              alt={img}
              title={img}
              className="img-option"
              onClick={(e) => {
                e.stopPropagation(); // 👈 evita cerrar/abrir raro
                onChange({ ...data, imagen: img });
                setShowImages(false);
              }}
            />
          ))}
        </div>
      )}

      <hr />

      <div className="result">
        <span>{t("cost")}</span>
        <strong>${fmt(costoTotal)}</strong>
      </div>

      <div className="result">
        <span>{t("income")}</span>
        <strong>${fmt(ingresoTotal)}</strong>
      </div>

      <div className="result highlight">
        <span>{t("totalProfit")}</span>
        <strong>${fmt(gananciaTotal)}</strong>
      </div>

      {/* ✅ PORCENTAJE DE GANANCIA */}
      <div className="result">
        <span>{t("profitPercent")}</span>
        <strong
          style={{
            color:
              porcentajeGanancia >= 100
                ? "#4caf50"
                : porcentajeGanancia >= 0
                ? "#ffc107"
                : "#ff5252",
          }}
        >
          {porcentajeGanancia.toFixed(1)}%
        </strong>
      </div>
    </div>
  );
}
