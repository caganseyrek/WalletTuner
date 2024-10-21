import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { Add, Cancel, Delete, Edit, Save } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import {
  DataGrid as DataGridComponent,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridPaginationModel,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import lodash from "lodash";

import useAuthDetails from "@/hooks/useAuthDetails";

import gridLocaleText from "@/localization/gridLocaleText";

import Snackbar from "./Snackbar";

interface DataGridProps<TNew, TUpdate, TDelete> {
  rowsProp: GridRowsProp;
  columnsProp: GridColDef[];
  paginationModel?: GridPaginationModel;
  dataCategory: string;
  newDataObject: object;
  newDataFunction: UseMutateAsyncFunction<BackendResponseProps, Error, TNew, unknown>;
  updateDataFunction: UseMutateAsyncFunction<BackendResponseProps, Error, TUpdate, unknown>;
  deleteDataFunction: UseMutateAsyncFunction<BackendResponseProps, Error, TDelete, unknown>;
}

const DataGrid = <TNew, TUpdate, TDelete>({
  rowsProp,
  columnsProp,
  paginationModel,
  dataCategory,
  newDataObject,
  newDataFunction,
  updateDataFunction,
  deleteDataFunction,
}: DataGridProps<TNew, TUpdate, TDelete>) => {
  const { t } = useTranslation(["data_grid"]);

  const [dataState, setDataState] = useState<DataStateProps>({
    snackbarState: { isOpen: false, message: "" },
    isLoading: false,
    isSuccess: false,
  });
  const [rows, setRows] = useState<GridRowsProp>(rowsProp);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { data: authData } = useAuthDetails();

  const formattedDataCategory = dataCategory.charAt(0).toUpperCase() + dataCategory.slice(1);

  dayjs.extend(customParseFormat);

  const CustomToolbar = () => {
    const handleAddNewClick = async () => {
      const newId = rows.length + 1;
      setRows((rows) => [...rows, { id: newId, ...newDataObject, isNew: true }]);
      setRowModesModel((currentModel) => ({
        ...currentModel,
        [newId]: { mode: GridRowModes.Edit },
      }));
    };

    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Box sx={{ display: "flex", alignItems: "center", columnGap: 1 }}>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <Button color="primary" startIcon={<Add />} onClick={handleAddNewClick}>
            {t(`${dataCategory}s.addNew${formattedDataCategory}Button`)}
          </Button>
        </Box>
        <GridToolbarQuickFilter variant="outlined" size="small" />
      </GridToolbarContainer>
    );
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = async (updatedRow: GridRowModel) => {
    const row = lodash.cloneDeep(updatedRow);
    let isNew = false;

    for (const key in row) {
      const column = columnsProp.find((column) => column.field === key);
      if (key === "isNew" && row[key] === true) {
        isNew = true;
      }
      if (key === "id") {
        delete row[key];
      }
      if (key === "uniqueId" && !isNew) {
        row[`${dataCategory}Id`] = row["uniqueId"];
        delete row["uniqueId"];
      } else if (isNew) {
        delete row["uniqueId"];
      }

      if (column?.editable && !row[key]) {
        return setDataState(() => ({
          snackbarState: { isOpen: true, message: t("validationFail") },
          isLoading: false,
          isSuccess: false,
        }));
      }
      if (!column?.editable) {
        delete row[key];
      }
    }

    setDataState((currentState) => ({ ...currentState, isLoading: true }));
    if (isNew) {
      const response = await newDataFunction({
        accessToken: authData?.accessToken,
        currentUser: authData?.currentUser,
        ...row,
      } as TNew);
      if (!response.isSuccess) {
        return setDataState(() => ({
          snackbarState: { isOpen: true, message: response.message },
          isLoading: false,
          isSuccess: response.isSuccess,
        }));
      }
      setDataState(() => ({
        snackbarState: { isOpen: true, message: response.message },
        isLoading: false,
        isSuccess: true,
      }));
    } else {
      const response = await updateDataFunction({
        accessToken: authData?.accessToken,
        currentUser: authData?.currentUser,
        ...row,
      } as TUpdate);
      if (!response.isSuccess) {
        return setDataState(() => ({
          snackbarState: { isOpen: true, message: response.message },
          isLoading: false,
          isSuccess: response.isSuccess,
        }));
      }
      setDataState(() => ({
        snackbarState: { isOpen: true, message: response.message },
        isLoading: false,
        isSuccess: true,
      }));
    }
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = async (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    const rowToBeDeleted = rows.filter((row) => row.id === id);
    setDataState((currentState) => ({ ...currentState, isLoading: true }));
    const response = await deleteDataFunction({
      accessToken: authData?.accessToken,
      currentUser: authData?.currentUser,
      [`${dataCategory}Id`]: rowToBeDeleted[0].uniqueId,
    } as TDelete);

    return setDataState(() => ({
      snackbarState: { isOpen: true, message: response.message },
      isLoading: false,
      isSuccess: true,
    }));
  };

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
      setRows((rows) => rows.map((row) => ({ ...row, id: row.id - 1 })));
    }
  };

  const filteredColumns: GridColDef[] = useMemo(() => {
    const visibleFields: string[] = [];
    columnsProp.forEach((column) => visibleFields.push(column.field));
    return columnsProp.filter((column) => visibleFields.includes(column.field));
  }, [columnsProp]);

  return (
    <>
      <Snackbar
        snackbarState={dataState}
        setSnackbarState={setDataState}
        severity={dataState.isSuccess ? "success" : "error"}
      />
      <DataGridComponent
        loading={dataState.isLoading ? true : false}
        sx={{ borderRadius: 0, border: 0 }}
        rows={rows}
        columns={[
          ...filteredColumns,
          {
            field: "actions",
            type: "actions",
            headerName: t("actions.header"),
            width: 100,
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<Save />}
                    label={t("actions.saveActionLabel")}
                    onClick={() => handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<Cancel />}
                    label={t("actions.cancelActionLabel")}
                    onClick={() => handleCancelClick(id)}
                  />,
                ];
              }

              return [
                <GridActionsCellItem
                  icon={<Edit />}
                  label={t("actions.editActionLabel")}
                  onClick={() => handleEditClick(id)}
                />,
                <GridActionsCellItem
                  icon={<Delete />}
                  label={t("actions.deleteActionLabel")}
                  onClick={() => handleDeleteClick(id)}
                />,
              ];
            },
          },
        ]}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={(error) => {
          console.error(error);
        }}
        initialState={{
          pagination: { paginationModel },
        }}
        slots={{ toolbar: CustomToolbar as GridSlots["toolbar"] }}
        localeText={gridLocaleText}
      />
    </>
  );
};

export default DataGrid;
