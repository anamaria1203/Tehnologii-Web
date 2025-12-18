bookRouter.route("/books/sorted").get((req, res) => {
  let sortedBooks = [...books].sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  res.json(sortedBooks);
});
