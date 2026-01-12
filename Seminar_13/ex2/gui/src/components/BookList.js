import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";

import { getBooks, addBook, saveBook, deleteBook } from "../actions";

const bookSelector = (state) => state.book.bookList;

function BookList() {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isNewRecord, setIsNewRecord] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);

  //  pentru filtre
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const books = useSelector(bookSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleAddClick = () => {
    setIsDialogShown(true);
    setIsNewRecord(true);
    setTitle("");
    setContent("");
  };

  const hideDialog = () => {
    setIsDialogShown(false);
  };

  const handleSaveClick = () => {
    if (isNewRecord) {
      dispatch(addBook({ title, content }));
    } else {
      dispatch(saveBook(selectedBook, { title, content }));
    }
    setIsDialogShown(false);
    setSelectedBook(null);
    setTitle("");
    setContent("");
  };

  const editBook = (rowData) => {
    setSelectedBook(rowData.id);
    setTitle(rowData.title);
    setContent(rowData.content);
    setIsDialogShown(true);
    setIsNewRecord(false);
  };

  // search global (filtrare în tot tabelul)
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    setGlobalFilterValue(value);
    setFilters((prev) => ({
      ...prev,
      global: { ...prev.global, value },
    }));
  };

  const tableHeader = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ fontWeight: "bold" }}>Books</span>
      <InputText
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        placeholder="Search..."
      />
    </div>
  );

  const tableFooter = (
    <div>
      <Button label="Add" icon="pi pi-plus" onClick={handleAddClick} />
    </div>
  );

  const dialogFooter = (
    <div>
      <Button label="Save" icon="pi pi-save" onClick={handleSaveClick} />
    </div>
  );

  const deleteBookHandler = (rowData) => {
    if (window.confirm(`Ștergi cartea "${rowData.title}"?`)) {
      dispatch(deleteBook(rowData.id));
    }
  };

  const opsColumn = (rowData) => {
    return (
      <>
        <Button
          label="Edit"
          icon="pi pi-pencil"
          onClick={() => editBook(rowData)}
        />
        <Button
          label="Delete"
          icon="pi pi-trash"
          className="p-button-danger"
          style={{ marginLeft: 8 }}
          onClick={() => deleteBookHandler(rowData)}
        />
      </>
    );
  };

  return (
    <div>
      <DataTable
        value={books}
        header={tableHeader}
        footer={tableFooter}
        //  filtre
        filters={filters}
        onFilter={(e) => setFilters(e.filters)}
        globalFilterFields={["title", "content"]}
        //  PAGINARE
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
        responsiveLayout="scroll"
      >
        <Column
          header="Title"
          field="title"
          sortable
          filter
          filterPlaceholder="Filter by title..."
        />
        <Column header="Content" field="content" sortable />
        <Column body={opsColumn} />
      </DataTable>

      <Dialog
        header="A book"
        visible={isDialogShown}
        onHide={hideDialog}
        footer={dialogFooter}
      >
        <div style={{ marginBottom: 10 }}>
          <InputText
            placeholder="title"
            onChange={(evt) => setTitle(evt.target.value)}
            value={title}
          />
        </div>
        <div>
          <InputText
            placeholder="content"
            onChange={(evt) => setContent(evt.target.value)}
            value={content}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default BookList;
