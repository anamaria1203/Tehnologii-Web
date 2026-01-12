import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { getBooks, deleteBook } from "../actions";

const BookList = () => {
  const dispatch = useDispatch();
  const { bookList, fetching } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  //  DELETE-ul
  const deleteBookHandler = (rowData) => {
    if (window.confirm(`Ștergi cartea "${rowData.title}"?`)) {
      dispatch(deleteBook(rowData.id));
    }
  };

  //  butonul din tabel
  const actionTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={() => deleteBookHandler(rowData)}
      />
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Books</h2>

      <DataTable
        value={bookList}
        loading={fetching}
        dataKey="id"
        paginator
        rows={5}
        responsiveLayout="scroll"
      >
        <Column field="id" header="ID" />
        <Column field="title" header="Title" />
        <Column field="content" header="Content" />
        <Column header="Actions" body={actionTemplate} />
      </DataTable>
    </div>
  );
};

export default BookList;
