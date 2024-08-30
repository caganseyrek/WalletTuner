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

import Snackbar from "./Snackbar";

interface DataGridProps<TNew, TUpdate, TDelete> {
  rowsProp: GridRowsProp;
  columnsProp: GridColDef[];
  paginationModel: GridPaginationModel;
  dataCategory: string;
  newDataFunction: UseMutateAsyncFunction<MessageResponseProps, Error, TNew, unknown>;
  updateDataFunction: UseMutateAsyncFunction<MessageResponseProps, Error, TUpdate, unknown>;
  deleteDataFunction: UseMutateAsyncFunction<MessageResponseProps, Error, TDelete, unknown>;
  isNewDataError: boolean;
  isUpdateDateError: boolean;
  isDeleteDataError: boolean;
}

const DataGrid = <TNew, TUpdate, TDelete>({
  rowsProp,
  columnsProp,
  paginationModel,
  dataCategory,
  newDataFunction,
  updateDataFunction,
  deleteDataFunction,
  isNewDataError,
  isUpdateDateError,
  isDeleteDataError,
}: DataGridProps<TNew, TUpdate, TDelete>) => {
  const { t } = useTranslation(["main", "datagrid"]);

  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [snackbarState, setSnackbarState] = useState<SnackbarStateProps>({
    isOpen: false,
    message: "",
  });
  const [rows, setRows] = useState<GridRowsProp>(rowsProp);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { data: authData } = useAuthDetails();

  const formattedDataCategory = dataCategory.charAt(0).toUpperCase() + dataCategory.slice(1);

  const CustomToolbar = () => {
    const handleAddNewClick = async () => {
      setIsWaiting(true);
      const newData = {
        [`${dataCategory}Name`]: `${t(`main:dashboard.${dataCategory}s.new${formattedDataCategory}NamePlaceholder`)}`,
      };
      const response = await newDataFunction({
        accessToken: authData?.accessToken,
        currentUser: authData?.currentUser,
        ...newData,
      } as TNew);
      setIsWaiting(false);
      setSnackbarState({
        isOpen: true,
        message: response.message,
      });
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
    const keys = new Set([...Object.keys(originalRow), ...Object.keys(updatedRow)]);
    keys.forEach((key) => {
      if (key === "uniqueId") {
        updatedValues.push({ [`${dataCategory}Id`]: updatedRow[key] });
      }
      if (updatedRow[key] !== originalRow[key]) {
        updatedValues.push({ [key]: updatedRow[key] });
      }
    });
    const requestValues = updatedValues.reduce((acc, record) => ({ ...acc, ...record }));
    setIsWaiting(true);
    const response = await updateDataFunction({
      accessToken: authData?.accessToken,
      currentUser: authData?.currentUser,
      ...requestValues,
    } as TUpdate);
    setIsWaiting(false);
    setSnackbarState({
      isOpen: true,
      message: response.message,
    });
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleEditClick = async (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
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

  return (
    <>
      {snackbarState.isOpen && (
        <Snackbar
          snackbarState={snackbarState}
          setSnackbarState={setSnackbarState}
          severity={isNewDataError || isUpdateDateError || isDeleteDataError ? "error" : "success"}
        />
      )}
      <DataGridComponent
        loading={isWaiting ? true : false}
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
        localeText={{
          noRowsLabel: t("datagrid:noRowsLabel"),
          noResultsOverlayLabel: t("datagrid:noResultsOverlayLabel"),
          toolbarDensity: t("datagrid:toolbarDensity"),
          toolbarDensityLabel: t("datagrid:toolbarDensityLabel"),
          toolbarDensityCompact: t("datagrid:toolbarDensityCompact"),
          toolbarDensityStandard: t("datagrid:toolbarDensityStandard"),
          toolbarDensityComfortable: t("datagrid:toolbarDensityComfortable"),
          toolbarColumns: t("datagrid:toolbarColumns"),
          toolbarColumnsLabel: t("datagrid:toolbarColumnsLabel"),
          toolbarFilters: t("datagrid:toolbarFilters"),
          toolbarFiltersLabel: t("datagrid:toolbarFiltersLabel"),
          toolbarFiltersTooltipHide: t("datagrid:toolbarFiltersTooltipHide"),
          toolbarFiltersTooltipShow: t("datagrid:toolbarFiltersTooltipShow"),
          toolbarFiltersTooltipActive: (count) =>
            count !== 1
              ? `${count} ${t("datagrid:toolbarFiltersTooltipMultipleActive")}`
              : `${count} ${t("datagrid:toolbarFiltersTooltipOneActive")}`,
          toolbarQuickFilterPlaceholder: t("datagrid:toolbarQuickFilterPlaceholder"),
          toolbarQuickFilterLabel: t("datagrid:toolbarQuickFilterLabel"),
          toolbarQuickFilterDeleteIconLabel: t("datagrid:toolbarQuickFilterDeleteIconLabel"),
          toolbarExport: t("datagrid:toolbarExport"),
          toolbarExportLabel: t("datagrid:toolbarExportLabel"),
          toolbarExportCSV: t("datagrid:toolbarExportCSV"),
          toolbarExportPrint: t("datagrid:toolbarExportPrint"),
          toolbarExportExcel: t("datagrid:toolbarExportExcel"),
          columnsManagementSearchTitle: t("datagrid:columnsManagementSearchTitle"),
          columnsManagementNoColumns: t("datagrid:columnsManagementNoColumns"),
          columnsManagementShowHideAllText: t("datagrid:columnsManagementShowHideAllText"),
          columnsManagementReset: t("datagrid:columnsManagementReset"),
          filterPanelAddFilter: t("datagrid:filterPanelAddFilter"),
          filterPanelRemoveAll: t("datagrid:filterPanelRemoveAll"),
          filterPanelDeleteIconLabel: t("datagrid:filterPanelDeleteIconLabel"),
          filterPanelLogicOperator: t("datagrid:filterPanelLogicOperator"),
          filterPanelOperator: t("datagrid:filterPanelOperator"),
          filterPanelOperatorAnd: t("datagrid:filterPanelOperatorAnd"),
          filterPanelOperatorOr: t("datagrid:filterPanelOperatorOr"),
          filterPanelColumns: t("datagrid:filterPanelColumns"),
          filterPanelInputLabel: t("datagrid:filterPanelInputLabel"),
          filterPanelInputPlaceholder: t("datagrid:filterPanelInputPlaceholder"),
          filterOperatorContains: t("datagrid:filterOperatorContains"),
          filterOperatorEquals: t("datagrid:filterOperatorEquals"),
          filterOperatorStartsWith: t("datagrid:filterOperatorStartsWith"),
          filterOperatorEndsWith: t("datagrid:filterOperatorEndsWith"),
          filterOperatorIs: t("datagrid:filterOperatorIs"),
          filterOperatorNot: t("datagrid:filterOperatorNot"),
          filterOperatorAfter: t("datagrid:filterOperatorAfter"),
          filterOperatorOnOrAfter: t("datagrid:filterOperatorOnOrAfter"),
          filterOperatorBefore: t("datagrid:filterOperatorBefore"),
          filterOperatorOnOrBefore: t("datagrid:filterOperatorOnOrBefore"),
          filterOperatorIsEmpty: t("datagrid:filterOperatorIsEmpty"),
          filterOperatorIsNotEmpty: t("datagrid:filterOperatorIsNotEmpty"),
          filterOperatorIsAnyOf: t("datagrid:filterOperatorIsAnyOf"),
          headerFilterOperatorContains: t("datagrid:headerFilterOperatorContains"),
          headerFilterOperatorEquals: t("datagrid:headerFilterOperatorEquals"),
          headerFilterOperatorStartsWith: t("datagrid:headerFilterOperatorStartsWith"),
          headerFilterOperatorEndsWith: t("datagrid:headerFilterOperatorEndsWith"),
          headerFilterOperatorIs: t("datagrid:headerFilterOperatorIs"),
          headerFilterOperatorNot: t("datagrid:headerFilterOperatorNot"),
          headerFilterOperatorAfter: t("datagrid:headerFilterOperatorAfter"),
          headerFilterOperatorOnOrAfter: t("datagrid:headerFilterOperatorOnOrAfter"),
          headerFilterOperatorBefore: t("datagrid:headerFilterOperatorBefore"),
          headerFilterOperatorOnOrBefore: t("datagrid:headerFilterOperatorOnOrBefore"),
          headerFilterOperatorIsEmpty: t("datagrid:headerFilterOperatorIsEmpty"),
          headerFilterOperatorIsNotEmpty: t("datagrid:headerFilterOperatorIsNotEmpty"),
          headerFilterOperatorIsAnyOf: t("datagrid:headerFilterOperatorIsAnyOf"),
          "headerFilterOperator=": t("datagrid:headerFilterOperator="),
          "headerFilterOperator!=": t("datagrid:headerFilterOperator!="),
          "headerFilterOperator>": t("datagrid:headerFilterOperator>"),
          "headerFilterOperator>=": t("datagrid:headerFilterOperator>="),
          "headerFilterOperator<": t("datagrid:headerFilterOperator<"),
          "headerFilterOperator<=": t("datagrid:headerFilterOperator<="),
          filterValueAny: t("datagrid:filterValueAny"),
          filterValueTrue: t("datagrid:filterValueTrue"),
          filterValueFalse: t("datagrid:filterValueFalse"),
          columnMenuLabel: t("datagrid:columnMenuLabel"),
          columnMenuShowColumns: t("datagrid:columnMenuShowColumns"),
          columnMenuManageColumns: t("datagrid:columnMenuManageColumns"),
          columnMenuFilter: t("datagrid:columnMenuFilter"),
          columnMenuHideColumn: t("datagrid:columnMenuHideColumn"),
          columnMenuUnsort: t("datagrid:columnMenuUnsort"),
          columnMenuSortAsc: t("datagrid:columnMenuSortAsc"),
          columnMenuSortDesc: t("datagrid:columnMenuSortDesc"),
          columnHeaderFiltersTooltipActive: (count) =>
            count !== 1
              ? `${count} ${t("datagrid:columnHeaderFiltersTooltipMultipleActive")}`
              : `${count} ${t("datagrid:columnHeaderFiltersTooltipOneActive")}`,
          columnHeaderFiltersLabel: t("datagrid:columnHeaderFiltersLabel"),
          columnHeaderSortIconLabel: t("datagrid:columnHeaderSortIconLabel"),
          footerRowSelected: (count) =>
            count !== 1
              ? `${count.toLocaleString()} ${t("datagrid:footerRowMultipleSelected")}`
              : `${count.toLocaleString()} ${t("datagrid:footerRowOneSelected")}`,

          footerTotalRows: t("datagrid:footerTotalRows"),
          footerTotalVisibleRows: (visibleCount, totalCount) =>
            `${visibleCount.toLocaleString()} ${t("datagrid:checkboxSelectionHeaderNameSeperator")} ${totalCount.toLocaleString()}`,
          checkboxSelectionHeaderName: t("datagrid:checkboxSelectionHeaderName"),
          checkboxSelectionSelectAllRows: t("datagrid:checkboxSelectionSelectAllRows"),
          checkboxSelectionUnselectAllRows: t("datagrid:checkboxSelectionUnselectAllRows"),
          checkboxSelectionSelectRow: t("datagrid:checkboxSelectionSelectRow"),
          checkboxSelectionUnselectRow: t("datagrid:checkboxSelectionUnselectRow"),
          booleanCellTrueLabel: t("datagrid:booleanCellTrueLabel"),
          booleanCellFalseLabel: t("datagrid:booleanCellFalseLabel"),
          actionsCellMore: t("datagrid:actionsCellMore"),
          pinToLeft: t("datagrid:pinToLeft"),
          pinToRight: t("datagrid:pinToRight"),
          unpin: t("datagrid:unpin"),
          treeDataGroupingHeaderName: t("datagrid:treeDataGroupingHeaderName"),
          treeDataExpand: t("datagrid:treeDataExpand"),
          treeDataCollapse: t("datagrid:treeDataCollapse"),
          groupingColumnHeaderName: t("datagrid:groupingColumnHeaderName"),
          groupColumn: (name) => `${t("datagrid:groupColumn")} ${name}`,
          unGroupColumn: (name) => `${t("datagrid:unGroupColumn")} ${name}`,
          detailPanelToggle: t("datagrid:detailPanelToggle"),
          expandDetailPanel: t("datagrid:expandDetailPanel"),
          collapseDetailPanel: t("datagrid:collapseDetailPanel"),
          rowReorderingHeaderName: t("datagrid:rowReorderingHeaderName"),
          aggregationMenuItemHeader: t("datagrid:aggregationMenuItemHeader"),
          aggregationFunctionLabelSum: t("datagrid:aggregationFunctionLabelSum"),
          aggregationFunctionLabelAvg: t("datagrid:aggregationFunctionLabelAvg"),
          aggregationFunctionLabelMin: t("datagrid:aggregationFunctionLabelMin"),
          aggregationFunctionLabelMax: t("datagrid:aggregationFunctionLabelMax"),
          aggregationFunctionLabelSize: t("datagrid:aggregationFunctionLabelSize"),
        }}
      />
    </>
  );
};

export default DataGrid;
