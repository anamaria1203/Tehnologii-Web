const apiUrl = "/api/";

async function get(url) {
  return (await axios.get(url)).data;
}

function showMsg(text) {
  const msg = document.getElementById("msg");
  msg.textContent = text;
  msg.hidden = !text;
}

function renderResult(item) {
  const out = document.getElementById("result");
  if (!item) {
    out.innerHTML = "";
    return;
  }
  out.innerHTML = `
    <table>
      <thead>
        <tr><th>ID</th><th>Nume</th><th>Vârsta</th></tr>
      </thead>
      <tbody>
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.age}</td>
        </tr>
      </tbody>
    </table>
  `;
}

window.onload = () => {
  const form = document.getElementById("byIdForm");
  const input = document.getElementById("inputId");

  form.onsubmit = async (e) => {
    e.preventDefault();
    showMsg("");
    renderResult(null);

    const id = Number(input.value.trim());
    if (!Number.isInteger(id) || id <= 0) {
      showMsg("Te rog introdu un ID valid (număr întreg > 0).");
      return;
    }

    try {
      const item = await get(apiUrl + "getList/" + id);
      renderResult(item);
    } catch (err) {
      if (err.response?.status === 404) {
        showMsg("Resursa nu a fost găsită.");
      } else if (err.response?.status === 400) {
        showMsg("ID invalid.");
      } else {
        showMsg("Eroare de rețea sau server.");
      }
    }
  };
};
