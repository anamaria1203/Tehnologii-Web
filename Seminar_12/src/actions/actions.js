export function addNote(content) {
  return {
    type: "ADD_NOTE",
    payload: content,
  };
}

// FUNCȚIA PENTRU ȘTERGERE CU SERVER
export const deleteNote = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:8080/notes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        dispatch({
          type: "DELETE_NOTE",
          payload: id,
        });
      } else {
        console.error("Eroare la ștergerea de pe server");
      }
    } catch (error) {
      console.error("Eroare rețea:", error);
    }
  };
};
