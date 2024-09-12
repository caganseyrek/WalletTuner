import { useState } from "react";
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
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { UseMutateAsyncFunction } from "@tanstack/react-query";

import useAuthDetails from "@/hooks/useAuthDetails";

import { mediumColor } from "@/shared/globals.style";

import gridLocaleText from "@/localization/gridLocaleText";

import Snackbar from "./Snackbar";

interface DataGridProps<TNew, TUpdate, TDelete> {
  rowsProp: GridRowsProp;
  columnsProp: GridColDef[];
  paginationModel?: GridPaginationModel;
  dataCategory: string;
  newDataIdentifier: string;
  newDataObject: object;
  newDataFunction: UseMutateAsyncFunction<MessageResponseProps, Error, TNew, unknown>;
  updateDataFunction: UseMutateAsyncFunction<MessageResponseProps, Error, TUpdate, unknown>;
  deleteDataFunction: UseMutateAsyncFunction<MessageResponseProps, Error, TDelete, unknown>;
  isNewDataError: boolean;
  isUpdateDataError: boolean;
  isDeleteDataError: boolean;
}

const DataGrid = <TNew, TUpdate, TDelete>({
  rowsProp,
  columnsProp,
  paginationModel,
  dataCategory,
  newDataIdentifier,
  newDataObject,
  newDataFunction,
  updateDataFunction,
  deleteDataFunction,
  isNewDataError,
  isUpdateDataError,
  isDeleteDataError,
}: DataGridProps<TNew, TUpdate, TDelete>) => {
  const { t } = useTranslation(["main", "datagrid"]);

  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarStateProps>({
    isOpen: false,
    isError: false,
    message: "",
  });
  const [rows, setRows] = useState<GridRowsProp>(rowsProp);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { data: authData } = useAuthDetails();

  const formattedDataCategory = dataCategory.charAt(0).toUpperCase() + dataCategory.slice(1);
  const formattedNewDataIdentifier =
    newDataIdentifier.charAt(0).toUpperCase() + newDataIdentifier.slice(1);

  const CustomToolbar = () => {
    const handleAddNewClick = async () => {
      setRows((rows) => [...rows, { id: rows.length + 1, ...newDataObject, isNew: true }]);
      setRowModesModel((currentModel) => ({
        ...currentModel,
        [rows.length + 1]: { mode: GridRowModes.Edit },
      }));
    };

    return (
      <GridToolbarContainer
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Box>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </Box>
        <Button color="primary" startIcon={<Add />} onClick={handleAddNewClick}>
          {t(`main:dashboard.${dataCategory}s.addNew${formattedDataCategory}Button`)}
        </Button>
      </GridToolbarContainer>
    );
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = async (updatedRow: GridRowModel, originalRow: GridRowModel) => {
    const updatedValues: Record<string, string | number>[] = [];
    if (!updatedRow.isNew) {
      const keys = new Set([...Object.keys(originalRow), ...Object.keys(updatedRow)]);
      keys.forEach((key) => {
        if (key === "uniqueId") {
          updatedValues.push({ [`${dataCategory}Id`]: updatedRow[key] });
        }
        if (updatedRow[key] !== originalRow[key]) {
          updatedValues.push({ [key]: updatedRow[key] });
        }
      });
    }
    const requestValues = updatedRow.isNew
      ? updatedValues.reduce((acc, record) => ({ ...acc, ...record }))
      : updatedRow;

    setIsWaiting(true);
    const response = await updateDataFunction({
      accessToken: authData?.accessToken,
      currentUser: authData?.currentUser,
      ...requestValues,
    } as TUpdate);
    setIsWaiting(false);
    setSnackbarState({
      isOpen: true,
      isError: isUpdateDataError,
      message: response.message,
    });
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleEditClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = async (id: GridRowId) => {
    const savedRow = rows.filter((row) => row.id === id)[0];
    const validateRow = Object.values(savedRow).every((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      } else {
        return value !== null && value !== undefined;
      }
    });
    if (!validateRow) {
      return setSnackbarState({
        isOpen: true,
        isError: true,
        message: t("datagrid:validationFail"),
      });
    }

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    setIsWaiting(true);
    const newData = {
      [`${dataCategory}${formattedNewDataIdentifier}`]: `${t(`main:dashboard.${dataCategory}s.new${formattedDataCategory}NamePlaceholder`)}`,
    };
    const response = await newDataFunction({
      accessToken: authData?.accessToken,
      currentUser: authData?.currentUser,
      ...newData,
    } as TNew);
    setIsWaiting(false);
    setSnackbarState({
      isOpen: true,
      isError: true,
      message: response.message,
    });
  };

  const handleDeleteClick = async (id: GridRowId) => {
    const rowToBeDeleted = rows.filter((row) => row.id === id);
    setIsWaiting(true);
    const response = await deleteDataFunction({
      accessToken: authData?.accessToken,
      currentUser: authData?.currentUser,
      [`${dataCategory}Id`]: rowToBeDeleted[0].uniqueId,
    } as TDelete);
    setIsWaiting(false);
    setSnackbarState({
      isOpen: true,
      isError: true, // FIXME: fix isError props on every setSnackbarState call
      message: response.message,
    });
  };

  const handleCancelClick = (id: GridRowId) => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  // TODO: add simpler filters

  return (
    <>
      <Snackbar
        snackbarState={snackbarState}
        setSnackbarState={setSnackbarState}
        severity={isNewDataError || isUpdateDataError || isDeleteDataError ? "error" : "success"}
      />
      <DataGridComponent
        loading={isWaiting ? true : false}
        sx={{ borderRadius: 0, border: `solid 1px ${mediumColor}` }}
        rows={rows}
        columns={[
          ...columnsProp,
          {
            field: "actions",
            type: "actions",
            headerName: t("main:dashboard.accounts.columns.actions"),
            width: 100,
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<Save />}
                    label={t("main:accounts.columns.saveActionLabel")}
                    onClick={() => handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<Cancel />}
                    label={t("main:accounts.columns.cancelActionLabel")}
                    onClick={() => handleCancelClick(id)}
                  />,
                ];
              }

              return [
                <GridActionsCellItem
                  icon={<Edit />}
                  label={t("main:accounts.columns.editActionLabel")}
                  onClick={() => handleEditClick(id)}
                />,
                <GridActionsCellItem
                  icon={<Delete />}
                  label={t("main:accounts.columns.deleteActionLabel")}
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
